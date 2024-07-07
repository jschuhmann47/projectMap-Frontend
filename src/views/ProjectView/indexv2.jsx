import { Header, Title, MainContainer, ProjectTab } from "./styles"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { useState } from "react"

export default function ProjectView({ titulo }) {
  const [activeTab, setActiveTab] = useState(1);
  const tabs = [{
      id: 1,
      name: 'Etapas',
      content: <div>etapas</div>
    }, {
      id: 2,
      name: 'Organigrama',
      content: <div>organigrama</div>
    }, {
      id: 3,
      name: 'Roles y permisos',
      content: <div>roles y permisos</div>
  }]
  return (
    <MainContainer>
      <TabContext value={activeTab}>
        <Header position='static'>
          <Title>{titulo}</Title>
          <TabList
            onChange={(_, newActiveTab) => setActiveTab(newActiveTab)}
            TabIndicatorProps={{ sx: { height: 4, backgroundColor: 'white' }}}
          >
            {tabs.map((tab) => (<ProjectTab
              label={tab.name}
              key={tab.id}
              value={tab.id}
            />))}
          </TabList>
        </Header>
        {tabs.map((tab) => (
          <TabPanel key={tab.id} value={tab.id}>{tab.content}</TabPanel>
        ))}
      </TabContext>
    </MainContainer>
  )
}