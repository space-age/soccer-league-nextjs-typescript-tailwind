import React from 'react'
import useSchedulesList from '../../../../hooks/useSchedulesList'

function CurrentScheduleList() {
  const scheduleList = useSchedulesList()

  // const [listField1, setlistField1] = useState([{ field1: { team: [] } }])
  // // const listField1 = []
  // const listField2 = []
  // const listField3 = []
  // // const listField3 = []

  // const groupListsByField = () => {
  //   scheduleList.map((schedule, index) => {
  //     if (schedule.fieldNumber === '1') {
  //       // setlistField1([...listField1, schedule])
  //       listField1.push(schedule)
  //       return
  //     }
  //     if (schedule.fieldNumber === '2') {
  //       listField2.push(schedule)
  //       return
  //     }
  //     if (schedule.fieldNumber === '3') {
  //       listField3.push(schedule)
  //       return
  //     }
  //   })

  //   listField1.length > 0 && sortByTime(listField1)
  //   listField2.length > 0 && sortByTime(listField2)
  //   listField3.length > 0 && sortByTime(listField3)

  //   console.log(listField1)
  //   console.log(listField2)
  //   console.log(listField3)
  // }

  // const sortByTime = (list) => {
  //   // listField1.sort()
  //   list.sort((a, b) => (a.time > b.time ? 1 : -1))
  //   const temp = list[list.length - 1]
  //   list.pop()
  //   list.splice(0, 0, temp)
  // }

  return (
    <>
      {scheduleList.map((list, index) => {
        return (
          <div
            key={index}
            className="my-4 grid w-full  grid-cols-7 justify-items-center overflow-auto rounded-lg border-2 border-[#00838f] bg-[#cfd8dc]  px-2 py-3 font-semibold shadow-lg"
          >
            <p className="text-[#00acc1]">Field: {list.fieldNumber}</p>
            <div className="col-start-2 col-end-4 px-3">
              <p className="overflow-hidden text-clip">{list.teamA}</p>
            </div>
            <div className="flex flex-row gap-3 self-center ">
              <p className="self-center text-[#00acc1]">
                {list.scoredA === null ? 'TBD' : list.scoredA}
              </p>
              <p className="self-center">vs.</p>
              <p className="self-center text-[#00acc1]">
                {' '}
                {list.scoredB === null ? 'TBD' : list.scoredB}
              </p>
            </div>
            <div className="col-start-5 col-end-7 px-3">
              <p className="overflow-hidden text-ellipsis">{list.teamB}</p>
            </div>
            <p className="text-[#00acc1]">Time: {list.time}</p>
          </div>
        )
      })}
    </>
  )
}

export default CurrentScheduleList
