import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useFieldNumberList from '../../../../hooks/useFieldNumberList'
import useTeamList from '../../../../hooks/useTeamList'
import useTimesList from '../../../../hooks/useTimesList'
import { v4 as uuidv4 } from 'uuid'

interface Schedule {
  time: string
  fieldNumber: number
  teamA: string
  teamB: string
}

/**
 * A copy of the component, but it is not used in the application
 */
function AddScheduleForm() {
  const fieldsList = useFieldNumberList()
  const timesList = useTimesList()
  const teamList = useTeamList()

  const [scheduleList, setScheduleList] = useState([
    { time: '', fieldNumber: 0, teamA: '', teamB: '' },
  ])

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Schedule>({ shouldUnregister: true })

  const onSubmit: SubmitHandler<Schedule> = async (data) => {
    console.log(data)
  }

  return (
    <div className="mt-5 border-t-[1px] border-black">
      <h2 className="my-3 text-2xl font-bold text-[#006064]">
        Add Schedules as needed, and submit when finish
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid-row mt-5 grid gap-3 text-lg"
      >
        <div className="grid grid-cols-7 items-center justify-items-center overflow-auto rounded-lg border-2 border-[#00838f] bg-[#cfd8dc]  px-2 text-xl font-semibold shadow-lg ">
          <label>
            Field:
            <select
              className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
              {...register('fieldNumber', {
                required: 'Field Number is required',
              })}
            >
              <option className="mb-3" value="">
                Select
              </option>
              {fieldsList.map(
                (
                  field: { fieldNumbers: number[]; address: string },
                  index: number
                ) => (
                  <optgroup
                    key={uuidv4()}
                    label={field.address}
                    className="text-black"
                  >
                    {field.fieldNumbers.map((number: number) => (
                      <option className="text-white" value={number}>
                        {number}
                      </option>
                    ))}
                  </optgroup>
                )
              )}
            </select>
          </label>

          <div className="col-start-2 col-end-4 px-3">
            <label>
              Team A:
              <select
                className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
                {...register('teamA', {
                  required: 'Team A is required',
                })}
              >
                <option className="mb-3" value="">
                  Select
                </option>
                {teamList.map((team, index) => (
                  <option className="text-white" value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex flex-row gap-3 self-center ">
            <p className="self-center text-[#00acc1]">(Goals)</p>
            <p className="self-center">vs.</p>
            <p className="self-center text-[#00acc1]">(Goals)</p>
          </div>
          <div className="col-start-5 col-end-7 px-3">
            <label>
              Team B:
              <select
                className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
                {...register('teamB', {
                  required: 'Team B is required',
                })}
              >
                <option className="mb-3" value="">
                  Select
                </option>
                {teamList.map((team, index) => (
                  <option className="text-white" value={team.name}>
                    {team.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Time:
            <select
              className=" m-2 cursor-pointer rounded border-2 bg-[#00838f]	p-1 text-lg text-white"
              {...register('time', {
                required: 'Time is required',
              })}
            >
              <option className="mb-3" value="">
                Select
              </option>
              {timesList.map((time: string[], index: number) => (
                <option className="text-white" value={time}>
                  {time}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          className="m-auto w-[25%] content-start rounded bg-[#00838f] px-1 text-base font-semibold  tracking-wider text-white hover:bg-[#006064]"
          // onClick={(e) => handleRemoveButton(e, index)}
        >
          Remove above schedule
        </button>

        <div className="flex justify-center gap-10">
          <button
            // disabled={checkWeekName ? true : false}
            // type="submit"
            className={`mt-4 w-[18%] content-start justify-self-start rounded bg-[#00838f] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#006064]`}
          >
            Add another schedule
          </button>
          <button
            // disabled={checkWeekName ? true : false}
            type="submit"
            className="mt-4 w-[18%] content-start justify-self-start rounded bg-[#b71c1c] p-2 text-lg font-bold  tracking-wider text-white hover:bg-[#f44336]"
          >
            Submit Schedules
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddScheduleForm
