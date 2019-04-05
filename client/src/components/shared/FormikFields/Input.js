import _ from 'lodash';
import React, { useState } from 'react';
import { Form, Input as SemanticInput } from 'semantic-ui-react';
import { connect } from 'formik';
import cx from 'classnames';

import './input.styl';

function Input({
  name,
  formik: { values, setFieldValue, setFieldTouched },
  thin, float, centered, className, number, fast,
  ...rest
}) {
  const savingProp = fast
    ? { onChange: handleFastChange, onBlur: saveFast }
    : { onChange: handleChange };

  const [fastValue, setFastValue] = useState(_.get(values, name));
  const inputValue = fast ? fastValue : _.get(values, name);

  return (
    <Form.Field
      className={cx('soapee-input', className, { thin, float, centered })}
      name={name}
      value={inputValue}
      control={SemanticInput}
      {...savingProp}
      {...rest}
    />
  );

  function handleChange({ target: { value } }) {
    const fieldValue = number
      ? value && Number(value)
      : value;

    setFieldValue(name, fieldValue);
    setFieldTouched(name);
  }

  function handleFastChange({ target: { value } }) {
    setFastValue(value);
  }

  function saveFast() {
    setFieldValue(name, fastValue);
    setFieldTouched(name);
  }
}

export default connect(Input);
