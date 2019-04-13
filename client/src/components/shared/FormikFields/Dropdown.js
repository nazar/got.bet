import React from 'react';
import { Form, Dropdown as SemanticDropdown } from 'semantic-ui-react';
import { connect } from 'formik';

function Dropdown({ name, formik: { values, setFieldValue }, onAddItem, ...rest }) {
  return (
    <Form.Field
      name={name}
      value={values[name]}
      control={SemanticDropdown}
      onAddItem={onAddItem}
      onChange={handleChange}
      {...rest}
    />
  );

  function handleChange(e, { value }) {
    setFieldValue(name, value);
  }
}

export default connect(Dropdown);
