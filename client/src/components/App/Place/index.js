import _ from 'lodash';
import React from 'react';
import { Button, Header, Form, Table, Container } from 'semantic-ui-react';
import { Formik, Form as FormikForm } from 'formik';
import { Helmet } from 'react-helmet';
import debounce from 'debounce-promise';
import * as yup from 'yup';

import client from 'client';

import Input from 'components/shared/FormikFields/Input';
import Radio from 'components/shared/FormikFields/Radio';
import FormFieldErrorMessage from 'components/shared/FormFieldErrorMessage';

import useQuery from 'hooks/useQuery';

import companiesQuery from './queries/companies.gql';
import validNameQuery from './queries/validName.gql';
import victimsQuery from './queries/victims.gql';
import placeYourbetMutation from './queries/placeYourBet.gql';


export default function PlaceYourBet({ history }) {
  const victimsValues = useVictims();

  return (
    <Container className="view-page">
      <Helmet title="Place Your Bet" />

      <Header>Place Your Bets</Header>

      <Formik
        enableReinitialize
        initialValues={victimsValues || validationSchema.default()}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={handleSubmit}
        render={formik => <PlaceYourBetForm formik={formik} />}
      />

    </Container>
  );

  // sub components


  // handlers && helpers

  function handleSubmit(values, { setSubmitting }) {
    const payload = validationSchema.cast(values, { stripUnknown: true });

    setSubmitting(true);

    return client
      .mutate({
        mutation: placeYourbetMutation,
        variables: { bet: payload }
      })
      .then(({ data: { placeYourBet } }) => history.push(`/bets/${placeYourBet[0].user.name}`))
      .catch(() => setSubmitting(false));
  }

  function useVictims() {
    const { data: { victims } } = useQuery({
      query: victimsQuery
    });

    const bet = _.orderBy(victims, 'displayOrder');

    return { bet };
  }
}

function PlaceYourBetForm({ formik: { values, submitForm, isSubmitting } }) {
  return (
    <Form as={FormikForm}>
      <Header>Your Details</Header>

      <Form.Field>
        <Input fast required placeholder="Enter your name" name="name" />
        <FormFieldErrorMessage name="name" />
      </Form.Field>

      <Form.Field>
        <Input fast placeholder="Enter your email" name="email" type="email" />
        <FormFieldErrorMessage name="email" />
      </Form.Field>

      <Form.Field>
        <Input fast placeholder="Enter your url" name="nameUrl" />
        <FormFieldErrorMessage name="nameUrl" />
      </Form.Field>

      <Form.Field>
        <Input fast placeholder="Select your company" name="company" list="companies" />
        <CompaniesList />
        <FormFieldErrorMessage name="company" />
      </Form.Field>

      <Form.Field>
        <Input fast placeholder="Enter your company's Url" name="companyUrl" />
        <FormFieldErrorMessage name="companyUrl" />
      </Form.Field>

      <YourBet />

      <Button primary disabled={isSubmitting} loading={isSubmitting} onClick={submitForm}>Post</Button>
    </Form>
  );

  function CompaniesList() {
    const { data: { companies } } = useQuery({
      query: companiesQuery
    });

    return (
      <datalist id="companies">
        {_.map(companies, ({ id, name }) => (
          <option value={name} key={id} />
        ))}
      </datalist>
    );
  }

  function YourBet() {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Character</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Alive</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Dead</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Becomes a wight</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {_.map(values.bet, (bet, index) => (
            <Table.Row key={`bet:${bet.id}`}>
              <Table.Cell>{bet.name}</Table.Cell>
              <Table.Cell textAlign="center"><Radio name={`bet[${index}].status`} value="alive" /></Table.Cell>
              <Table.Cell textAlign="center"><Radio name={`bet[${index}].status`} value="dead" /></Table.Cell>
              <Table.Cell textAlign="center"><Radio name={`bet[${index}]status`} value="wight" /></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

const validationSchema = yup.object({
  name: yup.string()
    .min(3)
    .max(30)
    .required()
    .default('')
    .test(
      'valid_chars',
      '${value} is not a valid name. Only letter and _ are allowed', // eslint-disable-line
      value => !(_.isNull(value.match(/^[A-Za-z_]+$/)))
    )
    .test(
      'exists',
      '${value} already exists', // eslint-disable-line
      value => debouncedNameExists(value)
    ),
  email: yup.string().email(),
  nameUrl: yup.string().url().default(''),
  company: yup.string().default(''),
  companyUrl: yup.string().url().default(''),

  bet: yup.array().of(yup.object({
    id: yup.number().required(),
    status: yup.string().oneOf(['alive', 'dead', 'wight'])
  }))
});

function forumNameExists(name) {
  if ((name || '').length > 2) {
    return client
      .query({
        query: validNameQuery,
        variables: { name },
        fetchPolicy: 'network-only' // never read/write cache
      })
      .then(({ data }) => data.validName !== false);
  }
}

const debouncedNameExists = debounce(forumNameExists, 250);
