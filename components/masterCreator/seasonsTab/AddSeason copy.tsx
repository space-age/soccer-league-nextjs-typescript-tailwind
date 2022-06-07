import { valueToPercent } from '@mui/base'
import { ChangeEvent, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface Inputs {
  seasonName: string
  divisionsName: string[]
}

function AddSeason() {
  const MAX_NUMBER_DIVISIONS = 2

  const [divisions, setDivisions] = useState([0])
  const [counter, setCounter] = useState(1)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const handleAddButton = (e: any) => {
    e.preventDefault()
    setDivisions((prevDivisions) => [...prevDivisions, counter])
    setCounter((prevCounter) => prevCounter + 1)
  }

  const handleRemoveButton = (e: any, index: number) => () => {
    e.preventDefault()
    console.log('hello removal')
    setDivisions((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ])

    setCounter((prevCounter) => prevCounter - 1)
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
            // name="seasonName"
            // ref={register}
            {...register('seasonName', { required: true })}
          />
        </label>

        {divisions.map((index) => {
          // const fieldName = `divisions[${index}]`
          return (
            <div key={index} className="flex gap-2 tracking-wider">
              <div>
                <label className="font-semibold">
                  Division name:
                  <input
                    // value={division.name}
                    placeholder={`Division ${index + 1}`}
                    className="ml-2 px-1 tracking-wider placeholder:tracking-wider"
                    // onChange={(e) => handleInputChange(e, index)}
                    maxLength={30}
                    type="text"
                    // name={`divisions[${index}].${index}`}
                    // ref={register}
                    {...register('Seaso', { required: true })}
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
