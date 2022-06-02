import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import GroupsIcon from '@mui/icons-material/Groups'
import EventIcon from '@mui/icons-material/Event'
import TableChartIcon from '@mui/icons-material/TableChart'

import SeasonsTabContainer from '../components/masterCreator/seasonsTab/SeasonsTabContainer'
import ScheduleTabContainer from '../components/masterCreator/schedulesTab/ScheduleTabContainer'
import TablesTabContainer from '../components/masterCreator/tablesTab/TablesTabContainer'
import TeamsTabContainer from '../components/masterCreator/teamsTab/TeamsTabContainer'

import LogOutButton from '../components/masterCreator/masterCreatorMain/LogOutButton'
import HomeButton from '../components/masterCreator/masterCreatorMain/HomeButton'
import ArrowButton from '../components/masterCreator/masterCreatorMain/ArrowButton'
import TabPanel from '../components/masterCreator/masterCreatorMain/TabPanel'

import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

function MainHead() {
  return (
    <Head>
      <title>Master Creator</title>
      <link rel="icon" href="/ball.png" />
    </Head>
  )
}
export default function VerticalTabs() {
  const [value, setValue] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const [hide, setHide] = useState(true)
  const handleButton = () => {
    setHide(!hide)
  }

  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push('/login-master-creator')
    return null
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
      }}
      className="!hidden xl:!flex"
    >
      <MainHead />
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical Tabs"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        className={`!fixed !top-0 !h-[100vh]  bg-[#455a64]  p-5 ${
          !hide && 'p-0 pt-10 '
        }`}
      >
        <Tab
          className={`masterCreator--Tab`}
          label={`${hide ? 'Seasons' : ''}`}
          icon={<CalendarTodayIcon />}
          iconPosition="start"
          {...a11yProps(0)}
        />
        <Tab
          className={`masterCreator--Tab`}
          label={`${hide ? 'Teams' : ''}`}
          icon={<GroupsIcon />}
          iconPosition="start"
          {...a11yProps(1)}
        />
        <Tab
          className={`masterCreator--Tab`}
          label={`${hide ? 'Schedules' : ''}`}
          icon={<EventIcon />}
          iconPosition="start"
          {...a11yProps(2)}
        />
        <Tab
          className={`masterCreator--Tab`}
          label={`${hide ? 'Tables' : ''}`}
          icon={<TableChartIcon />}
          iconPosition="start"
          {...a11yProps(3)}
        />
        <ArrowButton hide={hide} handleButton={handleButton} />
        <HomeButton hide={hide} />
        <LogOutButton hide={hide} />
      </Tabs>
      <TabPanel value={value} index={0} hide={hide}>
        <SeasonsTabContainer />
      </TabPanel>
      <TabPanel value={value} index={1} hide={hide}>
        <TeamsTabContainer />
      </TabPanel>
      <TabPanel value={value} index={2} hide={hide}>
        <ScheduleTabContainer />
      </TabPanel>
      <TabPanel value={value} index={3} hide={hide}>
        <TablesTabContainer />
      </TabPanel>
    </Box>
  )
}
