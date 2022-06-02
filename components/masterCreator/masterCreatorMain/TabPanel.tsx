import { Box, Typography } from '@mui/material'
import React from 'react'

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

export default TabPanel
