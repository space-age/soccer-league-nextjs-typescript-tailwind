import Image, { StaticImageData } from 'next/image'

interface Props {
  image: string | StaticImageData
  title: string
}

function TableBanner({ image, title }: Props) {
  return (
    <div
      className="
  flex h-[44vh] w-full flex-col justify-center space-y-2 pb-5 
  md:h-[46vh]
  lg:h-[60vh] lg:space-y-4 lg:pb-16"
    >
      <div
        className="absolute top-0 left-0 -z-10 h-[44vh] w-full  
   md:h-[46vh] lg:h-[60vh]"
      >
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          alt="Soccer Field"
          placeholder="blur"
        />
      </div>
      <h1
        className=" pl-5 text-7xl
      font-semibold 
      capitalize md:text-9xl lg:text-9xl"
      >
        {title}
      </h1>
    </div>
  )
}

export default TableBanner
