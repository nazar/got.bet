import _ from 'lodash';
import React from 'react';
import { connect } from 'formik';
import { Label, Message } from 'semantic-ui-react';
import cx from 'classnames';

import './formFieldErrorMessage.styl';

function FormFieldErrorMessage({ name, all, formik: { errors, touched, status }, padded, message }) {
  const dirty = _.get(touched, name);
  const error = _.get(errors, name) || _.get(status, name);

  return ((dirty || all) && error && _.isString(error) && <ErrorMessage />) || null;

  //

  function ErrorMessage() {
    if (message) {
      return (
        <Message negative>
          {error}
        </Message>
      );
    } else {
      return (
        <Label basic pointing color="red" className={cx('form-field-error-message', { padded })}>
          {error}
        </Label>
      );
    }
  }
}

export default connect(FormFieldErrorMessage);
