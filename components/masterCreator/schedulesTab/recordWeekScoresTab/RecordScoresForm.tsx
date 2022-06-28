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
import useTeamList from '../../../../hooks/useTeamList'
import { ScheduleList, TeamList } from '../../../../typings'
import { v4 as uuidv4 } from 'uuid'

// import useFieldNumberList from '../../../../hooks/useFieldNumberList'
// import useTimesList from '../../../../hooks/useTimesList'

interface Props {
  list: ScheduleList | DocumentData
  handleEditClick: () => void
}

function RecordScoresForm({ list, handleEditClick }: Props) {
  // const fieldsList = useFieldNumberList()
  // const timesList = useTimesList()
  const teamList = useTeamList()

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

  const firebaseInsertData = async (
    team: TeamList | DocumentData,
    teamAorB: string,
    data: ScheduleList
  ) => {
    const againstGoals = teamAorB === 'teamA' ? +data.scoredB! : +data.scoredA!
    const scoredGoals = teamAorB === 'teamA' ? +data.scoredA! : +data.scoredB!
    const teamAgainst = teamAorB === 'teamA' ? list.teamA : list.teamB

    // Setting up whether team won or lost or draw
    let finalScore = 'D'
    if (teamAorB === 'teamA') {
      if (data.scoredA! > data.scoredB!) finalScore = 'W'
      if (data.scoredA! < data.scoredB!) finalScore = 'L'
    }
    if (teamAorB === 'teamB') {
      if (data.scoredA! < data.scoredB!) finalScore = 'W'
      if (data.scoredA! > data.scoredB!) finalScore = 'L'
    }

    // If gamesPlayed array does not exist in firebase field, then created
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
          goalsAgainst: againstGoals,
          goalsScored: scoredGoals,
          result: finalScore,
          teamAgainst: teamAgainst,
          scheduleID: list.idName,
          weekScheduleDate: weekScheduleData.date,
          weekScheduleName: weekScheduleData.weekName,
          weekScheduleID: weekScheduleData.idName,
        }),
      })
    }

    //If gamePlayed array already exists, then make modofications to the array
    if (team.gamesPlayed) {
      team.gamesPlayed.map(
        async (
          game: {
            goalsAgainst: number
            goaslScored: number
            result: string
            teamAgainst: string
            scheduleID: string
            weekScheduleDate: string
            weekScheduleName: string
            weekScheduleID: string
          },
          teamIndex: number
        ) => {
          //If schedule already exists, then will modify the schedule data with the new scores entered
          if (game.scheduleID === list.idName) {
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
            tempTeamList.splice(teamIndex, 1) // remove the object found that matches the week we editing
            //create object with new data we editing
            const tempNewTeamGamePlayed = {
              goalsAgainst: againstGoals,
              goalsScored: scoredGoals,
              result: finalScore,
              teamAgainst: teamAgainst,
              scheduleID: list.idName,
              weekScheduleDate: weekScheduleData.date,
              weekScheduleName: weekScheduleData.weekName,
              weekScheduleID: weekScheduleData.idName,
            }
            tempTeamList.splice(teamIndex, 0, tempNewTeamGamePlayed) //insert new object data in the index where we removed the match object
            // Remove gamesPlayed array field from the document
            await updateDoc(listRef, {
              gamesPlayed: deleteField(),
            })
            // Add the new modify list to the gamesPlayed array
            await updateDoc(listRef, {
              gamesPlayed: tempTeamList,
            })
          }
          // If at the end of the array gamesPlayed and no schedule found with the editing schedule, then add a new gamesPlayed object to the array
          else if (teamIndex === team.gamesPlayed.length - 1) {
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
                goalsAgainst: againstGoals,
                goalsScored: scoredGoals,
                result: finalScore,
                teamAgainst: teamAgainst,
                scheduleID: list.idName,
                weekScheduleDate: weekScheduleData.date,
                weekScheduleName: weekScheduleData.weekName,
                weekScheduleID: weekScheduleData.idName,
              }),
            })
          }
        }
      )
    }
  }

  const onSubmit: SubmitHandler<ScheduleList> = async (data) => {
    const teamA = list.teamA
    const teamB = list.teamB

    // This is for making additions to TEAM ACCORDING TO THE FINAL SCORES ENTERED
    teamList.map(async (team, index) => {
      // For Team A
      if (team.name === teamA) {
        firebaseInsertData(team, 'teamA', data)
      }
      // For Team B
      if (team.name === teamB) {
        firebaseInsertData(team, 'teamB', data)
      }
    })

    //Sets data in firebase for schedule with the new scores submitted
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

    handleEditClick() //removes the edit click button
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
