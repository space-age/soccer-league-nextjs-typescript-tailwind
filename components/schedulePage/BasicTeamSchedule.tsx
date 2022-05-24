import { Schedule } from '../../typings'

interface Props {
  schedule: Schedule
}

function BasicTeamSchedule({ schedule }: Props) {
  return (
    <div className="flex text-red-500 sm:!hidden">
      <h1>hello</h1>
      <h1>hello</h1>
    </div>
  )
}

export default BasicTeamSchedule
