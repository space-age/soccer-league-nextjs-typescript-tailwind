import { doc, DocumentData, updateDoc } from 'firebase/firestore'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedScheduleWeek,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import { db } from '../../../../firebase'
import useFieldNumberList from '../../../../hooks/useFieldNumberList'
import useTeamList from '../../../../hooks/useTeamList'
import useTimesList from '../../../../hooks/useTimesList'
import { ScheduleList } from '../../../../typings'

interface Props {
  list: ScheduleList | DocumentData
  handleEditClick: () => void
}

function EditScheduleForm({ list, handleEditClick }: Props) {
  const fieldsList = useFieldNumberList()
  const teamList = useTeamList()
  const timesList = useTimesList()

  const seasonsData = useRecoilValue(selectedSeason)
  const divisionData = useRecoilValue(selectedDivision)
  const weekScheduleData = useRecoilValue(selectedScheduleWeek)

  const handleCancelButton = () => {
    handleEditClick()
  }

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ScheduleList>({ shouldUnregister: true })

  const onSubmit: SubmitHandler<ScheduleList> = async (data) => {
    const listRef = doc(
      db,
      'Seasons',
      seasonsData!,
      'Divisions',
      divisionData!,
      'Weeks-Schedules',
      weekScheduleData!,
      'Schedules',
      list.idName!
    )
    await updateDoc(listRef, {
      fieldNumber: data.fieldNumber,
      teamA: data.teamA,
      teamB: data.teamB,
      time: data.time,
    })

    handleEditClick()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="flex flex-col">
        <div className="grid grid-cols-7 items-center justify-items-center overflow-auto rounded-lg border-2 border-[#00838f] bg-[#cfd8dc]  px-2 text-xl font-semibold shadow-lg ">
          {/* Field Selection */}
          <label>
            Field:
            <select
              className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
              {...register(`fieldNumber`, {
                required: true,
              })}
            >
              <option className="mb-3" value={list.fieldNumber}>
                {list.fieldNumber}
              </option>
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
          {/* Team A selection */}
          <div className="col-start-2 col-end-4 px-3">
            <label>
              Team A:
              <select
                className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
                {...register(`teamA`, {
                  required: true,
                })}
              >
                <option className="mb-3" value={list.teamA}>
                  {list.teamA}
                </option>
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
            <p className="self-center text-[#00acc1]">TBD</p>
            <p className="self-center">vs.</p>
            <p className="self-center text-[#00acc1]">TBD</p>
          </div>

          {/* Team B selection */}
          <div className="col-start-5 col-end-7 px-3">
            <label>
              Team B:
              <select
                className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
                {...register(`teamB`, {
                  required: true,
                })}
              >
                <option className="mb-3" value={list.teamB}>
                  {list.teamB}
                </option>
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

          {/* Time selection */}
          <label>
            Time:
            <select
              className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
              {...register(`time`, {
                required: true,
              })}
            >
              <option className="mb-3" value={list.time}>
                {list.time}
              </option>
              <option className="mb-3" value="">
                Select
              </option>
              {timesList.map((time: string[], indexTime: number) => (
                <option key={indexTime} className="text-white" value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex justify-center gap-10">
          <button
            onClick={handleCancelButton}
            className={`mt-4 w-[16%] content-start justify-self-start rounded bg-[#b71c1c] px-1 text-lg font-bold  tracking-wider text-white hover:bg-[#f44336]`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="mt-4 w-[16%] content-start justify-self-start rounded bg-[#2e7d32] text-lg font-bold  tracking-wider text-white hover:bg-[#66bb6a]"
          >
            Submit Schedules
          </button>
        </div>
      </div>
    </form>
  )
}

export default EditScheduleForm
