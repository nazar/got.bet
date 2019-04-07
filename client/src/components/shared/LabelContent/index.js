import React from 'react';

import './labelContent.styl';

export default function LabelContent({ label, content }) {
  return (
    <div className="label-content">
      <Label />
      <div className="content">
        {content}
      </div>
    </div>
  );

  function Label() {
    if (label) {
      return <div className="label">{label}</div>;
    } else return null;
  }
}
