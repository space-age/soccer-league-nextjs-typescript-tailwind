import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'

import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined'

import SeasonsTabContainer from '../components/masterCreator/seasonsTab/SeasonsTabContainer'
import ScheduleTabContainer from '../components/masterCreator/schedulesTab/ScheduleTabContainer'
import TablesTabContainer from '../components/masterCreator/tablesTab/TablesTabContainer'
import TeamsTabContainer from '../components/masterCreator/teamsTab/TeamsTabContainer'

import useAuth from '../hooks/useAuth'
import { useState } from 'react'

import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import GroupsIcon from '@mui/icons-material/Groups'
import EventIcon from '@mui/icons-material/Event'
import TableChartIcon from '@mui/icons-material/TableChart'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'

import Link from 'next/link'

/*
  Returns a tab Panel Container,
  which holds the content container for each tab
*/
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  hide: boolean
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, hide, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      className={`w-full ${hide ? 'ml-64' : 'ml-24'}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

/*
  Returns a Logout button,
    when clicked, it will log out the user and re-direct to the login page
*/
interface Props {
  hide: boolean
}
function LogOutButton(props: Props) {
  const { hide } = props
  const { logout } = useAuth()
  return (
    <div>
      {!hide ? (
        <LogoutIcon
          onClick={logout}
          className={`!absolute !right-8 !bottom-10 cursor-pointer !text-2xl !font-bold !normal-case !text-[#fafafa] hover:!text-[#03a9f4]`}
        />
      ) : (
        <Button
          onClick={logout}
          className={`!absolute !bottom-0 !right-5 !text-3xl !font-bold !normal-case !text-[#fafafa] hover:!text-[#03a9f4]`}
        >
          {/* <LogoutIcon /> */}
          Log out
        </Button>
      )}
    </div>
  )
}

/*

*/

function HomeButton(props: Props) {
  const { hide } = props
  return (
    <div>
      <Link href="/">
        {!hide ? (
          <HomeIcon
            className={`!absolute !bottom-24 !right-9 cursor-pointer !text-2xl !font-bold !normal-case !text-[#fafafa] hover:!text-[#03a9f4]`}
          />
        ) : (
          <p
            className={
              '!absolute !bottom-24 !right-9 cursor-pointer !text-3xl !font-bold !normal-case !text-[#fafafa] hover:!text-[#03a9f4]'
            }
          >
            Home
          </p>
        )}
      </Link>
    </div>
  )
}

/*
  Returns the arrow button: 
    left arrow when not hiding options and right arrow when not hiding options
  When button click, it will toggle the hide value from true/false
*/
interface ArrowButtonProps {
  hide: boolean
  handleButton: () => void
}
function ArrowButton(props: ArrowButtonProps) {
  const { hide, handleButton } = props
  return (
    <div className={'!absolute !bottom-40 !right-5'}>
      <Button onClick={handleButton}>
        {hide ? (
          <KeyboardDoubleArrowLeftOutlinedIcon className="!text-5xl !text-[#fafafa] hover:!text-[#03a9f4]" />
        ) : (
          <KeyboardDoubleArrowRightOutlinedIcon className="!pl-3 !text-5xl !text-[#fafafa] hover:!text-[#03a9f4]" />
        )}
      </Button>
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
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

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        className={`!fixed !top-0 !h-[100vh]  bg-[#455a64]  p-5 ${
          !hide && 'p-0 pt-10 '
        }`}
      >
        <Tab
          className={`!text-3xl !normal-case hover:!text-[white]`}
          label={`${hide ? 'Seasons' : ''}`}
          icon={<CalendarTodayIcon />}
          iconPosition="start"
          {...a11yProps(0)}
        />
        <Tab
          className={`!text-3xl !normal-case hover:!text-[white]`}
          label={`${hide ? 'Teams' : ''}`}
          icon={<GroupsIcon />}
          iconPosition="start"
          {...a11yProps(1)}
        />
        <Tab
          className={`!text-3xl !normal-case hover:!text-[white]`}
          label={`${hide ? 'Schedules' : ''}`}
          icon={<EventIcon />}
          iconPosition="start"
          {...a11yProps(2)}
        />
        <Tab
          className={`!text-3xl !normal-case hover:!text-[white]`}
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
