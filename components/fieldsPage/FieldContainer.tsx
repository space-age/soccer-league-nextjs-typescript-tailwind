import Field from './Field'

function FieldContainer() {
  const fields = [
    {
      id: 1,
      fields: [1, 2, 3, 4],
      address: '29201 Heritage Lake Dr, Menifee, Ca 92585',
    },
    {
      id: 2,
      fields: [5, 6, 7],
      address: '27227 Heritage Lake Dr, Menifee, CA 92585',
    },
    {
      id: 3,
      fields: [8, 9],
      address: '27327 Junipero Rd, Menifee, CA 92585',
    },
    {
      id: 4,
      fields: [10],
      address:
        'Discovery Park, Valley-Wide Recreation and Park District, Menifee, CA 92585',
    },
    {
      id: 5,
      fields: [11],
      address: 'Simpson Rd & Lindenberger Road, Menifee, CA 92585',
    },
    {
      id: 6,
      fields: [12, 13],
      address: '32665 Haddock St, Winchester, CA 92596',
    },
  ]

  return (
    <div className="m-6  grid grid-cols-1 gap-4 text-lg md:grid-cols-2 md:gap-10 lg:text-xl">
      {fields.map((field) => (
        <Field field={field} key={field.id} />
      ))}
    </div>
  )
}

export default FieldContainer
