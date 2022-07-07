import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  team: {
    counterW: number
    counterPoints: number
    counterD: number
    counterL: number
    counterGoalsScored: number
    counterGoalsAgainst: number
    counterGoalsDifference: number
    gamesPlayed: boolean
    name: string
    counterGames: number
    form: {
      date: string | null
      result: string | null
    }[]
  }
  index: number
}

function TablesRow({ team, index }: Props) {
  // const [isShown, setIsShown] = useState([false, false, false, false, false])

  // const handleMouseOver = (index) => {
  //   const temp = [false, false, false, false, false]
  //   temp.splice(index, 1)
  //   temp.splice(index, 0, true)
  //   setIsShown(temp)
  // }

  // const handleMouseOut = (index) => {
  //   const temp = [false, false, false, false, false]
  //   temp.splice(index, 1)
  //   temp.splice(index, 0, false)
  //   setIsShown(temp)
  // }

  const temp = () => {
    const form = team.form.map((form, index) => (
      <div
        key={uuidv4()}
        className={`mainTable-Form ${
          form.result === 'L'
            ? 'bg-[#f44336]'
            : form.result === 'W'
            ? 'bg-[#4caf50]'
            : 'bg-[#616161] '
        }`}
      >
        {form.result}
      </div>
    ))
    return form
  }

  return (
    <tr>
      <td>{++index}</td>
      <td className="!text-left text-[#263238] lg:!pr-32 lg:!pl-12">
        {team.name}
      </td>
      <td>{!team.gamesPlayed ? 0 : team.counterGames}</td>
      <td>{team.counterW}</td>
      <td>{team.counterD}</td>
      <td>{team.counterL}</td>
      <td>{team.counterGoalsScored}</td>
      <td>{team.counterGoalsAgainst}</td>
      <td>
        {team.counterGoalsDifference > 0
          ? `+${team.counterGoalsDifference}`
          : `${team.counterGoalsDifference}`}
      </td>
      <td className="font-black">{team.counterPoints}</td>
      <td>
        <div className=" flex flex-row justify-center gap-2">{temp()}</div>
        {/* <div className=" relative flex flex-row justify-center gap-2">
          {team.form.map((form, index) => (
            <>
              <div
                key={uuidv4()}
                onMouseEnter={() => handleMouseOver(index)}
                onMouseLeave={() => handleMouseOut(index)}
                className={`mainTable-Form cursor-pointer ${
                  form.result === 'L'
                    ? 'bg-[#f44336]'
                    : form.result === 'W'
                    ? 'bg-[#4caf50]'
                    : 'bg-[#616161] '
                }`}
              >
                {form.result}
              </div>
              {isShown[index] && (
                <div className=" absolute right-12 bottom-9 grid grid-rows-2 rounded border-2 bg-[#e0f7fa] p-2">
                  <div className="flex gap-2 text-lg">
                    <p>Won</p>
                    <p>|</p>
                    <p>2022-07-03</p>
                  </div>
                  <div className="flex gap-2 text-lg">
                    <p>R.Sociedad</p>
                    <div className="flex">
                      <p className="bg-[#006064] px-1 text-white">2</p>
                      <span className="bg-[#f8f9fa] pr-1"></span>
                      <p className="bg-[#006064] px-1 text-white">3</p>
                    </div>
                    <p>R.Sociedad</p>
                  </div>
                  <span className="absolute top-16 right-40 border-r-[18px] border-l-[18px] border-t-[18px] border-solid border-r-transparent border-l-transparent  border-t-[#e0f7fa] "></span>
                </div>
              )}{' '}
            </>
          ))} 
        </div>
          */}
      </td>
    </tr>
  )
}

export default TablesRow
