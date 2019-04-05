import _ from 'lodash';
import React from 'react';
import { Placeholder as SemanticPlaceholder } from 'semantic-ui-react';

export default function Placeholder({ lines = 5 }) {
  return (
    <SemanticPlaceholder fluid>
      <SemanticPlaceholder.Paragraph>
        {_.times(lines, index => <SemanticPlaceholder.Line key={index} />)}
      </SemanticPlaceholder.Paragraph>
    </SemanticPlaceholder>
  );
}
