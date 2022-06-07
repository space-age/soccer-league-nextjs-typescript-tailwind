import React from 'react'
import { Field } from '../../typings'

interface Props {
  field: Field
}

function Field({ field }: Props) {
  // const mainColor = '#00838f'

  return (
    <div className=" grid w-full  grid-cols-1	justify-items-stretch">
      <div
        className={`grid grid-cols-1 border-2 border-[#00838f] bg-[#eceff1] p-2 font-semibold lg:justify-items-center`}
      >
        <div
          className={`flex flex-row items-center gap-5 text-[#00838f]  md:gap-10`}
        >
          <p className=" text-black ">Fields:</p>
          {field.fields.map((fieldNumber, index) => (
            <p key={index}>{fieldNumber}</p>
          ))}
        </div>
        <div className="flex flex-row  py-2">
          <p className=" text-black">Address: </p>
          <a
            target="_blank"
            href={`https://www.google.com/maps/place/${field.address}`}
            className={`px-2 text-[#00838f]  hover:text-[#d32f2f]`}
          >
            {field.address}
          </a>
        </div>
      </div>
      <div
        className={`h-[2vh] border-2 border-t-0 border-[#00838f] bg-[#9ccc65]`}
      ></div>
    </div>
  )
}

export default Field
