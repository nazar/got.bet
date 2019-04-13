import _ from 'lodash';
import React from 'react';
import { Button, Header, Form, Table, Container, Message, Icon, Segment } from 'semantic-ui-react';
import { Formik, Form as FormikForm } from 'formik';
import { Helmet } from 'react-helmet';
import debounce from 'debounce-promise';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import client from 'client';

import Checkbox from 'components/shared/FormikFields/Checkbox';
import Dropdown from 'components/shared/FormikFields/Dropdown';
import Input from 'components/shared/FormikFields/Input';
import Radio from 'components/shared/FormikFields/Radio';
import FormFieldErrorMessage from 'components/shared/FormFieldErrorMessage';

import useQuery from 'hooks/useQuery';
import PlayerImage, { playerImage } from 'components/shared/PlayerImage';

import companiesQuery from './queries/companies.gql';
import validNameQuery from './queries/validName.gql';
import victimsQuery from './queries/victims.gql';
import placeYourbetMutation from './queries/placeYourBet.gql';

import './place.styl';


export default function PlaceYourBet({ history }) {
  const victimsValues = useVictims();
  const companiesList = useCompanies();

  return (
    <Container className="view-page place-bet">
      <Helmet title="Place Your Bet" />

      <PlaceHeader />

      <Formik
        enableReinitialize
        initialValues={victimsValues || validationSchema.default()}
        validationSchema={validationSchema}
        validateOnChange={false}
        onSubmit={handleSubmit}
        render={formik => <PlaceYourBetForm formik={formik} players={victimsValues} companies={companiesList} />}
      />

    </Container>
  );

  // sub components

  function PlaceHeader() {
    return (
      <Header as="h1">
        <Icon name="ticket" />
        <Header.Content>
          Place your bet
          <Header.Subheader>
            On Who Lives, Who Dies, Who Wights.
          </Header.Subheader>
        </Header.Content>
      </Header>
    );
  }

  // handlers && helpers

  function handleSubmit(values, { setSubmitting }) {
    const payload = validationSchema.cast(values, { stripUnknown: true });

    setSubmitting(true);

    return client
      .mutate({
        mutation: placeYourbetMutation,
        variables: { bet: payload },
        refetchQueries: ['users']
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

  function useCompanies() {
    const { data: { companies } } = useQuery({
      query: companiesQuery
    });

    return _.map(companies, company => ({
      key: company.id,
      text: company.name,
      value: company.name
    }));
  }
}

function PlaceYourBetForm({ players, companies, formik: { values, errors, submitForm, isSubmitting } }) {
  return (
    <Form as={FormikForm} autoComplete="off">
      <Header>Your Details</Header>

      <Form.Field>
        <Input fast required placeholder="Enter your username" name="name" />
        <FormFieldErrorMessage all name="name" />
      </Form.Field>

      <Form.Field>
        <Input fast placeholder="Enter your email" name="email" type="email" />
        <FormFieldErrorMessage name="email" />
        <Message info>
          Email is optional. We use only use it to show your Gravatar (if you have one) against the
          list of <Link to="/bets">bets</Link>. Your email is not exposed in our graphQL server.
        </Message>
      </Form.Field>

      <Form.Field>
        <Input fast placeholder="Enter your url" name="nameUrl" />
        <FormFieldErrorMessage name="nameUrl" />
        <Message info>
          Want us to link to your site? Go for it!!
        </Message>
      </Form.Field>

      <Form.Field>
        <Dropdown
          selection
          search
          allowAdditions
          clearable
          placeholder="Select or add your company"
          name="company"
          options={companies}
          onAddItem={handleAddItem}
        />
        <Message info>
          Want to play along with your colleagues? Add your company name here and we'll group your colleagues
          under the same company.
        </Message>
        <FormFieldErrorMessage all name="company" />
      </Form.Field>

      <Form.Field>
        <Input fast placeholder="Enter your company's Url" name="companyUrl" />
        <FormFieldErrorMessage name="companyUrl" />
        <Message info>
          Want us to link to your company's site? Go for it!!
        </Message>
      </Form.Field>

      <Header>Your Bet</Header>
      <Message>
        Select which Game of Thrones character lives, dies or becomes a wight by the end of season 8
      </Message>
      <YourBet />

      {!(_.isEmpty(errors)) && (
        <Message negative>
          There are one more errors preventing this form from saving. Please scroll up to view the error messages.
        </Message>
      )}

      <Header>Bonus Section</Header>
      <BonusSection />

      <Button primary disabled={isSubmitting} loading={isSubmitting} onClick={submitForm}>Place My Bet!!</Button>
    </Form>
  );

  function handleAddItem(e, { value }) {
    companies.push({ text: value, value });
  }

  function YourBet() {
    return (
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>&nbsp;</Table.HeaderCell>
            <Table.HeaderCell>Character</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Lives</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Dies</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Wights</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {_.map(values.bet, (bet, index) => (
            <Table.Row key={`bet:${bet.id}`}>
              <Table.Cell collapsing><PlayerImage avatar popup cover player={bet} /></Table.Cell>
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

  function BonusSection() {
    const playerOptions = mapPlayersToOptions();

    return (
      <Segment className="bonus" padded>
        <Form.Field>
          <label>Danearys is pregnant for 1 bonus point</label>
          <Checkbox name="dennyPregz" />
        </Form.Field>

        <Form.Field>
          <label>Kills the Night King for 2 bonus points</label>
          <Dropdown
            selection
            search
            clearable
            name="killsNightKingId"
            placeholder="Who will it be?"
            options={playerOptions}
          />
        </Form.Field>

        <Form.Field>
          <label>Holds the Iron Throne at the end for 4 bonus points</label>
          <Dropdown
            selection
            search
            clearable
            name="winsThroneId"
            placeholder="Who will it be?"
            options={playerOptions}
          />
        </Form.Field>
      </Segment>
    );

    function mapPlayersToOptions() {
      return _.map(players.bet, player => ({
        key: player.id,
        text: player.name,
        value: player.id,
        image: { avatar: true, src: playerImage(player.name) }
      }));
    }
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
      '${value} is not a valid name. Only letters, spaces, - and _ are allowed', // eslint-disable-line
      value => !(_.isNull(value.match(/^[A-Za-z_\-\s]+$/)))
    )
    .test(
      'exists',
      '${value} already exists', // eslint-disable-line
      value => debouncedNameExists(value)
    ),
  email: yup.string().email(),
  nameUrl: yup.string().url().default(''),
  company: yup.string().when('companyUrl', {
    is: val => _.isEmpty(val),
    then: yup.string(),
    otherwise: yup.string().required('Company is required when company Url is present')
  })
    .default(''),
  companyUrl: yup.string().url().default(''),

  bet: yup.array().of(yup.object({
    id: yup.number().required(),
    status: yup.string().oneOf(['alive', 'dead', 'wight'])
  })),

  dennyPregz: yup.boolean().default(false),
  killsNightKingId: yup.number(),
  winsThroneId: yup.number()
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
