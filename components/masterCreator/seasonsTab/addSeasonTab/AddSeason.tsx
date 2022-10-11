import { setDoc, doc, getDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { modalState, submissionData } from '../../../../atoms/seasonModalAtoms'
import { db } from '../../../../firebase'
import { AddedSeason } from '../../../../typings'
import ShowAddSeasonModal from './ShowAddSeasonModal'
import { v4 as uuidv4 } from 'uuid'

/**
 * Container that allows to add a new season with multiple divisions
 * @returns
 */
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

  /**
   * Handler to remove division.
   * Creates a temp list of current divisions list, then removes the 2nd index, and sets the tempList to the divisions state
   * And must unregister the previous division from the form
   * @param e for event
   * @param index
   */
  const handleRemoveButton = (e: any, index: number) => {
    e.preventDefault()
    const tempList = [...divisions]
    tempList.splice(index, 1)
    setDivisions(tempList)
    unregister(`divisionsName.${index}.name`)
  }

  /**
   * Adds a new division and updates teh divisions state
   * @param e
   */
  const handleAddButton = (e: any) => {
    e.preventDefault()
    const list = [...divisions, { name: `Division ${divisions.length + 1}` }]
    setDivisions(list)
  }

  const [finalData, setFinalData] = useRecoilState(submissionData)
  const [showModal, setShowModal] = useRecoilState(modalState)

  /**
   * Form submission handler.
   * Checks if submitted season already exists in database, if it does then send an alert,
   * else create the document with the name of the season and collections under for all divisions entered
   * @param data
   */
  const onSubmit: SubmitHandler<AddedSeason> = async (data: AddedSeason) => {
    // Creates object with the new data submitted by form
    const newData = {
      seasonName: data.seasonName,
      divisionsName: divisions.map((division, index) => {
        return { name: division.name }
      }),
    }
    //Gets the documment from firebase, the name is the new season name
    const docSnap = await getDoc(
      doc(db, 'Seasons', newData.seasonName.toUpperCase())
    )

    // if season name already exists, then alert user
    if (docSnap.exists()) {
      alert('Season Name Found, please enter a different Season Name!')
    }
    // Else, create new document
    else {
      //had to set season name first or else it will not be modifyable in firebase
      await setDoc(
        doc(db, 'Seasons', newData!.seasonName.toUpperCase().trim()),
        {}
      )
      // Loops thru divisions array and creates a collection for each division
      newData.divisionsName.map(async (division) => {
        await setDoc(
          doc(
            db,
            'Seasons',
            newData!.seasonName.toUpperCase().trim(),
            'Divisions',
            division.name.toUpperCase()!
          ),
          {}
        )
      })
      setFinalData(newData) //saves the new data submitted to the state as it will be used for the modal to display its completion
      setShowModal(true) //sets state to true to show modal with message of completion
    }

    //resets the state back to its default state to be ready for next submission
    setDivisions([{ name: `${Default_Division_Name}` }])
    // resets the form
    reset({
      seasonName: '',
      divisionsName: [{ name: `${Default_Division_Name}` }],
    })
  }

  return (
    <div className="rounded border-2 border-white bg-[#eceff1] p-2">
      <h2 className="masterCreator--tabTitle mb-4">
        To add a new season, start with giving a season name, then choose how
        many divisions to include in the season.
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid-row mt-1 grid gap-3 text-lg"
      >
        {/* Label for season name */}
        <label className=" font-semibold">
          Season name:
          <input
            type="text"
            placeholder="Season Name"
            className="ml-1 px-1 tracking-wider placeholder:tracking-wider"
            maxLength={30}
            {...register('seasonName', { required: true })}
          />
        </label>
        {errors.seasonName && (
          <p className=" text-[13px] font-light  text-orange-500">
            *** Please enter a season name
          </p>
        )}

        {/* Loops thru divisions state to either diplay remove button or not */}
        {divisions.map((division, index) => {
          return (
            <div key={uuidv4()} className="flex gap-2 tracking-wider">
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

        {/* Check if max number division allowed has been reached, display add division button if not */}
        {divisions.length < MAX_NUMBER_DIVISIONS && (
          <button
            onClick={handleAddButton}
            className="ml-28 w-[15%] content-start justify-self-start rounded bg-[#00838f] px-1 text-base font-semibold  tracking-wider text-white hover:bg-[#006064]"
          >
            Add Division
          </button>
        )}

        {/* Message displaying how many divisions allowed */}
        <p className="text-sm">
          *** Max number of divisions allowed per season:{' '}
          <span className="text-lg font-bold text-[#b71c1c]">
            {MAX_NUMBER_DIVISIONS}
          </span>
        </p>

        {/* Button to submit form and add season */}
        <button
          type="submit"
          className="mt-2 w-[20%] content-start justify-self-start rounded bg-[#00838f] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#006064]"
        >
          Add Season
        </button>
      </form>

      {/* If state is true, then will display the modal for completion message */}
      {showModal && <ShowAddSeasonModal />}
    </div>
  )
}

export default AddSeason
