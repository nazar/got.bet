import _ from 'lodash';
import React from 'react';
import { Segment } from 'semantic-ui-react';
import cx from 'classnames';

import Placeholder from 'components/shared/Placeholder';

import './section.styl';

export default function Section(
  { children, className, loading, basic = true, padded = false, shadow = false, ...rest } = {}
) {
  return (
    <Segment
      basic={basic}
      padded={padded}
      loading={loading}
      className={cx(className, 'section', { shadow })}
      {...rest}
    >
      <Children />
    </Segment>
  );

  function Children() {
    if (loading) {
      return <Placeholder />;
    } else if (_.isFunction(children)) {
      return children();
    } else {
      return children;
    }
  }
}
