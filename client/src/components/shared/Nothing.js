import _ from 'lodash';
import React from 'react';
import { Popup } from 'semantic-ui-react';

export default function Nothing({ upper, plural }) {
  return (
    <Popup trigger={<Win />} content="nothing" />
  );

  function Win(props) {
    let win =  plural ? 'wins' : 'win';
    const style = { borderBottomColor: 'silver', borderBottomWidth: 1, borderBottomStyle: 'solid', cursor: 'pointer' };
    upper && (win = _.upperCase(win));

    return (
      <span style={style} {...props}>{win}</span>
    );
  }
}
