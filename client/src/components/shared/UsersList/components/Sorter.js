import React from 'react';

import { Dropdown, Header, Icon } from 'semantic-ui-react';


export default function Sorter({ sortOrder, onSort = () => {} } = {}) {
  return (
    <Header as="h3">
      <Icon name="sort" />
      <Header.Content>
        Sort Bets by{' '}
        <Dropdown
          inline
          header="Select sorting criteria"
          options={options}
          defaultValue={sortOrder}
          onChange={handleOnChange}
        />
      </Header.Content>
    </Header>
  );

  function handleOnChange(e, { value }) {
    onSort(value);
  }
}

const options = [
  {
    key: 'createdAt:desc',
    text: 'newest first',
    value: 'createdAt:desc',
    content: 'Newest first'
  },
  {
    key: 'createdAt:asc',
    text: 'oldest first',
    value: 'createdAt:asc',
    content: 'Oldest first'
  },
  {
    key: 'score:desc',
    text: 'highest score',
    value: 'score:desc',
    content: 'Highest score'
  },
  {
    key: 'score:asc',
    text: 'lowest score',
    value: 'score:asc',
    content: 'Lowest score'
  }
];
