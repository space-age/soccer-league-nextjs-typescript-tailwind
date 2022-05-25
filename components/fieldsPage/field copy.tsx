import Image from 'next/image'
import image from '../../images/map.JPG'

function field() {
  return (
    <div className="m-auto my-6 flex w-[75%] flex-row rounded-md  border-2 border-[#00838f]  text-black shadow-lg ">
      <div className=" grid w-full grid-cols-2  justify-items-stretch	">
        <div className="flex  flex-row  justify-around gap-4 bg-[#eceff1] p-2 font-semibold">
          <div className="flex flex-col items-center text-xl text-[#00838f]">
            <p className="text-lg text-black underline">Fields:</p>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </div>
          <div className="flex flex-col">
            <p className="text-lg underline">Address: </p>
            <a
              target="_blank"
              href="https://www.google.com/maps/place/Heritage+Lakes+Sports+Park,+Menifee,+CA+92585/@33.7257777,-117.1455514,20z/data=!4m2!3m1!1s0x80db61535c67ef77:0x819af9fe4cf87de9"
              className=" text-xl text-[#00838f] hover:text-[#d32f2f]"
            >
              29201 Heritage Lake Dr
              <br />
              Menifee Ca 92585
              <br />
            </a>
          </div>
        </div>
        <div className="">
          <Image
            src={image}
            layout=""
            // objectFit="fill"
            alt="Soccer Field"
          />
        </div>
      </div>
    </div>
  )
}

export default field
