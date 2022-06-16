import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { selectedDivision, selectedSeason } from '../../../../atoms/seasonAtoms'
import {
  inputsDisable,
  showAddScheduleForm,
  showAddWeekScheduleForm,
} from '../../../../atoms/weekScheduleAtoms'
import useFieldNumberList from '../../../../hooks/useFieldNumberList'
import useTeamList from '../../../../hooks/useTeamList'
import useTimesList from '../../../../hooks/useTimesList'
import { AddedSchedule } from '../../../../typings'

function AddScheduleForm() {
  const fieldsList = useFieldNumberList()
  const timesList = useTimesList()
  const teamList = useTeamList()

  const resetSeason = useResetRecoilState(selectedSeason)
  const resetDivision = useResetRecoilState(selectedDivision)

  const [disableInput, setDisableInput] = useRecoilState(inputsDisable)
  const [showAddSchedulesForm, setShowAddSchedulesForm] =
    useRecoilState(showAddScheduleForm)
  const [showAddWeekSchedulesForm, setShowAddWeekSchedulesForm] =
    useRecoilState(showAddWeekScheduleForm)

  const [scheduleList, setScheduleList] = useState([
    { time: '', fieldNumber: 0, teamA: '', teamB: '' },
  ])

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddedSchedule>({ shouldUnregister: true })

  /*
    Handles the button to add a schedule, and will add a schedule into array with default values in the object
  */
  const handleAddButton = (e: any) => {
    e.preventDefault()
    const list = [
      ...scheduleList,
      { time: '', fieldNumber: 0, teamA: '', teamB: '' },
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
    unregister(`scheduleList.${index}.time`)
    unregister(`scheduleList.${index}.fieldNumber`)
    unregister(`scheduleList.${index}.teamA`)
    unregister(`scheduleList.${index}.teamB`)
  }

  const onSubmit: SubmitHandler<AddedSchedule> = async (data) => {
    console.log(data)
    setScheduleList([{ time: '', fieldNumber: 0, teamA: '', teamB: '' }])
    setDisableInput(false)
    setShowAddSchedulesForm(false)
    setShowAddWeekSchedulesForm(false)
    resetSeason()
    resetDivision()
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
            <div key={index} className="flex flex-col">
              <div className="grid grid-cols-7 items-center justify-items-center overflow-auto rounded-lg border-2 border-[#00838f] bg-[#cfd8dc]  px-2 text-xl font-semibold shadow-lg ">
                <label>
                  Field:
                  <select
                    className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
                    // {...register(`teams.${index}.name`, {
                    {...register(`scheduleList.${index}.fieldNumber`, {
                      required: 'Field Number is required',
                    })}
                  >
                    <option className="mb-3" value="">
                      Select
                    </option>
                    {fieldsList.map(
                      (
                        field: { fieldNumbers: number[]; address: string },
                        indexField: number
                      ) => (
                        <optgroup
                          key={indexField}
                          label={field.address}
                          className="text-black"
                        >
                          {field.fieldNumbers.map(
                            (number: number, indexFieldNumber) => (
                              <option
                                key={indexFieldNumber}
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

                <div className="col-start-2 col-end-4 px-3">
                  <label>
                    Team A:
                    <select
                      className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
                      {...register(`scheduleList.${index}.teamA`, {
                        required: 'Team A is required',
                      })}
                    >
                      <option className="mb-3" value="">
                        Select
                      </option>
                      {teamList.map((team, indexTeamA) => (
                        <option
                          key={indexTeamA}
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
                  <p className="self-center text-[#00acc1]">(Goals)</p>
                  <p className="self-center">vs.</p>
                  <p className="self-center text-[#00acc1]">(Goals)</p>
                </div>
                <div className="col-start-5 col-end-7 px-3">
                  <label>
                    Team B:
                    <select
                      className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
                      {...register(`scheduleList.${index}.teamB`, {
                        required: 'Team B is required',
                      })}
                    >
                      <option className="mb-3" value="">
                        Select
                      </option>
                      {teamList.map((team, indexTeamB) => (
                        <option
                          key={indexTeamB}
                          className="text-white"
                          value={team.name}
                        >
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <label>
                  Time:
                  <select
                    className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
                    {...register(`scheduleList.${index}.time`, {
                      required: 'Time is required',
                    })}
                  >
                    <option className="mb-3" value="">
                      Select
                    </option>
                    {timesList.map((time: string[], indexTime: number) => (
                      <option
                        key={indexTime}
                        className="text-white"
                        value={time}
                      >
                        {time}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button
                className="m-auto mt-2 w-[25%] content-start rounded bg-[#00838f] px-1 text-base font-semibold  tracking-wider text-white hover:bg-[#006064]"
                onClick={(e) => handleRemoveButton(e, index)}
              >
                Remove above schedule
              </button>
            </div>
          )
        })}

        <div className="flex justify-center gap-10">
          <button
            // disabled={checkWeekName ? true : false}
            onClick={handleAddButton}
            className={`mt-4 w-[18%] content-start justify-self-start rounded bg-[#00838f] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#006064]`}
          >
            Add another schedule
          </button>
          <button
            // disabled={checkWeekName ? true : false}
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
