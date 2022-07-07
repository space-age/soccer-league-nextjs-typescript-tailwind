import useFieldNumberList from '../../hooks/useFieldNumberList'
import { FieldsList } from '../../typings'
import Field from './Field'
import { v4 as uuidv4 } from 'uuid'

function FieldContainer() {
  const fields = useFieldNumberList()
  return (
    <div className="m-6  grid grid-cols-1 gap-4 text-lg md:grid-cols-2 md:gap-10 lg:text-xl">
      {fields.map((field: FieldsList, index: number) => (
        <Field field={field} key={uuidv4()} />
      ))}
    </div>
  )
}

export default FieldContainer
