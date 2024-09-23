import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from 'react';
import { Header, MainContainer, ProjectTab, Title } from "./styles";
import StepsTab from "./tabs/stepsTab";
import RolesTab from "./tabs/rolesTab";
import OrganizationChartTab from "./tabs/organizationChartTab";

export default function ProjectView({
  project,
  title,
  items,
  members,
  onSearchUserByEmail,
  onAddUserToProject,
  addUserModalInfo,
  onOpenModal,
  onCloseModal,
  onGoBackModal,
  onChangeMemberPermission,
  onChangeMemberRole,
  onSaveChanges,
  hasFullPermissions,
  stepPermissions
}) {
  const [activeTab, setActiveTab] = useState("1");

  function tabs() {
    const tabList = [
      {
        id: "1",
        name: 'Etapas',
        content: <StepsTab
          steps={items}
          hasFullPermissions={hasFullPermissions}
          stepPermissions={stepPermissions}
        />
      },
      {
        id: "2",
        name: 'Organigrama',
        content: <OrganizationChartTab 
          projectId={project?._id}
        />
      }
    ];
    if (hasFullPermissions) {
      tabList.push({
        id: "3",
        name: 'Roles y permisos',
        content: <RolesTab
          members={members}
          onSearchUserByEmail={onSearchUserByEmail}
          onAddUserToProject={onAddUserToProject}
          addUserModalInfo={addUserModalInfo}
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
          onGoBackModal={onGoBackModal}
          onChangeMemberPermission={onChangeMemberPermission}
          onChangeMemberRole={onChangeMemberRole}
          onSaveChanges={onSaveChanges}
        />
      });
    }
    return tabList;
  }

  return (
    <MainContainer>
      <TabContext value={activeTab}>
        <Header position='static'>
          <Title>{title}</Title>
          <TabList
            onChange={(_, newActiveTab) => setActiveTab(newActiveTab)}
            TabIndicatorProps={{ sx: { height: 4, backgroundColor: 'white' } }}
          >
            {tabs().map((tab) => (
              <ProjectTab
                label={tab.name}
                key={tab.id}
                value={tab.id}
              />
            ))}
          </TabList>
        </Header>
        {tabs().map((tab) => (
          <TabPanel key={tab.id} value={tab.id} style={{height: "100%"}}>
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </MainContainer>
  );
}