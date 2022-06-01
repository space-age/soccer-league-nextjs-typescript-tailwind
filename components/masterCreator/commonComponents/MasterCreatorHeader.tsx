import React from 'react'

interface Props {
  title: string
}

function MasterCreatorHeader({ title }: Props) {
  return (
    <div className="m-auto flex	justify-center">
      <p className=" text-center font-['Monaco'] text-7xl font-bold capitalize">
        {title}
      </p>
    </div>
  )
}

export default MasterCreatorHeader
