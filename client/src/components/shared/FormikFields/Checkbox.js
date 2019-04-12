import React from 'react';
import { Form, Checkbox as SemanticCheckbox } from 'semantic-ui-react';
import { connect } from 'formik';

function Checkbox({ name, formik: { values, setFieldValue }, ...rest }) {
  return (
    <Form.Field
      name={name}
      checked={values[name]}
      control={SemanticCheckbox}
      onChange={handleChange}
      {...rest}
    />
  );

  function handleChange(e, { checked }) {
    setFieldValue(name, checked);
  }
}

export default connect(Checkbox);
