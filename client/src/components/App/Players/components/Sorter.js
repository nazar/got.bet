import React from 'react';

import { Dropdown, Header, Icon } from 'semantic-ui-react';


export default function Sorter({ sortOrder, onSort = () => {} } = {}) {
  return (
    <Header as="h2">
      <Icon name="sort" />
      <Header.Content>
        Sort Players by{' '}
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
    key: 'none',
    text: '',
    value: 'none',
    content: 'None'
  },
  {
    key: 'lives:desc',
    text: 'most likely to live',
    value: 'lives:desc',
    content: 'Most likely to live'
  },
  {
    key: 'lives:asc',
    text: 'least likely to live',
    value: 'lives:asc',
    content: 'Least likely to live'
  },
  {
    key: 'dies:desc',
    text: 'most likely to die',
    value: 'dies:desc',
    content: 'Most likely to die'
  },
  {
    key: 'dies:asc',
    text: 'least likely to die',
    value: 'dies:asc',
    content: 'Least likely to die'
  },
  {
    key: 'wights:desc',
    text: 'most likely to wight',
    value: 'wights:desc',
    content: 'Most likely to wight'
  },
  {
    key: 'wights:asc',
    text: 'least likely to wight',
    value: 'wights:asc',
    content: 'Least likely to wight'
  }
];
