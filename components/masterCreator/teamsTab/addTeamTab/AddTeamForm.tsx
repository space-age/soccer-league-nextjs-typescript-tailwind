import { ChangeEvent, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { useRecoilValue } from 'recoil'
import { selectedDivision, selectedSeason } from '../../../../atoms/seasonAtoms'

import { db } from '../../../../firebase'
import { doc, setDoc } from 'firebase/firestore'

import { AddedTeam } from '../../../../typings'

function AddTeamForm() {
  const [teams, setTeams] = useState([{ name: '' }])
  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)

  const defaultTeamData = {
    gamesPlayed: [],
    goalsScored: [],
    goalsAgainst: [],
    teamAgainst: [],
  }

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddedTeam>({ shouldUnregister: true })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target
    const list = [...teams]
    list[index].name = value
    setTeams(list)
  }

  const handleRemoveButton = (e: any, index: number) => {
    e.preventDefault()
    const list = [...teams]
    list.splice(index, 1)
    setTeams(list)
    unregister(`teams.${index}.name`)
  }

  // const checkForDuplicates = (data: AddedTeam) => {
  //   data.map((team) => {
  //     return team
  //   })
  // }

  const handleAddButton = (e: any) => {
    e.preventDefault()
    const list = [...teams, { name: '' }]
    setTeams(list)
  }

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
          team.name.toUpperCase()
        ),
        { ...defaultTeamData, name: team.name.toUpperCase() }
      )
    })
    console.log(data)
    setTeams([{ name: '' }])
    reset({ teams: [{ name: '' }] })
  }

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
                    className="ml-2 px-1 tracking-wider placeholder:tracking-wider"
                    maxLength={30}
                    {...register(`teams.${index}.name`, {
                      onChange: (e) => handleInputChange(e, index),
                      required: true,
                      value: team.name,
                    })}
                    type="text"
                    onChange={(e) => handleInputChange(e, index)}
                    value={team.name}
                  />
                </label>
              </div>
              <div>
                {teams.length !== 1 && (
                  <button
                    className="content-start rounded bg-[#00838f] px-1 text-base font-semibold  tracking-wider text-white hover:bg-[#006064]"
                    onClick={(e) => handleRemoveButton(e, index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          )
        })}
        <button
          onClick={handleAddButton}
          className="ml-28 w-[15%] content-start justify-self-start rounded bg-[#00838f] px-1 text-base font-semibold  tracking-wider text-white hover:bg-[#006064]"
        >
          Add Another Team
        </button>
        <button
          type="submit"
          className="mt-2 w-[30%] justify-self-center rounded bg-[#00838f] px-1 font-bold tracking-wider text-white hover:bg-[#006064]"
        >
          Add Teams
        </button>
      </form>
    </div>
  )
}

export default AddTeamForm
