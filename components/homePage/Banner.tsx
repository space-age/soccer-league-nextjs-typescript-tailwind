import Image from 'next/image'
import img from '../../images/temp1.jpg'
// import img from '../../images/home-bg.jpg'

function Banner() {
  return (
    <div
      // bg-gradient-to-b from-white-100/30 to-[#222] h-[44vh]
      className=" flex
      h-[100vh] w-full flex-col justify-center space-y-2 pt-80 pb-5 sm:justify-end sm:pt-0 
      lg:space-y-4 lg:pb-16"
    >
      <div
        className="absolute top-0 left-0 -z-10  h-[100vh] w-full  brightness-[.8]	
        "
      >
        <Image src={img} layout="fill" objectFit="cover" alt="Soccer Field" />
      </div>
      <h1
        className="text-4xl font-extrabold 
      md:text-6xl 
      lg:text-7xl"
      >
        Luciano's Adult Soccer League
      </h1>
      <h2
        className="text-2xl font-bold 
      md:text-4xl 
      lg:text-4xl"
      >
        Located in Menifee, Ca
      </h2>
      <p
        className=" max-w-xs pt-5 text-xl font-semibold 
      md:max-w-lg md:text-xl 
      lg:max-w-2xl lg:text-2xl"
      >
        Come join us to compete and have fun. Age is just a number!
      </p>
    </div>
  )
}

export default Banner
