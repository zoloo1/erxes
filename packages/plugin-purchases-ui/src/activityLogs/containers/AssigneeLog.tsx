import { gql } from '@apollo/client';
import * as compose from 'lodash.flowright';

import { withProps } from '@erxes/ui/src/utils';
import { queries } from '@erxes/ui-purchases/src/boards/graphql';
import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import Spinner from '@erxes/ui/src/components/Spinner';
import AssigneeLog from '../components/AssigneeLog';

type Props = {
  activity: any;
};

type FinalProps = {
  boardLogsQuery: any;
} & Props;

class AssigneeLogContainer extends React.Component<FinalProps> {
  render() {
    const { boardLogsQuery } = this.props;

    if (boardLogsQuery.loading) {
      return <Spinner />;
    }

    const contentDetail = boardLogsQuery.purchaseBoardLogs || {};

    const updatedProps = {
      ...this.props,
      contentDetail,
    };

    return <AssigneeLog {...updatedProps} />;
  }
}

export default withProps<Props>(
  compose(
    graphql<Props, any>(gql(queries.boardLogs), {
      name: 'boardLogsQuery',
      options: ({ activity }) => ({
        variables: {
          action: activity.action,
          content: activity.content,
          contentType: activity.contentType,
          contentId: activity._id,
        },
      }),
    })
  )(AssigneeLogContainer)
);
