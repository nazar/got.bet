import React from 'react';

import LabelContent from 'components/shared/LabelContent';

export default function Company({ user, label }) {
  if (user.company) {
    const company = user.company.url
      ? <a href={user.company.url} target="_blank" rel="noopener noreferrer">{user.company.name}</a>
      : user.company.name;

    const labelContent = label ? 'Company' : null;

    return (
      <LabelContent
        label={labelContent}
        content={company}
      />
    );
  } else {
    return null;
  }
}
