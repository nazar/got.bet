import _ from 'lodash';
import React from 'react';
import { Form, Radio as SemanticRadio } from 'semantic-ui-react';
import { connect } from 'formik';

function Radio({ name, formik: { values, setFieldValue }, value, ...rest }) {
  return (
    <Form.Field
      name={name}
      checked={_.get(values, name) === value}
      control={SemanticRadio}
      onChange={handleChange}
      {...rest}
    />
  );

  function handleChange() {
    setFieldValue(name, value);
  }
}

export default connect(Radio);
