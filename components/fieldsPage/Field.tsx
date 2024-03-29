import React from 'react'
import { FieldsList } from '../../typings'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  field: FieldsList
}

/**
 * Creates a container for the field address and all the field numbers for that address
 * @param field
 * @returns container for field address and all the field numbers for that address
 */
function Field({ field }: Props) {
  return (
    <div className=" grid w-full  grid-cols-1	justify-items-stretch">
      <div
        className={`grid grid-cols-1 border-2 border-[#00838f] bg-[#eceff1] p-2 font-semibold lg:justify-items-center`}
      >
        <div
          className={`flex flex-row items-center gap-5 text-[#00838f]  md:gap-10`}
        >
          <p className=" text-black ">Fields:</p>
          {field?.fieldNumbers.map((number, index) => (
            <p key={uuidv4()}>{number}</p>
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
