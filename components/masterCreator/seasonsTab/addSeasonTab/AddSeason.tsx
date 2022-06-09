import { setDoc, doc, getDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { modalState, submissionData } from '../../../../atoms/seasonModalAtoms'
import { db } from '../../../../firebase'
import { AddedSeason } from '../../../../typings'
import ShowAddSeasonModal from './ShowAddSeasonModal'

function AddSeason() {
  const Default_Division_Name = 'Division 1'
  const MAX_NUMBER_DIVISIONS = 2

  const [divisions, setDivisions] = useState([
    { name: `${Default_Division_Name}` },
  ])

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddedSeason>()

  const handleRemoveButton = (e: any, index: number) => {
    e.preventDefault()
    const list = [...divisions]
    list.splice(index, 1)
    setDivisions(list)
    unregister(`divisionsName.${index}.name`)
  }

  const handleAddButton = (e: any) => {
    e.preventDefault()
    const list = [...divisions, { name: `Division ${divisions.length + 1}` }]
    setDivisions(list)
  }

  const [finalData, setFinalData] = useRecoilState(submissionData)
  const [showModal, setShowModal] = useRecoilState(modalState)

  const onSubmit: SubmitHandler<AddedSeason> = async (data: AddedSeason) => {
    const newData = {
      seasonName: data.seasonName,
      divisionsName: divisions.map((division, index) => {
        return { name: division.name }
      }),
    }

    const docSnap = await getDoc(
      doc(db, 'Seasons', newData.seasonName.toUpperCase())
    )
    if (docSnap.exists()) {
      alert('Season Name Found, please enter a different Season Name!')
    } else {
      await setDoc(doc(db, 'Seasons', newData!.seasonName.toUpperCase()), {})
      newData.divisionsName.map(async (division) => {
        await setDoc(
          doc(
            db,
            'Seasons',
            newData!.seasonName.toUpperCase(),
            'Divisions',
            division.name.toUpperCase()!
          ),
          {}
        )
      })
      setFinalData(newData)
      setShowModal(true)
    }

    setDivisions([{ name: `${Default_Division_Name}` }])
    reset({
      seasonName: '',
      divisionsName: [{ name: `${Default_Division_Name}` }],
    })
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
            placeholder="Season Name"
            className="ml-[1.4rem] px-1 tracking-wider placeholder:tracking-wider"
            maxLength={30}
            {...register('seasonName', { required: true })}
          />
        </label>
        {errors.seasonName && (
          <p className=" text-[13px] font-light  text-orange-500">
            *** Please enter a season name
          </p>
        )}
        {divisions.map((division, index) => {
          return (
            <div key={index} className="flex gap-2 tracking-wider">
              <div>
                <label className="font-semibold">{division.name}</label>
              </div>
              <div>
                {divisions.length - 1 === index && divisions.length !== 1 && (
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
      {showModal && <ShowAddSeasonModal />}
    </div>
  )
}

export default AddSeason
