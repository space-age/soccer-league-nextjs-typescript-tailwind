/*
  Fully functional component.
  This component allows user to manually enter a division name

  Needs work to validate if division and season names are already in the DB,
  so it does not overwrite
*/

import { valueToPercent } from '@mui/base'
import { setDoc, doc } from 'firebase/firestore'
import { ChangeEvent, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { modalState, submissionData } from '../../../atoms/modalAtoms'
import { db } from '../../../firebase'
import { AddedSeason } from '../../../typings'

// interface Inputs {
//   seasonName: string
//   divisionsName: { name: string }[]
// }

function AddSeasonManualInput() {
  const [divisions, setDivisions] = useState([{ name: '' }])

  const MAX_NUMBER_DIVISIONS = 2

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddedSeason>({ shouldUnregister: true })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target
    const list = [...divisions]
    list[index].name = value
    setDivisions(list)
  }

  const handleRemoveButton = (e: any, index: number) => {
    e.preventDefault()
    const list = [...divisions]
    list.splice(index, 1)
    setDivisions(list)
    unregister(`divisionsName.${index}.name`)
  }

  const handleAddButton = (e: any) => {
    e.preventDefault()
    const list = [...divisions, { name: '' }]
    setDivisions(list)
  }

  const [finalData, setFinalData] = useRecoilState(submissionData)
  const [showModal, setShowModal] = useRecoilState(modalState)

  const onSubmit: SubmitHandler<AddedSeason> = async (data: AddedSeason) => {
    data.divisionsName.map(async (division) => {
      await setDoc(
        doc(
          db,
          'Seasons',
          data.seasonName.toUpperCase(),
          'Divisions',
          division.name.toUpperCase()
        ),
        {}
      )
    })

    setFinalData(data)
    setShowModal(true)
    setDivisions([{ name: '' }])
    reset({ seasonName: '', divisionsName: [{ name: '' }] })
  }

  return (
    <div className="rounded border-2 border-white bg-[#eceff1] p-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid-row mt-1 grid gap-3 text-lg"
      >
        <label className=" font-semibold">
          Season name:
          <input
            type="text"
            // name="seasonName"
            placeholder="Season Name"
            // value={enteredSeasonName}
            // onChange={(e) => setEnteredSeasonName(e.target.value)}
            className="ml-[1.4rem] px-1 tracking-wider placeholder:tracking-wider"
            maxLength={30}
            {...register('seasonName', { required: true })}
          />
        </label>
        {divisions.map((division, index) => {
          return (
            <div key={index} className="flex gap-2 tracking-wider">
              <div>
                <label className="font-semibold">
                  Division name:
                  <input
                    placeholder={`Division ${index + 1}`}
                    className="ml-2 px-1 tracking-wider placeholder:tracking-wider"
                    maxLength={30}
                    {...register(`divisionsName.${index}.name`, {
                      onChange: (e) => handleInputChange(e, index),
                      required: true,
                      value: division.name,
                    })}
                    type="text"
                    onChange={(e) => handleInputChange(e, index)}
                    value={division.name}
                  />
                </label>
              </div>
              <div>
                {divisions.length !== 1 && (
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
        {divisions.length < MAX_NUMBER_DIVISIONS && (
          <button
            onClick={handleAddButton}
            className="ml-28 w-[15%] content-start justify-self-start rounded bg-[#00838f] px-1 text-base font-semibold  tracking-wider text-white hover:bg-[#006064]"
          >
            Add Division
          </button>
        )}
        <p className="text-sm">
          *** Max number of divisions allowed per season:{' '}
          <span className="text-lg font-bold text-[#b71c1c]">
            {MAX_NUMBER_DIVISIONS}
          </span>
        </p>
        <button
          type="submit"
          className="mt-2 w-[30%] justify-self-center rounded bg-[#00838f] px-1 font-bold tracking-wider text-white hover:bg-[#006064]"
        >
          Add Season
        </button>
      </form>
    </div>
  )
}

export default AddSeasonManualInput
