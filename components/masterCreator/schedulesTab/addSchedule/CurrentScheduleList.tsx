import React, { useState } from 'react'
import useSchedulesList from '../../../../hooks/useSchedulesList'
import { ScheduleList } from '../../../../typings'
import Schedule from './Schedule'

function CurrentScheduleList() {
  const scheduleList = useSchedulesList()

  // Sorts the schedule list by field number first then by time
  scheduleList.sort((a, b) => {
    if (a.fieldNumber === b.fieldNumber) {
      return a.time < b.time ? -1 : 1
    } else {
      return a.cofieldNumberlA < b.fieldNumber ? -1 : 1
    }
  })

  return (
    <>
      <p className="schedule--label">Field 1</p>
      {scheduleList.map((list, index) => {
        {
          if (list.fieldNumber === '1') return <Schedule list={list} />
        }
      })}
      <p className="schedule--label">Field 2</p>
      {scheduleList.map((list, index) => {
        {
          let counter = 0
          if (list.fieldNumber === '2') {
            counter++
            return <Schedule list={list} />
          }

          if (index === scheduleList.length - 1 && counter === 0)
            return <p className="ml-4 text-xl">No Schedules found.</p>
        }
      })}
      <p className="schedule--label">Field 3</p>
      {scheduleList.map((list, index) => {
        {
          let counter = 0
          if (list.fieldNumber === '3') {
            counter++
            return <Schedule list={list} />
          }

          if (index === scheduleList.length - 1 && counter === 0)
            return <p className="ml-4 text-xl">No Schedules found.</p>
        }
      })}
      <p className="schedule--label">Field 4</p>
      {scheduleList.map((list, index) => {
        {
          let counter = 0
          if (list.fieldNumber === '4') {
            counter++
            return <Schedule list={list} />
          }

          if (index === scheduleList.length - 1 && counter === 0)
            return <p className="ml-4 text-xl">No Schedules found.</p>
        }
      })}
      <p className="schedule--label">Field 5</p>
      {scheduleList.map((list, index) => {
        {
          let counter = 0
          if (list.fieldNumber === '5') {
            counter++
            return <Schedule list={list} />
          }

          if (index === scheduleList.length - 1 && counter === 0)
            return <p className="ml-4 text-xl">No Schedules found.</p>
        }
      })}
      <p className="schedule--label">Field 6</p>
      {scheduleList.map((list, index) => {
        {
          let counter = 0
          if (list.fieldNumber === '6') {
            counter++
            return <Schedule list={list} />
          }

          if (index === scheduleList.length - 1 && counter === 0)
            return <p className="ml-4 text-xl">No Schedules found.</p>
        }
      })}
      <p className="schedule--label">Field 7</p>
      {scheduleList.map((list, index) => {
        {
          let counter = 0
          if (list.fieldNumber === '7') {
            counter++
            return <Schedule list={list} />
          }

          if (index === scheduleList.length - 1 && counter === 0)
            return <p className="ml-4 text-xl">No Schedules found.</p>
        }
      })}
      <p className="schedule--label">Field 8</p>
      {scheduleList.map((list, index) => {
        {
          let counter = 0
          if (list.fieldNumber === '8') {
            counter++
            return <Schedule list={list} />
          }

          if (index === scheduleList.length - 1 && counter === 0)
            return <p className="ml-4 text-xl">No Schedules found.</p>
        }
      })}
      <p className="schedule--label">Field 9</p>
      {scheduleList.map((list, index) => {
        {
          let counter = 0
          if (list.fieldNumber === '9') {
            counter++
            return <Schedule list={list} />
          }

          if (index === scheduleList.length - 1 && counter === 0)
            return <p className="ml-4 text-xl">No Schedules found.</p>
        }
      })}
    </>
  )
}

export default CurrentScheduleList
