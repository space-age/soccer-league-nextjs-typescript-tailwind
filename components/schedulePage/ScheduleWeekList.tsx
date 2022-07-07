import React, { useEffect, useState } from 'react'
import useSchedulesList from '../../hooks/useSchedulesList'
import TeamSchedule from './TeamSchedule'
import { v4 as uuidv4 } from 'uuid'

function ScheduleWeekList() {
  const scheduleList = useSchedulesList()

  // Sorts the schedule list by time first then by field number
  scheduleList.sort((a, b) => {
    if (a.time === b.time) {
      return a.fieldNumber < b.fieldNumber ? -1 : 1
    } else {
      return a.time < b.time ? -1 : 1
    }
  })

  let listCounter = 0

  return (
    <>
      {/* List of games at 8am */}
      <p className="main-schedule--label">8:00 AM</p>
      {(scheduleList.length === 0 || scheduleList === undefined) && (
        <p className="main-schedule--paragraph">No Schedules found</p>
      )}
      {scheduleList.map((list, index) => {
        {
          if (list.time === '08 AM') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <TeamSchedule key={uuidv4()} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={uuidv4()} className="ml-4 text-xl">
                No Schedules found
              </p>
            )
        }
      })}

      {/* List of games at 10am */}
      <p className="main-schedule--label">10:00 AM</p>
      {(scheduleList.length === 0 || scheduleList === undefined) && (
        <p className="main-schedule--paragraph">No Schedules found</p>
      )}
      {scheduleList.map((list, index) => {
        {
          if (list.time === '10 AM') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <TeamSchedule key={uuidv4()} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={uuidv4()} className="ml-4 text-xl">
                No Schedules found
              </p>
            )
        }
      })}

      {/* List of games at 12pm */}
      <p className="main-schedule--label">12:00 PM</p>
      {(scheduleList.length === 0 || scheduleList === undefined) && (
        <p className="main-schedule--paragraph">No Schedules found</p>
      )}
      {scheduleList.map((list, index) => {
        {
          if (list.time === '12 PM') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <TeamSchedule key={uuidv4()} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={uuidv4()} className="ml-4 text-xl">
                No Schedules found.
              </p>
            )
        }
      })}
    </>
  )
}

export default ScheduleWeekList
