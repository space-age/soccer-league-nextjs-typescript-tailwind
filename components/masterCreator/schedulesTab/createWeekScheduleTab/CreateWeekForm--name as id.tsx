/*
  This is a functional component. Adds a schedule to firebase as a document and the Id will be the schedule name
  Also, checks if schedule name is found in the firebase and lets the user know to enter something different,
  so no overwrites occur.
  
  Not using it, but keeping it incase we want to change it so the id is the name
*/

import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ChangeEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedScheduleWeek,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import {
  inputsDisable,
  showAddScheduleForm,
} from '../../../../atoms/weekScheduleAtoms'
import { db } from '../../../../firebase'
import useScheduleList from '../../../../hooks/useWeeksSchedulesList'

interface WeekSchedule {
  weekName: string
  date: string
}

function CreateWeekForm() {
  const scheduleList = useScheduleList()
  const MIN_LENGTH_INPUT = 5
  const MAX_LENGTH_INPUT = 30

  const [inputWeekName, setInputWeekName] = useState('')
  const [checkWeekName, setCheckWeekName] = useState(false)

  const [disableInput, setDisableInput] = useRecoilState(inputsDisable)

  const [showAddSchedulesForm, setShowAddSchedulesForm] =
    useRecoilState(showAddScheduleForm)

  const [weekSchedule, setWeekSchedule] = useRecoilState(selectedScheduleWeek)

  const season = useRecoilValue(selectedSeason)
  const division = useRecoilValue(selectedDivision)

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<WeekSchedule>({ shouldUnregister: true })

  const onSubmit: SubmitHandler<WeekSchedule> = async (data: WeekSchedule) => {
    await setDoc(
      doc(
        db,
        'Seasons',
        season!,
        'Divisions',
        division!,
        'Weeks-Schedules',
        data.weekName.toUpperCase().trim()
      ),
      { date: data.date, weekNumber: scheduleList.length + 1 }
    )
    // setWeekSchedule(data.weekName.toUpperCase().trim()) //coming it out but will be needed, and changed selectedScheduleWeek atom back to empty string instead of an object
    setCheckWeekName(false) //resets to false for new form
    setShowAddSchedulesForm(true)
    setDisableInput(true)
  }

  /*
    Function will take care of input change.
    Gets a document snap from firebase, with the path to check if team name is found
    If it does exist, then will set the object variable teamExist to true.
    This will cause the app to render a warning that input is already in the DB
    So no overwrites occur
  */
  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value.length <= MIN_LENGTH_INPUT - 1) {
      setCheckWeekName(false)
      return
    }

    const temp = value.toUpperCase().trim() //had to set to z or else cant getDoc because will be empty string
    const docSnap = await getDoc(
      doc(
        db,
        'Seasons',
        season!,
        'Divisions',
        division!,
        'Weeks-Schedules',
        temp
      )
    )
    if (docSnap.exists()) {
      setCheckWeekName(true)
    } else {
      setCheckWeekName(false)
    }
  }

  return (
    <div className="mt-5 border-t-[1px] border-black">
      <h2 className="mt-3 text-2xl font-bold text-[#006064]">
        Add a week schedule
      </h2>
      <h3 className=" font-bold text-[red]">
        Season is currently in Week {scheduleList.length}, so will add the
        following season as Week {scheduleList.length + 1}.
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid-row mt-5 grid gap-3 text-lg"
      >
        <div className="flex">
          <label className=" font-semibold">
            {/* Schedule-Week-{scheduleList.length + 1} */}
            Schedule-Week-Name
            <input
              disabled={disableInput}
              placeholder="Week Name"
              className={`${
                checkWeekName === true &&
                'border-[red] outline-none ring-1 ring-[red]'
              } ml-2 rounded-md border border-slate-300 px-1 placeholder-slate-400 shadow-sm `}
              minLength={MIN_LENGTH_INPUT}
              maxLength={MAX_LENGTH_INPUT}
              {...register(`weekName`, {
                onChange: (e) => handleInputChange(e),
                required: true,
                value: inputWeekName,
              })}
              type="text"
              onChange={(e) => handleInputChange(e)}
              // value={inputWeekName}
            />
          </label>
          {checkWeekName === true && (
            <p className="ml-3 text-sm text-[red]">
              *** Week name already exists, please enter a different name
            </p>
          )}
        </div>
        <label className=" font-semibold">
          {' '}
          Enter week date:
          <input
            disabled={disableInput}
            type="date"
            min=""
            className="ml-1 px-1 tracking-wider placeholder:tracking-wider"
            {...register('date', { required: true })}
          />
        </label>
        <button
          disabled={
            (checkWeekName ? true : false) || disableInput ? true : false
          }
          type="submit"
          className={`${
            (checkWeekName || disableInput) && 'opacity-50 '
          } mt-4 w-[18%] content-start justify-self-start rounded bg-[#00838f] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#006064]`}
        >
          Add week schedule
        </button>
      </form>
    </div>
  )
}

export default CreateWeekForm
