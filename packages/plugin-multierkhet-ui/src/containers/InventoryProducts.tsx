import { gql } from '@apollo/client';
import { router } from '@erxes/ui/src';
import { Bulk } from '@erxes/ui/src/components';
import Spinner from '@erxes/ui/src/components/Spinner';
import { IRouterProps } from '@erxes/ui/src/types';
import Alert from '@erxes/ui/src/utils/Alert';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import InventoryProducts from '../components/inventoryProducts/InventoryProducts';
import { mutations } from '../graphql';
import {
  ToCheckProductsMutationResponse,
  ToSyncProductsMutationResponse,
} from '../types';
import { useMutation } from '@apollo/client';

type Props = {
  queryParams: any;
};

type FinalProps = {} & Props & IRouterProps;

const InventoryProductsContainer = (props: FinalProps) => {
  const [toMultiCheckProducts] = useMutation<ToCheckProductsMutationResponse>(
    gql(mutations.toCheckProducts),
  );
  const [toMultiSyncProducts] = useMutation<ToSyncProductsMutationResponse>(
    gql(mutations.toSyncProducts),
  );
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(false);

  const brandId = props.queryParams.brandId || 'noBrand';

  const setSyncStatus = (data: any, action: string) => {
    const createData = data[action].items.map((d) => ({
      ...d,
      syncStatus: false,
    }));
    data[action].items = createData;
    return data;
  };

  const setSyncStatusTrue = (data: any, products: any, action: string) => {
    data[action].items = data[action].items.map((i) => {
      if (products.find((c) => c.code === i.code)) {
        let temp = i;
        temp.syncStatus = true;
        return temp;
      }
      return i;
    });
  };

  const setBrand = (brandId: string) => {
    router.setParams(props.history, { brandId: brandId });
    return router;
  };

  const toSyncProducts = (action: string, products: any[]) => {
    setLoading(true);
    toMultiSyncProducts({
      variables: {
        brandId: brandId,
        action: action,
        products: products,
      },
    })
      .then(() => {
        setLoading(false);
        Alert.success('Success. Please check again.');
      })
      .finally(() => {
        let data = items;

        setSyncStatusTrue(data, products, action.toLowerCase());

        setItems(data);
      })
      .catch((e) => {
        Alert.error(e.message);
        setLoading(false);
      });
  };

  const toCheckProducts = () => {
    setLoading(true);
    toMultiCheckProducts({
      variables: { brandId },
    })
      .then((response) => {
        let data = response?.data?.toMultiCheckProducts;

        setSyncStatus(data, 'create');
        setSyncStatus(data, 'update');
        setSyncStatus(data, 'delete');

        setItems(response?.data?.toMultiCheckProducts || {});
        setLoading(false);
      })
      .catch((e) => {
        Alert.error(e.message);
        setLoading(false);
      });
  };

  if (loading) {
    return <Spinner />;
  }
  const updatedProps = {
    ...props,
    loading: loading,
    toCheckProducts,
    setBrand,
    items,
    toSyncProducts,
  };

  const content = (props) => <InventoryProducts {...props} {...updatedProps} />;

  return <Bulk content={content} />;
};

export default withRouter<IRouterProps>(InventoryProductsContainer);
