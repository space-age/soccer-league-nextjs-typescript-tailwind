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

{
  /* <div className="m-auto my-6 flex w-[50%] flex-row rounded-md  border-2 border-[#00838f]  text-black shadow-lg ">
<div className=" grid w-full grid-cols-1  justify-items-stretch	">
  <div className="grid  grid-cols-1  justify-center justify-items-center border-b-2 border-[#00838f] bg-[#eceff1] p-2 font-semibold">
    <div className="flex flex-row items-center gap-10 text-xl text-[#00838f]">
      <p className=" text-black ">Fields:</p>
      <p>1</p>
      <p className="text-black">/</p>
      <p>2</p>
      <p className="text-black">/</p>
      <p>3</p>
      <p className="text-black">/</p>
      <p>4</p>
    </div>
    <div className="flex flex-row  py-2">
      <p className="text-xl ">Address: </p>
      <a
        target="_blank"
        href="https://www.google.com/maps/place/Heritage+Lakes+Sports+Park,+Menifee,+CA+92585/@33.7257777,-117.1455514,20z/data=!4m2!3m1!1s0x80db61535c67ef77:0x819af9fe4cf87de9"
        className=" px-2 text-xl text-[#00838f] hover:text-[#d32f2f]"
      >
        29201 Heritage Lake Dr Menifee Ca 92585
      </a>
    </div>
  </div>
  <div className="h-[10vh] "></div>
</div>
</div> */
}
