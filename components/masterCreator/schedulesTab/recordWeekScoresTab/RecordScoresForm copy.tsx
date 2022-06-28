import { ScoreRounded } from '@mui/icons-material'
import {
  arrayRemove,
  arrayUnion,
  deleteField,
  doc,
  DocumentData,
  FieldValue,
  updateDoc,
} from 'firebase/firestore'
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

function RecordScoresForm({ list, handleEditClick }: Props) {
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
    const teamA = list.teamA
    const teamB = list.teamB

    // Setting up whether team A won or lost or draw
    let finalScoreA = 'D'
    if (data.scoredA! > data.scoredB!) finalScoreA = 'W'
    if (data.scoredA! < data.scoredB!) finalScoreA = 'L'
    // Setting up whether team B won or lost or draw
    let finalScoreB = 'D'
    if (data.scoredA! < data.scoredB!) finalScoreB = 'W'
    if (data.scoredA! > data.scoredB!) finalScoreB = 'L'

    // This is for making additions to TEAM ACCORDING TO THE FINAL RESULT ENTERED
    teamList.map(async (team, index) => {
      if (team.name === teamA) {
        if (!team.gamesPlayed) {
          const listRef = doc(
            db,
            'Seasons',
            seasonsData!,
            'Divisions',
            divisionData!,
            'Teams',
            team.idName!
          )
          await updateDoc(listRef, {
            gamesPlayed: arrayUnion({
              goalsAgainst: +data.scoredB!,
              goalsScored: +data.scoredA!,
              result: finalScoreA,
              teamAgainst: teamB,
              weekName: list.idName,
            }),
          })
        } else {
          team.gamesPlayed.map(
            async (
              game: {
                weekName: string
                goalsAgainst: number
                goaslScored: number
                result: string
                teamAgainst: string
              },
              teamAIndex: number
            ) => {
              if (game.weekName === list.idName) {
                const listRef = doc(
                  db,
                  'Seasons',
                  seasonsData!,
                  'Divisions',
                  divisionData!,
                  'Teams',
                  team.idName!
                )
                // taking care of the removing and iserting new edit data for week schedule
                const tempTeamList = team.gamesPlayed // temp of team list to modify
                tempTeamList.splice(teamAIndex, 1) // remove the object found that matches the week we editing
                const tempNewTeamGamePlayed = {
                  goalsAgainst: +data.scoredB!,
                  goalsScored: +data.scoredA!,
                  result: finalScoreA,
                  teamAgainst: teamB,
                  weekName: list.idName,
                }
                tempTeamList.splice(teamAIndex, 0, tempNewTeamGamePlayed)
                // Remove gamesPlayed array field from the document
                await updateDoc(listRef, {
                  gamesPlayed: deleteField(),
                })
                await updateDoc(listRef, {
                  gamesPlayed: tempTeamList,
                })
              } else if (teamAIndex === team.gamesPlayed.length - 1) {
                console.log('hello inside ')
                const listRef = doc(
                  db,
                  'Seasons',
                  seasonsData!,
                  'Divisions',
                  divisionData!,
                  'Teams',
                  team.idName!
                )
                await updateDoc(listRef, {
                  gamesPlayed: arrayUnion({
                    goalsAgainst: +data.scoredB!,
                    goalsScored: +data.scoredA!,
                    result: finalScoreA,
                    teamAgainst: teamB,
                    weekName: list.idName,
                  }),
                })
              }
            }
          )
        }
      }
      // For Team B
      if (team.name === teamB) {
        if (!team.gamesPlayed) {
          const listRef = doc(
            db,
            'Seasons',
            seasonsData!,
            'Divisions',
            divisionData!,
            'Teams',
            team.idName!
          )
          await updateDoc(listRef, {
            gamesPlayed: arrayUnion({
              goalsAgainst: +data.scoredA!,
              goalsScored: +data.scoredB!,
              result: finalScoreB,
              teamAgainst: teamA,
              weekName: list.idName,
            }),
          })
        } else {
          team.gamesPlayed.map(
            async (
              game: {
                weekName: string
                goalsAgainst: number
                goaslScored: number
                result: string
                teamAgainst: string
              },
              teamBIndex: number
            ) => {
              if (game.weekName === list.idName) {
                const listRef = doc(
                  db,
                  'Seasons',
                  seasonsData!,
                  'Divisions',
                  divisionData!,
                  'Teams',
                  team.idName!
                )
                // taking care of the removing and iserting new edit data for week schedule
                const tempTeamList = team.gamesPlayed // temp of team list to modify
                tempTeamList.splice(teamBIndex, 1) // remove the object found that matches the week we editing
                const tempNewTeamGamePlayed = {
                  goalsAgainst: +data.scoredA!,
                  goalsScored: +data.scoredB!,
                  result: finalScoreB,
                  teamAgainst: teamA,
                  weekName: list.idName,
                }
                tempTeamList.splice(teamBIndex, 0, tempNewTeamGamePlayed)
                // Remove gamesPlayed array field from the document
                await updateDoc(listRef, {
                  gamesPlayed: deleteField(),
                })
                await updateDoc(listRef, {
                  gamesPlayed: tempTeamList,
                })
              } else if (teamBIndex === team.gamesPlayed.length - 1) {
                const listRef = doc(
                  db,
                  'Seasons',
                  seasonsData!,
                  'Divisions',
                  divisionData!,
                  'Teams',
                  team.idName!
                )
                await updateDoc(listRef, {
                  gamesPlayed: arrayUnion({
                    goalsAgainst: +data.scoredA!,
                    goalsScored: +data.scoredB!,
                    result: finalScoreB,
                    teamAgainst: teamA,
                    weekName: list.idName,
                  }),
                })
              }
            }
          )
        }
      }
    })

    const listRef = doc(
      db,
      'Seasons',
      seasonsData!,
      'Divisions',
      divisionData!,
      'Weeks-Schedules',
      weekScheduleData.idName,
      'Schedules',
      list.idName!
    )
    await updateDoc(listRef, {
      scoredA: +data.scoredA!,
      scoredB: +data.scoredB!,
    })

    handleEditClick()
  }

  const getOptions = () => {
    const MAX_GOALS = 25
    let content = []
    for (var i = 0; i <= MAX_GOALS; i++) {
      content.push(<option value={i}>{i}</option>)
    }
    return content
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="my-4 grid w-full grid-cols-7  justify-items-center overflow-auto rounded-lg border-2 border-[#00838f] bg-[#cfd8dc] px-2  py-3 text-xl font-semibold shadow-lg">
          {/* Field Selection */}
          <p className="text-[#00acc1]">Field: {list.fieldNumber}</p>

          {/* Team A selection */}
          <div className="col-start-2 col-end-4 px-3">
            <p className="overflow-hidden text-clip">{list.teamA}</p>
          </div>

          {/* Scores */}
          <div className="flex flex-row gap-3 self-center ">
            <select
              className=" w-16 cursor-pointer rounded	 border-2 bg-[#00838f] text-lg text-white"
              {...register(`scoredA`, {
                required: true,
              })}
            >
              <option value={list.scoredA}>{list.scoredA}</option>
              <optgroup label="----"></optgroup>
              {getOptions()}
            </select>
            <p className="self-center">-</p>
            <select
              className=" w-16 cursor-pointer rounded	 border-2 bg-[#00838f] text-lg text-white"
              {...register(`scoredB`, {
                required: true,
              })}
            >
              <option value={list.scoredB}>{list.scoredB}</option>
              <optgroup label="----"></optgroup>
              {getOptions()}
            </select>
          </div>

          {/* Team B selection */}
          <div className="col-start-5 col-end-7 px-3">
            <p className="overflow-hidden text-ellipsis">{list.teamB}</p>
          </div>

          {/* Time selection */}
          <p className="text-[#00acc1]">Time: {list.time}</p>
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
            Submit Scores
          </button>
        </div>
      </div>
    </form>
  )
}

export default RecordScoresForm
