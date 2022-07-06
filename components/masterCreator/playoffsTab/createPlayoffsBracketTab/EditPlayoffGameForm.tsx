import { doc, DocumentData, updateDoc } from 'firebase/firestore'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedPlayoffBracket,
  selectedScheduleWeek,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import { db } from '../../../../firebase'
import useFieldNumberList from '../../../../hooks/useFieldNumberList'
import useTeamList from '../../../../hooks/useTeamList'
import useTimesList from '../../../../hooks/useTimesList'
import { Playoff } from '../../../../typings'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  handleEditClick: () => void
  game: Playoff
  stage: string
  matchGame: string
}

function EditPlayoffGameForm({
  game,
  handleEditClick,
  stage,
  matchGame,
}: Props) {
  const fieldsList = useFieldNumberList()
  const teamList = useTeamList()
  const timesList = useTimesList()

  const seasonsData = useRecoilValue(selectedSeason)
  const divisionData = useRecoilValue(selectedDivision)
  const brackeDate = useRecoilValue(selectedPlayoffBracket)

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
  } = useForm<Playoff>({ shouldUnregister: true })

  const onSubmit: SubmitHandler<Playoff> = async (data) => {
    const scoreA = !data.scoredA || data.scoredA === 'TBD' ? null : data.scoredA
    const scoreB = !data.scoredB || data.scoredB === 'TBD' ? null : data.scoredB

    const listRef = doc(
      db,
      'Seasons',
      seasonsData!,
      'Divisions',
      divisionData!,
      'Playoffs-Brackets',
      brackeDate.idName,
      'Stages',
      stage
    )

    const temp = {
      fieldNumber: data.fieldNumber,
      teamA: data.teamA,
      teamB: data.teamB,
      time: data.time,
      scoredA: scoreA,
      scoredB: scoreB,
      date: data.date,
    }

    if (matchGame === 'match1Game1') {
      const match1Game1 = temp
      await updateDoc(listRef, {
        match1Game1,
      })
    }
    if (matchGame === 'match1Game2') {
      const match1Game2 = temp
      await updateDoc(listRef, {
        match1Game2,
      })
    }
    if (matchGame === 'match2Game1') {
      const match2Game1 = temp
      await updateDoc(listRef, {
        match2Game1,
      })
    }
    if (matchGame === 'match2Game2') {
      const match2Game2 = temp
      await updateDoc(listRef, {
        match2Game2,
      })
    }
    if (matchGame === 'match3Game1') {
      const match3Game1 = temp
      await updateDoc(listRef, {
        match3Game1,
      })
    }
    if (matchGame === 'match3Game2') {
      const match3Game2 = temp
      await updateDoc(listRef, {
        match3Game2,
      })
    }
    if (matchGame === 'match4Game1') {
      const match4Game1 = temp
      await updateDoc(listRef, {
        match4Game1,
      })
    }
    if (matchGame === 'match4Game2') {
      const match4Game2 = temp
      await updateDoc(listRef, {
        match4Game2,
      })
    }
    if (matchGame === 'final') {
      const final = temp
      await updateDoc(listRef, {
        final,
      })
    }

    handleEditClick() // closes the form and hides the submission button
  }

  const getOptions = () => {
    const MAX_GOALS = 25
    let content = []
    for (var i = 0; i <= MAX_GOALS; i++) {
      content.push(
        <option key={uuidv4()} value={i}>
          {i}
        </option>
      )
    }
    return content
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="flex flex-col">
        <label className=" ml-1 mb-2 text-xl font-semibold">
          Select game date:
          <input
            type="date"
            min=""
            className="ml-3 px-1 tracking-wider placeholder:tracking-wider"
            {...register('date', { required: true })}
            defaultValue={game.date === null ? '' : game.date}
          />
        </label>
        {errors.date && (
          <p className="text-[13px] font-light text-orange-500">
            Must enter a date.
          </p>
        )}
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
              {game.fieldNumber === null && (
                <option className="mb-3" value="">
                  Select
                </option>
              )}
              {game.fieldNumber !== null && (
                <>
                  <option className="mb-3" value={game.fieldNumber!}>
                    {game.fieldNumber}
                  </option>
                  <option className="mb-3" value="">
                    Select
                  </option>
                </>
              )}
              <option className="mb-3" value="TBD">
                TBD
              </option>
              <optgroup label="----"></optgroup>
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
                {(!game.teamA || game.teamA.length === 0) && (
                  <option className="mb-3" value="">
                    Select
                  </option>
                )}
                {(game.teamA || game.teamA.length !== 0) && (
                  <>
                    <option className="mb-3" value={game.teamA}>
                      {game.teamA}
                    </option>
                    <option className="mb-3" value="">
                      Select
                    </option>
                  </>
                )}
                <option className="mb-3" value="TBD">
                  TBD
                </option>
                <optgroup label="----"></optgroup>
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

          {/* Scores */}
          <div className="flex flex-row gap-3 self-center ">
            <select
              className=" w-16 cursor-pointer rounded	 border-2 bg-[#00838f] text-lg text-white"
              {...register(`scoredA`)}
            >
              <option value={game.scoredA!}>{game.scoredA}</option>
              <option className="mb-3" value="TBD">
                TBD
              </option>
              <optgroup label="----"></optgroup>
              {getOptions()}
            </select>
            <p className="self-center">-</p>
            <select
              className=" w-16 cursor-pointer rounded	 border-2 bg-[#00838f] text-lg text-white"
              {...register(`scoredB`)}
            >
              <option value={game.scoredB!}>{game.scoredB}</option>
              <option className="mb-3" value="TBD">
                TBD
              </option>
              <optgroup label="----"></optgroup>
              {getOptions()}
            </select>
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
                {(!game.teamB || game.teamB.length === 0) && (
                  <option className="mb-3" value="">
                    Select
                  </option>
                )}
                {(game.teamB || game.teamB.length !== 0) && (
                  <>
                    <option className="mb-3" value={game.teamB}>
                      {game.teamB}
                    </option>
                    <option className="mb-3" value="">
                      Select
                    </option>
                  </>
                )}
                <option className="mb-3" value="TBD">
                  TBD
                </option>
                <optgroup label="----"></optgroup>
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
              {(!game.time || game.time.length === 0) && (
                <option className="mb-3" value="">
                  Select
                </option>
              )}
              {(game.time || game.time.length !== 0) && (
                <>
                  <option className="mb-3" value={game.time}>
                    {game.time}
                  </option>
                  <option className="mb-3" value="">
                    Select
                  </option>
                </>
              )}
              <option className="mb-3" value="TBD">
                TBD
              </option>
              <optgroup label="----"></optgroup>
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

export default EditPlayoffGameForm
