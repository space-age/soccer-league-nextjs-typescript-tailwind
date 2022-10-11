import { doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import {
  selectedDivision,
  selectedScheduleWeek,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import { showListOfSchedules } from '../../../../atoms/weekScheduleAtoms'
import { db } from '../../../../firebase'
import useFieldNumberList from '../../../../hooks/useFieldNumberList'
import useSchedulesList from '../../../../hooks/useSchedulesList'
import useTeamList from '../../../../hooks/useTeamList'
import useTimesList from '../../../../hooks/useTimesList'
import { AddedSchedule } from '../../../../typings'

import { v4 as uuidv4 } from 'uuid'

/**
 * Form to add a schedule under the week schedule created.
 * Capability to add multiple schedules.
 * Button to remove schedule created
 */
function AddScheduleForm() {
  const fieldsList = useFieldNumberList()
  const timesList = useTimesList()
  const teamList = useTeamList()
  const currentScheduleList = useSchedulesList()

  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)
  const weekSchedule = useRecoilValue(selectedScheduleWeek)

  const [showListSchedules, setShowListSchedules] =
    useRecoilState(showListOfSchedules)

  const [scheduleList, setScheduleList] = useState([
    { time: '', fieldNumber: null, teamA: '', teamB: '' },
  ])

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddedSchedule>({ shouldUnregister: true })

  /*
    Handles the button to add a schedule, and will add a schedule into array with default values in the object
  */
  const handleAddButton = (e: any) => {
    e.preventDefault()
    const list = [
      ...scheduleList,
      { time: '', fieldNumber: null, teamA: '', teamB: '' },
    ]
    setScheduleList(list)
  }

  /*
    Handles to remove schedule from the list, and unresgistering it from the form
  */
  const handleRemoveButton = (e: any, index: number) => {
    e.preventDefault()
    const list = [...scheduleList]
    list.splice(index, 1)
    setScheduleList(list)
    unregister(`scheduleList.${index}.fieldNumber`)
    unregister(`scheduleList.${index}.teamA`)
    unregister(`scheduleList.${index}.teamB`)
    unregister(`scheduleList.${index}.time`)
  }

  /**
   * Handler for form submission. Creates the schedule
   * @param data
   */
  const onSubmit: SubmitHandler<AddedSchedule> = async (data) => {
    data.scheduleList.map(async (schedule) => {
      // const scheduleName = schedule.teamA + ' vs ' + schedule.teamB
      const scheduleName = uuidv4()
      const dataFieldNumber = +schedule.fieldNumber! // converting the string to number
      await setDoc(
        doc(
          db,
          'Seasons',
          season!,
          'Divisions',
          division!,
          'Weeks-Schedules',
          weekSchedule.idName,
          'Schedules',
          scheduleName
        ),
        {
          ...schedule,
          scoredA: null,
          scoredB: null,
          fieldNumber: dataFieldNumber,
        }
      )
    })
    setScheduleList([{ time: '', fieldNumber: null, teamA: '', teamB: '' }])
    reset({
      scheduleList: [{ time: '', fieldNumber: null, teamA: '', teamB: '' }],
    })
    setShowListSchedules(true) // set to true, will show the lsit of schedules
  }

  /*
    Handles input changes for the select dropdown menu options
    Depending of the attribute passed in, it will modify the array 
    accordingly to the attribue
    And return the new schedule list 
    Reason to do this is because we need to keep track of inputs entered, incase deletion occurs
  */
  const handleInputChanges = (e: any, index: number, attribute: string) => {
    e.preventDefault()
    const { value } = e.target
    const newArray = [...scheduleList]

    attribute === 'fieldNumber' && (newArray[index].fieldNumber = value)
    attribute === 'teamA' && (newArray[index].teamA = value)
    attribute === 'teamB' && (newArray[index].teamB = value)
    attribute === 'time' && (newArray[index].time = value)

    attribute !== null && setScheduleList(newArray)
  }

  return (
    <div className="mt-5 border-t-[1px] border-black">
      <h2 className="my-3 text-2xl font-bold text-[#006064]">
        Add Schedules as needed, and submit when finish
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid-row mt-5 grid gap-3 text-lg"
      >
        {scheduleList.map((schedule, index) => {
          return (
            <div key={uuidv4()} className="flex flex-col">
              <div className="grid grid-cols-7 items-center justify-items-center overflow-auto rounded-lg border-2 border-[#00838f] bg-[#cfd8dc]  px-2 text-xl font-semibold shadow-lg ">
                {/* Field Selection */}
                <label>
                  Field:
                  <select
                    className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
                    {...register(`scheduleList.${index}.fieldNumber`, {
                      required: true,
                      onChange: (e) =>
                        handleInputChanges(e, index, 'fieldNumber'),
                    })}
                    value={
                      schedule.fieldNumber === null ? '' : schedule.fieldNumber
                    }
                  >
                    {/* <option className="mb-3" value=""> */}
                    <option className="mb-3">Select</option>
                    {fieldsList.map(
                      (
                        field: { fieldNumbers: number[]; address: string },
                        indexField: number
                      ) => (
                        <optgroup
                          key={uuidv4()}
                          label={field.address}
                          className="text-black"
                        >
                          {field.fieldNumbers.map(
                            (number: number, indexFieldNumber) => (
                              <option
                                key={uuidv4()}
                                className="text-white"
                                value={number}
                              >
                                {number}
                              </option>
                            )
                          )}
                        </optgroup>
                      )
                    )}
                  </select>
                </label>
                {/* Team A selection */}
                <div className="col-start-2 col-end-4 px-3">
                  <label>
                    Team A:
                    <select
                      className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
                      {...register(`scheduleList.${index}.teamA`, {
                        required: true,
                        onChange: (e) => handleInputChanges(e, index, 'teamA'),
                      })}
                      value={schedule.teamA === null ? '' : schedule.teamA}
                    >
                      <option className="mb-3" value="">
                        Select
                      </option>
                      {teamList.map((team, indexTeamA) => (
                        <option
                          key={uuidv4()}
                          className="text-white"
                          value={team.name}
                        >
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="flex flex-row gap-3 self-center ">
                  <p className="self-center text-[#00acc1]">TBD</p>
                  <p className="self-center">-</p>
                  <p className="self-center text-[#00acc1]">TBD</p>
                </div>

                {/* Team B selection */}
                <div className="col-start-5 col-end-7 px-3">
                  <label>
                    Team B:
                    <select
                      className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
                      {...register(`scheduleList.${index}.teamB`, {
                        required: true,
                        onChange: (e) => handleInputChanges(e, index, 'teamB'),
                      })}
                      value={schedule.teamB === null ? '' : schedule.teamB}
                    >
                      <option className="mb-3" value="">
                        Select
                      </option>
                      {teamList.map((team, indexTeamB) => (
                        <option
                          key={uuidv4()}
                          className="text-white"
                          value={team.name}
                        >
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                {/* Time selection */}
                <label>
                  Time:
                  <select
                    className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
                    {...register(`scheduleList.${index}.time`, {
                      required: true,
                      onChange: (e) => handleInputChanges(e, index, 'time'),
                    })}
                    value={schedule.time === null ? '' : schedule.time}
                  >
                    <option className="mb-3" value="">
                      Select
                    </option>
                    {timesList.map((time: string[], indexTime: number) => (
                      <option
                        key={uuidv4()}
                        className="text-white"
                        value={time}
                      >
                        {time}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              {/* Remove above schedule */}
              {scheduleList.length > 1 && (
                <button
                  className="m-auto mt-2 w-[25%] content-start rounded bg-[#00838f] px-1 text-base font-semibold  tracking-wider text-white hover:bg-[#006064]"
                  onClick={(e) => handleRemoveButton(e, index)}
                >
                  Remove above schedule
                </button>
              )}
            </div>
          )
        })}

        {/* Container for button to add another schedule and submit schedules */}
        <div className="flex justify-center gap-10">
          <button
            onClick={handleAddButton}
            className={`mt-4 w-[18%] content-start justify-self-start rounded bg-[#00838f] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#006064]`}
          >
            Add another schedule
          </button>
          <button
            type="submit"
            className="mt-4 w-[18%] content-start justify-self-start rounded bg-[#b71c1c] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#f44336]"
          >
            Submit Schedules
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddScheduleForm
