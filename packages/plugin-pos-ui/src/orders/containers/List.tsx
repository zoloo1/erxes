import * as compose from 'lodash.flowright';
import { gql, useQuery, useMutation } from '@apollo/client';
import List from '../components/List';
import queryString from 'query-string';
import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { IRouterProps } from '@erxes/ui/src/types';
import {
  ListQueryVariables,
  OrdersQueryResponse,
  OrdersSummaryQueryResponse,
  PosOrderReturnBillMutationResponse,
} from '../types';
import { mutations, queries } from '../graphql';
import { withRouter } from 'react-router-dom';
import { Bulk, withProps, router, Alert, Spinner } from '@erxes/ui/src';
import { FILTER_PARAMS } from '../../constants';
import { IQueryParams } from '@erxes/ui/src/types';

type Props = {
  queryParams: any;
  history: any;
} & IRouterProps;

const ListContainer = (props: Props) => {
  const { queryParams, history } = props;

  const ordersQuery = useQuery<OrdersQueryResponse>(gql(queries.posOrders), {
    variables: generateParams({ queryParams }),
    fetchPolicy: 'network-only',
  });

  const ordersSummaryQuery = useQuery<OrdersSummaryQueryResponse>(
    gql(queries.posOrdersSummary),
    {
      variables: generateParams({ queryParams }),
      fetchPolicy: 'network-only',
    },
  );

  const [posOrderReturnBill] = useMutation<PosOrderReturnBillMutationResponse>(
    gql(mutations.posOrderReturnBill),
  );

  const onSearch = (search: string) => {
    router.removeParams(history, 'page');

    if (!search) {
      return router.removeParams(history, 'search');
    }

    router.setParams(history, { search });
  };

  const onSelect = (values: string[] | string, key: string) => {
    router.removeParams(history, 'page');

    if (queryParams[key] === values) {
      return router.removeParams(history, key);
    }

    return router.setParams(history, { [key]: values });
  };

  const onFilter = (filterParams: IQueryParams) => {
    router.removeParams(history, 'page');

    for (const key of Object.keys(filterParams)) {
      if (filterParams[key]) {
        router.setParams(history, { [key]: filterParams[key] });
      } else {
        router.removeParams(history, key);
      }
    }

    return router;
  };

  const isFiltered = (): boolean => {
    for (const param in queryParams) {
      if (FILTER_PARAMS.includes(param)) {
        return true;
      }
    }

    return false;
  };

  const clearFilter = () => {
    router.removeParams(history, ...Object.keys(queryParams));
  };

  const onReturnBill = (posId) => {
    posOrderReturnBill({
      variables: { _id: posId },
    })
      .then(() => {
        // refresh queries
        ordersQuery.refetch();

        Alert.success('You successfully synced erkhet.');
      })
      .catch((e) => {
        Alert.error(e.message);
      });
  };

  const ordersList = (bulkProps) => {
    const summary = ordersSummaryQuery?.data?.posOrdersSummary;
    const list = ordersQuery?.data?.posOrders || [];

    const updatedProps = {
      ...props,
      orders: list,
      summary,
      loading: ordersQuery?.data?.loading,

      onFilter,
      onSelect,
      onSearch,
      isFiltered: isFiltered(),
      clearFilter,
      onReturnBill,
    };

    return <List {...updatedProps} {...bulkProps} />;
  };

  const refetch = () => {
    ordersQuery.refetch();
  };

  return <Bulk content={ordersList} refetch={refetch} />;
};

export const generateParams = ({ queryParams }) => ({
  ...router.generatePaginationParams(queryParams || {}),
  sortField: queryParams.sortField,
  sortDirection: queryParams.sortDirection
    ? parseInt(queryParams.sortDirection, 10)
    : undefined,
  search: queryParams.search,
  paidStartDate: queryParams.paidStartDate,
  paidEndDate: queryParams.paidEndDate,
  createdStartDate: queryParams.createdStartDate,
  createdEndDate: queryParams.createdEndDate,
  paidDate: queryParams.paidDate,
  userId: queryParams.userId,
  customerId: queryParams.customerId,
  customerType: queryParams.customerType,
  posId: queryParams.posId,
  types: queryParams.types && queryParams.types.split(','),
  statuses: queryParams.statuses && queryParams.statuses.split(','),
  excludeStatuses:
    queryParams.excludeStatuses && queryParams.excludeStatuses.split(','),
});

export default withRouter<Props>(ListContainer);
