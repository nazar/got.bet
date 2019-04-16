import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { Pagination } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom'; //eslint-disable-line
import qs from 'qs';


class UberPaginator extends React.Component {
  static propTypes = {
    summaryQuery: PropTypes.shape({
      query: PropTypes.object.isRequired,
      dataKey: PropTypes.string.isRequired,
      variables: PropTypes.object
    }).isRequired,

    itemsQuery: PropTypes.shape({
      query: PropTypes.object.isRequired,
      dataKey: PropTypes.string.isRequired,
      variables: PropTypes.object
    }).isRequired,

    children: PropTypes.func.isRequired,
    perPage: PropTypes.number
  };

  static defaultProps = {
    perPage: 20
  };

  render() {
    const { summaryQuery, itemsQuery, perPage, location, children } = this.props;

    return (
      <Query
        query={summaryQuery.query}
        variables={summaryQuery.variables}
        fetchPolicy={summaryQuery.fetchPolicy}
      >
        {({ data, loading: loadingSummary }) => {
          const { search } = location;

          const totalPages = _.ceil(_.get(data, [summaryQuery.dataKey, 'count'], 0) / perPage);
          const locationPage = qs.parse(search, { ignoreQueryPrefix: true });

          const activePage = _.get(locationPage, 'page', 1);
          const page = { offset: (activePage - 1) * perPage, limit: perPage };

          return (
            <Query
              query={itemsQuery.query}
              variables={{
                ...itemsQuery.variables,
                page
              }}
              fetchPolicy={itemsQuery.fetchPolicy}
            >
              {({ data: dataItems, loading: loadingItems, subscribeToMore, refetch }) => (
                <>
                  {
                    children({
                      subscribeToMore,
                      refetch,
                      loading: loadingSummary || loadingItems,
                      items: _.get(dataItems, itemsQuery.dataKey),
                      page
                    })
                  }

                  {totalPages > 1 && (
                    <Pagination
                      totalPages={totalPages}
                      activePage={activePage}
                      onPageChange={this._handlePageChange(refetch)}
                    />
                  )}
                </>
              )}
            </Query>
          );
        }}
      </Query>
    );
  }

  _handlePageChange = refetch => (e, { activePage }) => {
    const { history, match: { url }, perPage } = this.props;
    const page = qs.stringify({ page: activePage });

    history.push(`${url}?${page}`);

    return refetch({ page: { offset: (activePage - 1) * perPage, limit: perPage } });
  };
}

export default withRouter(UberPaginator);
