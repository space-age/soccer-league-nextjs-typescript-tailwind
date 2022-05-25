import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LanguageIcon from '@mui/icons-material/Language'

function ContactInformation() {
  return (
    <div className="flex flex-col gap-6 bg-[#fafafa] p-4 text-black md:gap-16 md:p-4 lg:gap-10 lg:p-6">
      <h2 className="text-2xl font-bold tracking-wider md:text-3xl">
        Contact us for more information!
      </h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-3 font-semibold md:text-lg lg:text-xl">
          <div className="flex flex-row gap-2 ">
            <PersonOutlineOutlinedIcon />
            <p className="text-[#00838f]">Luciano</p>
          </div>
          <div className="flex flex-row gap-2 ">
            <LanguageIcon />
            <p className="text-[#00838f]">Spanish Speaker</p>
          </div>
          <div className="flex flex-row gap-2 ">
            <LocalPhoneOutlinedIcon />
            <p className="text-[#00838f]">012-345-6789</p>
          </div>
        </div>
        <div className="flex flex-col gap-3  font-semibold md:text-lg lg:text-xl">
          <div className="flex flex-row gap-2 ">
            <PersonOutlineOutlinedIcon />
            <p className="text-[#00838f]">Another</p>
          </div>
          <div className="flex flex-row gap-2 ">
            <LanguageIcon />
            <p className="text-[#00838f]">English Speaker</p>
          </div>
          <div className="flex flex-row gap-2 ">
            <LocalPhoneOutlinedIcon />
            <p className="text-[#00838f]">987-654-3210</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInformation
