import Image from 'next/image'
import img from '../../images/home-bg.jpg'

function Banner() {
  return (
    <div
      // bg-gradient-to-b from-white-100/30 to-[#222] h-[44vh]
      className="
      flex h-[100vh] w-full flex-col justify-end space-y-2 pb-5 
      md:h-[66vh]
      lg:h-[100vh] lg:space-y-4 lg:pb-16"
    >
      <div
        className="absolute top-0 left-0 -z-10  h-[100vh] w-full  
      md:h-[66vh]
      lg:h-[100vh]"
      >
        <Image src={img} layout="fill" objectFit="cover" alt="Soccer Field" />
      </div>
      <h1
        className="text-2xl font-extrabold 
      md:text-4xl 
      lg:text-7xl"
      >
        Luciano's Adult Soccer League
      </h1>
      <h2
        className="text-lg font-bold 
      md:text-3xl 
      lg:text-4xl"
      >
        Located in Menifee, Ca
      </h2>
      <p
        className="text-shadow-md max-w-xs text-xs font-semibold 
      md:max-w-lg md:text-lg 
      lg:max-w-2xl lg:text-2xl"
      >
        Come join us to compete and have fun. Age is just a number!
      </p>
    </div>
  )
}

export default Banner
