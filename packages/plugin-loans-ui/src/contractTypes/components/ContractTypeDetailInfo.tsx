import Alert from "@erxes/ui/src/utils/Alert";
import Button from "@erxes/ui/src/components/Button";
import confirm from "@erxes/ui/src/utils/confirmation/confirm";
import DropdownToggle from "@erxes/ui/src/components/DropdownToggle";
import { FieldStyle } from "@erxes/ui/src/layout/styles";
import Icon from "@erxes/ui/src/components/Icon";
import { MainStyleInfoWrapper as InfoWrapper } from "@erxes/ui/src/styles/eindex";
import ModalTrigger from "@erxes/ui/src/components/ModalTrigger";
import Sidebar from "@erxes/ui/src/layout/components/Sidebar";
import { SidebarCounter, SidebarList } from "@erxes/ui/src/layout/styles";
import { __ } from "coreui/utils";
import Dropdown from "@erxes/ui/src/components/Dropdown";
import { Action, Name } from "../../contracts/styles";
import React from "react";

import { Description } from "../../contracts/styles";
import ContractTypeForm from "../containers/ContractTypeForm";
import { IContractTypeDetail } from "../types";

type Props = {
  contractType: IContractTypeDetail;
  remove?: () => void;
};

const DetailInfo = (props: Props) => {
  const renderRow = (label, value) => {
    return (
      <li>
        <FieldStyle>{__(`${label}`)}</FieldStyle>
        <SidebarCounter>{value || "-"}</SidebarCounter>
      </li>
    );
  };

  const renderAction = () => {
    const { remove } = props;

    const onDelete = () =>
      confirm()
        .then(() => remove && remove())
        .catch((error) => {
          Alert.error(error.message);
        });

    return (
      <Action>
        <Dropdown
          as={DropdownToggle}
          toggleComponent={
            <Button btnStyle="simple" size="medium">
              {__("Action")}
              <Icon icon="angle-down" />
            </Button>
          }
        >
          <li>
            <a href="#delete" onClick={onDelete}>
              {__("Delete")}
            </a>
          </li>
        </Dropdown>
      </Action>
    );
  };

  const { contractType } = props;
  const { Section } = Sidebar;

  const content = (props) => (
    <ContractTypeForm {...props} contractType={contractType} />
  );

  return (
    <Sidebar wide={true}>
      <Sidebar.Section>
        <InfoWrapper>
          <Name>{contractType.name}</Name>
          <ModalTrigger
            title={__("Edit basic info")}
            trigger={<Icon icon="edit" />}
            size="lg"
            content={content}
          />
        </InfoWrapper>

        {renderAction()}

        <Section>
          <SidebarList className="no-link">
            {renderRow("Code", contractType.code)}
            {renderRow("Name", contractType.name || "")}
            {renderRow("Start Number", contractType.number || "")}
            {renderRow(
              "After vacancy count",
              (contractType.vacancy || 0).toLocaleString()
            )}
            {renderRow(
              "Loss percent",
              (contractType.unduePercent || 0).toLocaleString()
            )}
            {renderRow("Loss calc type", contractType.undueCalcType)}
            {renderRow("Is use debt", __(contractType.useDebt ? "Yes" : "No"))}
            {renderRow(
              "Is use margin",
              __(contractType.useMargin ? "Yes" : "No")
            )}
            {renderRow(
              "Is use skip interest",
              __(contractType.useSkipInterest ? "Yes" : "No")
            )}

            {renderRow("Leasing Type", contractType.leaseType)}
            <li>
              <FieldStyle>{__(`Allow categories`)}</FieldStyle>
            </li>
            <ul>
              {contractType.productCategories.map((cat) => {
                return (
                  <li key={cat._id}>
                    {cat.code} - {cat.name}
                  </li>
                );
              })}
            </ul>
            <li>
              <FieldStyle>{__(`Description`)}</FieldStyle>
            </li>
            <Description
              dangerouslySetInnerHTML={{
                __html: contractType.description,
              }}
            />
          </SidebarList>
        </Section>
      </Sidebar.Section>
    </Sidebar>
  );
};

export default DetailInfo;
