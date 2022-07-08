import { doc, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'
import { db } from '../../../firebase'
import useAssignments from '../../../hooks/useAssignments'
import useGameCancel from '../../../hooks/useGameCancel'
import { GameCancel } from '../../../typings'

function CancelGamesForm() {
  const cancelGameData = useGameCancel()
  const [newData, setNewData] = useState(false)
  const [newDataEntered, setNewDataEntered] = useState({
    date: '',
    active: false,
    view: false,
  })

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<GameCancel>({ shouldUnregister: true })

  const onSubmit: SubmitHandler<GameCancel> = async (data) => {
    console.log(data)
    const dataActive = data.active === 'true' ? true : false
    const listRef = doc(db, 'More', 'Game Cancel')
    await updateDoc(listRef, {
      active: dataActive,
      date: data.date,
    })
    setNewDataEntered({ active: dataActive, date: data.date, view: true })
    setNewData(true)
    reset()
  }

  return (
    <div>
      <h2 className="masterCreator--tabTitle p-2">
        Complete the form to create an announcement to the main page that games
        will be cancel for the selected date.
      </h2>
      <form className="my-5 ml-3 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        {' '}
        <label className=" text-xl font-semibold">
          Enter week date:
          <input
            type="date"
            min=""
            className="ml-1 px-1 tracking-wider placeholder:tracking-wider"
            {...register('date', { required: true })}
          />
        </label>
        {errors.date && (
          <p className="text-[13px] font-light text-orange-500">
            Must enter a week date.
          </p>
        )}
        <label className=" text-xl font-semibold">
          Select this option if you <span className="text-red-500">DO</span>{' '}
          want to make the announcement to the main page:
          <input
            type="radio"
            className="ml-1 px-1 tracking-wider placeholder:tracking-wider"
            {...register('active', { required: true })}
            value={'true'}
          />
        </label>
        {errors.active && (
          <p className="text-[13px] font-light text-orange-500">
            Must make a selection
          </p>
        )}
        <label className=" text-xl font-semibold">
          Select this option if you <span className="text-red-500">DO NOT</span>{' '}
          want to make the announcement to main page:
          <input
            type="radio"
            className="ml-1 px-1 tracking-wider placeholder:tracking-wider"
            {...register('active', { required: true })}
            value={'false'}
          />
        </label>
        {errors.active && (
          <p className="text-[13px] font-light text-orange-500">
            Must make a selection
          </p>
        )}
        <button
          type="submit"
          className=" w-[18%] content-start justify-self-start rounded bg-[#00838f] p-2 text-lg font-bold tracking-wider  text-white hover:bg-[#006064]"
        >
          Make Announcement
        </button>
      </form>
      {!newData && (
        <div className="mx-4 border-t-2 border-black">
          <div className="mt-5">
            <h2 className="masterCreator--tabTitle p-2 text-3xl underline underline-offset-1">
              Current Status:
            </h2>
            <p className="p-2 text-2xl font-semibold">
              Current date:{' '}
              <span className="font-bold text-[#006064]">
                {cancelGameData?.date}
              </span>
            </p>
            <p className="p-2 text-2xl font-semibold">
              Active:{' '}
              <span className="font-bold text-[#006064]">
                {cancelGameData?.active ? 'True' : 'False'}
              </span>
            </p>
          </div>
        </div>
      )}
      {newData && (
        <div className="mx-4 border-t-2 border-black">
          <div className="mt-5">
            <h2 className="masterCreator--tabTitle p-2 text-3xl underline underline-offset-1">
              New Status has been submitted
            </h2>
            <p className="p-2 text-2xl font-semibold">
              Current date:{' '}
              <span className="font-bold text-[#006064]">
                {newDataEntered?.date}
              </span>
            </p>
            <p className="p-2 text-2xl font-semibold">
              Active:{' '}
              <span className="font-bold text-[#006064]">
                {newDataEntered?.active ? 'True' : 'False'}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default CancelGamesForm
