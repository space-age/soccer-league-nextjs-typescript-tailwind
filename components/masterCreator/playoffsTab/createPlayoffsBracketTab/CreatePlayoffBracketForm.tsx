import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  selectedDivision,
  selectedPlayoffBracket,
  selectedSeason,
} from '../../../../atoms/seasonAtoms'
import { db } from '../../../../firebase'
import { v4 as uuidv4 } from 'uuid'
import {
  showCreateRoundForm,
  inputsDisablePlayoffs,
} from '../../../../atoms/playoffsAtoms'

interface WeekSchedule {
  bracketName: string
  date: string
}

function CreatePlayoffBracketForm() {
  const [disableInput, setDisableInput] = useRecoilState(inputsDisablePlayoffs)

  const [showCreateRoundsForm, setShowCreateRoundsForm] =
    useRecoilState(showCreateRoundForm)

  const [playoffBracket, setPlayoffBracket] = useRecoilState(
    selectedPlayoffBracket
  )

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

  const defaultGame = {
    time: '',
    fieldNumber: null,
    teamA: '',
    teamB: '',
    scoredA: null,
    scoredB: null,
    pushed: false,
  }

  const onSubmit: SubmitHandler<WeekSchedule> = async (data: WeekSchedule) => {
    const playoffsUUID = uuidv4()
    const dataBracketName = data.bracketName.toUpperCase().trim()

    await setDoc(
      doc(
        db,
        'Seasons',
        season!,
        'Divisions',
        division!,
        'Playoffs-Brackets',
        playoffsUUID
      ),
      { date: data.date, bracketName: dataBracketName, pushed: false }
    )
    const tempSchedule = {
      idName: playoffsUUID,
      date: data.date,
      bracketName: dataBracketName,
      pushed: false,
    }

    setPlayoffBracket(tempSchedule)
    setDisableInput(true)

    await setDoc(
      doc(
        db,
        'Seasons',
        season!,
        'Divisions',
        division!,
        'Playoffs-Brackets',
        playoffsUUID,
        'Stages',
        'QuarterFinals'
      ),
      {
        match1Game1: defaultGame,
        match1Game2: defaultGame,
        match2Game1: defaultGame,
        match2Game2: defaultGame,
        match3Game1: defaultGame,
        match3Game2: defaultGame,
        match4Game1: defaultGame,
        match4Game2: defaultGame,
      }
    )
    await setDoc(
      doc(
        db,
        'Seasons',
        season!,
        'Divisions',
        division!,
        'Playoffs-Brackets',
        playoffsUUID,
        'Stages',
        'SemiFinals'
      ),
      {
        match1Game1: defaultGame,
        match1Game2: defaultGame,
        match2Game1: defaultGame,
        match2Game2: defaultGame,
      }
    )
    await setDoc(
      doc(
        db,
        'Seasons',
        season!,
        'Divisions',
        division!,
        'Playoffs-Brackets',
        playoffsUUID,
        'Stages',
        'Finals'
      ),
      {
        final: defaultGame,
      }
    )

    setShowCreateRoundsForm(true)
  }

  return (
    <div className="mt-5 border-t-[1px] border-black">
      <h2 className="mt-3 text-2xl font-bold text-[#006064]">
        Add a Playoff Bracket
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid-row mt-5 grid gap-3 text-lg"
      >
        <div className="flex">
          <label className=" font-semibold">
            Playoff-Bracket-Name:
            <input
              disabled={disableInput}
              placeholder="Bracket Name"
              className={` ml-2 rounded-md border border-slate-300 px-1 placeholder-slate-400 shadow-sm `}
              {...register(`bracketName`, {
                required: true,
                minLength: 5,
                maxLength: 20,
              })}
              type="text"
            />
            {errors.bracketName && (
              <p className=" text-[13px] font-light  text-orange-500">
                Playoff Bracket Name must contain between 5 and 30 characters.
              </p>
            )}
          </label>
        </div>
        <label className=" font-semibold">
          Enter Date Playoffs Begin:
          <input
            disabled={disableInput}
            type="date"
            min=""
            className="ml-1 px-1 tracking-wider placeholder:tracking-wider"
            {...register('date', { required: true })}
          />
        </label>
        {errors.date && (
          <p className="text-[13px] font-light text-orange-500">
            Must enter a date.
          </p>
        )}
        <button
          disabled={disableInput ? true : false}
          type="submit"
          className={`${
            disableInput && 'opacity-50'
          } mt-4 w-[18%] content-start justify-self-start rounded bg-[#00838f] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#006064]`}
        >
          Add Playoffs Bracket
        </button>
      </form>
    </div>
  )
}

export default CreatePlayoffBracketForm
