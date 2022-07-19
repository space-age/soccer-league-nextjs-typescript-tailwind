import { ChangeEvent, useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useRecoilValue, useResetRecoilState } from 'recoil'
import { selectedDivision, selectedSeason } from '../../../../atoms/seasonAtoms'

import { db } from '../../../../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { AddedTeam } from '../../../../typings'
import { v4 as uuidv4 } from 'uuid'

function AddTeamForm() {
  const [teams, setTeams] = useState([{ name: '', teamExists: false }])
  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)

  const defaultTeamData = {
    gamesPlayed: [
      {
        weekName: '',
        result: '',
        goalsScored: null,
        goalsAgainst: null,
        teamAgainst: '',
      },
    ],
  }

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddedTeam>({ shouldUnregister: true })

  /*
    Function will take care of input change.
    Gets a document snap from firebase, with the path to check if team name is found
    If it does exist, then will set the object variable teamExist to true.
    This will cause the app to render a warning that input is already in the DB
    So no overwrites occur
  */
  const handleInputChange = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault()
    const { value } = e.target
    const list = [...teams]
    list[index].name = value

    const temp =
      !list[index].name || list[index].name.length === 0
        ? 'z'
        : list[index].name.toUpperCase().trim()

    // console.log(temp.length)
    // if (temp.length < 5) {
    //   list[index].teamExists = false
    //   setTeams(list)
    //   return
    // }
    const docSnap = await getDoc(
      doc(db, 'Seasons', season!, 'Divisions', division!, 'Teams', temp)
    )
    if (docSnap.exists()) {
      list[index].teamExists = true
      setTeams(list)
    } else {
      list[index].teamExists = false
      setTeams(list)
    }
  }

  /*
    Handles to remove team from the list, and unresgistering it from the form
  */
  const handleRemoveButton = (e: any, index: number) => {
    e.preventDefault()
    const list = [...teams]
    list.splice(index, 1)
    setTeams(list)
    unregister(`teams.${index}.name`)
  }

  /*
    Handles the button to add a team, and will add a team into array with default values in the object
  */
  const handleAddButton = (e: any) => {
    e.preventDefault()
    const list = [...teams, { name: '', teamExists: false }]
    setTeams(list)
  }

  //Takes care of setting default values for dropdown menu after form submission is entered
  //Might take care of it somewhere else, but for now it is here
  const resetSeasonSelected = useResetRecoilState(selectedSeason)
  const resetDivisionSelected = useResetRecoilState(selectedDivision)

  /*
    Handles sumbission button.
    Will add the document with the team name and the default settings
    then resests all values to their defaults
  */
  const onSubmit: SubmitHandler<AddedTeam> = async (data: AddedTeam) => {
    data.teams.map(async (team) => {
      await setDoc(
        doc(
          db,
          'Seasons',
          season!,
          'Divisions',
          division!,
          'Teams',
          team.name.toUpperCase().trim()
        ),
        // { ...defaultTeamData, name: team.name.toUpperCase().trim() }
        { name: team.name.toUpperCase().trim() }
      )
    })
    // resetDivisionSelected()
    // resetSeasonSelected()
    setTeams([{ name: '', teamExists: false }])
    reset({ teams: [{ name: '' }] })
  }

  /*
    Handles whether add team button is displayed or not
  */
  const [teamsReady, setTeamsReady] = useState(false) //takes care if teams are ready to be submitted, if true, then will display the add teams button
  useEffect(() => {
    for (var i = 0; i < teams.length; i++) {
      if (teams[i].teamExists === true) {
        setTeamsReady(false)
        return
      }
    }
    setTeamsReady(true)
  }, [teams])

  return (
    <div className="mt-5 border-t-[1px] border-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid-row mt-5 grid gap-3 text-lg"
      >
        {teams.map((team, index) => {
          return (
            <div key={index} className="flex gap-2 tracking-wider">
              <div>
                <label className="font-semibold">
                  Team name:
                  <input
                    placeholder={`Team ${index + 1}`}
                    // className={`l-2 px-1 tracking-wider placeholder:tracking-wider focus:border-sky-500 focus:outline-none focus:ring-sky-500`}
                    className={`${
                      team.teamExists === true &&
                      'border-[red] outline-none ring-1 ring-[red]'
                    } ml-2 rounded-md border border-slate-300 px-1 placeholder-slate-400 shadow-sm `}
                    {...register(`teams.${index}.name`, {
                      onChange: (e) => handleInputChange(e, index),
                      required: true,
                      maxLength: 30,
                      // value: team.name,
                    })}
                    type="text"
                    // onChange={(e) => handleInputChange(e, index)}
                    value={team.name}
                  />
                </label>
              </div>

              <div>
                {teams.length > 1 && (
                  <button
                    className="content-start rounded bg-[#00838f] px-1 text-base font-semibold  tracking-wider text-white hover:bg-[#006064]"
                    onClick={(e) => handleRemoveButton(e, index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              {team.teamExists === true && (
                <p className="text-sm text-[red]">
                  *** Team name already exists, please enter a different name
                </p>
              )}
            </div>
          )
        })}
        <button
          onClick={handleAddButton}
          className="ml-28 w-[15%] content-start justify-self-start rounded bg-[#00838f] px-1 text-base font-semibold  tracking-wider text-white hover:bg-[#006064]"
        >
          Add Another Team
        </button>
        {teamsReady && (
          <button
            type="submit"
            className="mt-2 w-[30%] justify-self-center rounded bg-[#00838f] px-1 font-bold tracking-wider text-white hover:bg-[#006064]"
          >
            Add Teams
          </button>
        )}
      </form>
    </div>
  )
}

export default AddTeamForm

// const checkForDuplicates = async (data: AddedTeam) => {
//   const check = []
//   const docSnaps = await data.teams.map(async (team) => {
//     const snap = await getDoc(
//       doc(
//         db,
//         'Seasons',
//         season!,
//         'Divisions',
//         division!,
//         'Teams',
//         team.name.toUpperCase()
//       )
//     )
//     if (snap.exists()) {
//       check.push(true)
//       return true
//     } else {
//       check.push(false)
//       return false
//     }
//   })

//   // const check = docSnaps.map((snap) => {
//   //   snap.exists()
//   // })

//   // console.log('check', check)
//   // const teams = data.teams.map((team) => {
//   //   return team.name
//   // })

//   // const check = new Set(teams).size !== teams.length
//   // console.log(check)
// }
