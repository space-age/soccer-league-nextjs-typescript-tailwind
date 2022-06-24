import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { selectedScheduleWeek } from '../../../../atoms/seasonAtoms'
import useSchedulesList from '../../../../hooks/useSchedulesList'
import { ScheduleList } from '../../../../typings'
import RecordScores from './RecordScores'

function RecordSchedulesForm() {
  const scheduleList = useSchedulesList()
  const scheduleWeekList = useRecoilValue(selectedScheduleWeek)

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
    <div className="my-5 rounded-sm border-2  border-[#ccc] bg-[#eeeeee] p-3">
      <div>
        <h1 className="pb-2 text-center font-bold sm:p-2 sm:text-xl md:text-2xl lg:text-3xl">
          Schedules for:{' '}
          <span className="text-[#006064]">{scheduleWeekList}</span>
        </h1>
      </div>

      {/* List of games at 8am */}
      <p className="schedule--label">8:00 AM</p>
      {(scheduleList.length === 0 || scheduleList === undefined) && (
        <p className="ml-4 text-xl">No Schedules found.</p>
      )}
      {scheduleList.map((list, index) => {
        {
          if (list.time === '08 AM') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <RecordScores key={index} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={index} className="ml-4 text-xl">
                No Schedules found.
              </p>
            )
        }
      })}

      {/* List of games at 10am */}
      <p className="schedule--label">10:00 AM</p>
      {(scheduleList.length === 0 || scheduleList === undefined) && (
        <p className="ml-4 text-xl">No Schedules found.</p>
      )}
      {scheduleList.map((list, index) => {
        {
          if (list.time === '10 AM') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <RecordScores key={index} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={index} className="ml-4 text-xl">
                No Schedules found.
              </p>
            )
        }
      })}

      {/* List of games at 12pm */}
      <p className="schedule--label">12:00 PM</p>
      {(scheduleList.length === 0 || scheduleList === undefined) && (
        <p className="ml-4 text-xl">No Schedules found.</p>
      )}
      {scheduleList.map((list, index) => {
        {
          if (list.time === '12 PM') {
            listCounter++
            if (index === scheduleList.length - 1) listCounter = 0
            return <RecordScores key={index} list={list} />
          }

          if (index === scheduleList.length - 1 && listCounter === 0)
            return (
              <p key={index} className="ml-4 text-xl">
                No Schedules found.
              </p>
            )
        }
      })}
    </div>
  )
}

export default RecordSchedulesForm
