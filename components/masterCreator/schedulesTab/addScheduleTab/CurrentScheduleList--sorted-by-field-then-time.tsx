import React, { useEffect, useState } from 'react'
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
      return a.fieldNumber < b.fieldNumber ? -1 : 1
    }
  })

  let listCounter = 0

  return (
    <>
      <p className="schedule--label">Field 1</p>
      {scheduleList.map((list, index) => {
        {
          if (list.fieldNumber === '1') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <Schedule key={index} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={index} className="ml-4 text-xl">
                No Schedules found.
              </p>
            )
        }
      })}
      <p className="schedule--label">Field 2</p>
      {scheduleList.map((list, index) => {
        {
          if (list.fieldNumber === '2') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <Schedule key={index} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={index} className="ml-4 text-xl">
                No Schedules found.
              </p>
            )
        }
      })}

      <p className="schedule--label">Field 3</p>
      {scheduleList.map((list, index) => {
        {
          if (list.fieldNumber === '3') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <Schedule key={index} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={index} className="ml-4 text-xl">
                No Schedules found.
              </p>
            )
        }
      })}

      <p className="schedule--label">Field 4</p>
      {scheduleList.map((list, index) => {
        {
          if (list.fieldNumber === '4') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <Schedule key={index} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={index} className="ml-4 text-xl">
                No Schedules found.
              </p>
            )
          else if (index === scheduleList.length - 1 && 0 < listCounter)
            listCounter = 0
        }
      })}

      <p className="schedule--label">Field 5</p>
      {scheduleList.map((list, index) => {
        {
          if (list.fieldNumber === '5') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <Schedule key={index} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={index} className="ml-4 text-xl">
                No Schedules found.
              </p>
            )
        }
      })}
      <p className="schedule--label">Field 6</p>
      {scheduleList.map((list, index) => {
        {
          if (list.fieldNumber === '6') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <Schedule key={index} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={index} className="ml-4 text-xl">
                No Schedules found.
              </p>
            )
        }
      })}
      <p className="schedule--label">Field 7</p>
      {scheduleList.map((list, index) => {
        {
          if (list.fieldNumber === '7') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <Schedule key={index} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={index} className="ml-4 text-xl">
                No Schedules found.
              </p>
            )
        }
      })}
      <p className="schedule--label">Field 8</p>
      {scheduleList.map((list, index) => {
        {
          if (list.fieldNumber === '8') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <Schedule key={index} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={index} className="ml-4 text-xl">
                No Schedules found.
              </p>
            )
        }
      })}
      <p className="schedule--label">Field 9</p>
      {scheduleList.map((list, index) => {
        {
          if (list.fieldNumber === '9') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <Schedule key={index} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={index} className="ml-4 text-xl">
                No Schedules found.
              </p>
            )
        }
      })}
    </>
  )
}

export default CurrentScheduleList
