export const types = `
  type Dashboard {
    _id: String!
    name: String
    visibility: String
    selectedMemberIds: [String]
    description: String
    parentId: String
    childsDashboard: [Dashboard]
    order: String
    createdAt: Date
    dashboardCount: Int
    relatedIds: [String]
  }

  type DashboardItem {
    _id: String!
    dashboardId: String
    layout: String
    vizState: String
    name: String
    type: String
    isDateRange: Boolean
  }

  type DashboardListResponse {
    list: [Dashboard],
    totalCount: Float,
  }
`;

const queryParams = `
  page: Int
  perPage: Int
  ids: [String]
  excludeIds: Boolean
  searchValue: String
  sortField: String
  sortDirection: Int
`;

export const queries = `
  dashboards(${queryParams}): [Dashboard]
  dashboardsMain(${queryParams}): DashboardListResponse
  dashboardDetails(_id: String!): Dashboard
  dashboardsTotalCount: Int
  dashboardItems(dashboardId: String!): [DashboardItem]
  dashboardItemDetail(_id: String!): DashboardItem
  dashboardInitialDatas(type: String): [DashboardItem]
  dashboardFilters(type: String): JSON
`;

export const mutations = `
  dashboardAdd(name: String, description: String, visibility: String, selectedMemberIds: [String], parentId: String): Dashboard
  dashboardEdit(_id: String!, name: String!, description: String, visibility: String, selectedMemberIds: [String], parentId: String): Dashboard
  dashboardRemove(_id: String!): JSON
  dashboardItemAdd(dashboardId: String, layout: String, vizState: String, name: String, type: String, isDateRange: Boolean): DashboardItem
  dashboardItemEdit(_id: String!, dashboardId:String, layout: String, vizState: String, name: String, type: String): DashboardItem
  dashboardItemRemove(_id: String!): String
  renderDashboard: String
`;
