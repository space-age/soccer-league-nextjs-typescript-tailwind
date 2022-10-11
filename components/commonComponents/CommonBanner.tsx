import Image, { StaticImageData } from 'next/image'

interface Props {
  image: string | StaticImageData //StaticImageData is the type needed for an imported image
  title: string
}

/**
 * A common banner for all pages that displays an image and title for the page
 * @param image {string | StaticImageData}
 * @param title {string}
 * @returns container with image and title
 */
function CommonBanner({ image, title }: Props) {
  return (
    <div
      className="
  flex h-[44vh] w-full flex-col justify-center space-y-2 pb-5 
  md:h-[46vh]
  lg:h-[60vh] lg:space-y-4 lg:pb-16 custombp:h-[100vh] "
    >
      <div
        className="absolute top-0 left-0 -z-10 h-[44vh] w-full  
   md:h-[46vh] lg:h-[60vh] custombp:h-[100vh]"
      >
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          alt="Soccer Field"
          placeholder="blur"
          priority
        />
      </div>
      <h1
        className=" pl-4 text-6xl
      font-semibold 
      capitalize md:text-9xl lg:text-9xl custombp:text-8xl"
      >
        {title}
      </h1>
    </div>
  )
}

export default CommonBanner
