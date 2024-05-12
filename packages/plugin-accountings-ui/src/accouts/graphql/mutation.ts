const accountAdd = `
  mutation accountsAdd($code: String, $name: String, $categoryId: String, $parentId: String, $currency: String, $kind: String, $journal: String, $description: String, $branchId: String, $departmentId: String, $isOutBalance: Boolean, $scopeBrandIds: [String]) {
    accountsAdd(code: $code, name: $name, categoryId: $categoryId, parentId: $parentId, currency: $currency, kind: $kind, journal: $journal, description: $description, branchId: $branchId, departmentId: $departmentId, isOutBalance: $isOutBalance, scopeBrandIds: $scopeBrandIds) {
      _id
      code
      name
      status
      currency
      kind
      journal
      description
      categoryId
      branchId
      departmentId
      isOutBalance
      parentId
      createdAt
      scopeBrandIds
    }
  }
`;

const accountsEdit = `
  mutation accountsEdit($id: String!, $code: String, $name: String, $categoryId: String, $parentId: String, $kind: String, $currency: String, $journal: String, $description: String, $branchId: String, $departmentId: String, $isOutBalance: Boolean, $scopeBrandIds: [String]) {
    accountsEdit(_id: $id, code: $code, name: $name, categoryId: $categoryId, parentId: $parentId, kind: $kind, currency: $currency, journal: $journal, description: $description, branchId: $branchId, departmentId: $departmentId, isOutBalance: $isOutBalance, scopeBrandIds: $scopeBrandIds) {
      _id
      code
      name
      status
      currency
      kind
      journal
      description
      categoryId
      branchId
      departmentId
      isOutBalance
      parentId
      createdAt
      scopeBrandIds
    }
  }
`;

const accountsRemove = `
  mutation accountsRemove($accountIds: [String!]) {
    accountsRemove(accountIds: $accountIds)
  }
`;

const accountsMerge = `
  mutation accountsMerge($accountIds: [String], $accountFields: JSON) {
    accountsMerge(accountIds: $accountIds, accountFields: $accountFields) {
      _id
      code
      name
      status
      currency
      kind
      journal
      description
      categoryId
      branchId
      departmentId
      isOutBalance
      parentId
      createdAt
      scopeBrandIds
      category {
        
      }
    }
  }
`

const accountCategoryAdd = `
  mutation accountCategoriesAdd($name: String!, $code: String!, $description: String, $parentId: String, $scopeBrandIds: [String], $status: String, $maskType: String, $mask: JSON) {
    accountCategoriesAdd(name: $name, code: $code, description: $description, parentId: $parentId, scopeBrandIds: $scopeBrandIds, status: $status, maskType: $maskType, mask: $mask) {
      _id
      code
      accountCount
      description
      isRoot
      mask
      maskType
      name
      order
      parentId
      scopeBrandIds
      status
    }
  }
`;

const accountCategoriesEdit = `
  mutation accountCategoriesEdit($id: String!, $name: String!, $code: String!, $description: String, $parentId: String, $scopeBrandIds: [String], $status: String, $maskType: String, $mask: JSON) {
    accountCategoriesEdit(_id: $id, name: $name, code: $code, description: $description, parentId: $parentId, scopeBrandIds: $scopeBrandIds, status: $status, maskType: $maskType, mask: $mask) {
      _id
      name
      description
      parentId
      code
      order
      scopeBrandIds
      status
      isRoot
      accountCount
      maskType
      mask
    }
  }
`;

const accountCategoriesRemove = `
  mutation accountCategoriesRemove($id: String!) {
    accountCategoriesRemove(_id: $id)
  }
`;

export default {
  accountAdd,
  accountsEdit,
  accountsRemove,
  accountsMerge,
  accountCategoryAdd,
  accountCategoriesEdit,
  accountCategoriesRemove
};