import Spinner from '@erxes/ui/src/components/Spinner';
import gql from 'graphql-tag';
import * as compose from 'lodash.flowright';
import { withProps } from 'modules/common/utils';
import React from 'react';
import { graphql } from 'react-apollo';
import { IExportHistoryContentType } from '../../types';
import TypeForm from '../components/TypeForm';
import { mutations, queries } from '../graphql';

type Props = {
  onChangeContentType: (value: IExportHistoryContentType) => void;
  contentTypes: IExportHistoryContentType[];
};

type State = {};

type FinalProps = {
  exportHistoryGetTypes: any;
} & Props;

class FormContainer extends React.Component<FinalProps, State> {
  render() {
    const { exportHistoryGetTypes } = this.props;

    if (exportHistoryGetTypes.loading) {
      return <Spinner />;
    }

    const typeOptions = exportHistoryGetTypes.exportHistoryGetTypes || [];

    return (
      <TypeForm
        onChangeContentType={this.props.onChangeContentType}
        contentTypes={this.props.contentTypes}
        typeOptions={typeOptions}
      />
    );
  }
}

export default withProps<Props>(
  compose(
    graphql<Props>(gql(mutations.exportHistoriesCreate), {
      name: 'exportHistoriesCreate'
    }),
    graphql<Props>(gql(queries.exportHistoryGetTypes), {
      name: 'exportHistoryGetTypes'
    }),
    graphql<Props>(gql(mutations.exportHistoryInfo), {
      name: 'exportHistoryInfo'
    })
  )(FormContainer)
);
