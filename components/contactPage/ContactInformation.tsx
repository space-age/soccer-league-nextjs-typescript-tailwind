import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LanguageIcon from '@mui/icons-material/Language'

function ContactInformation() {
  return (
    <div className="flex flex-col gap-6 bg-[#fafafa] p-4 text-black md:gap-8 lg:gap-6 lg:p-3">
      <h2 className="text-2xl font-bold tracking-wider md:text-3xl">
        Contact us for more information!
      </h2>
      <p className="text-xl font-bold tracking-wider sm:text-2xl ">
        We are located in Menifee, Ca
      </p>
      <div className="grid grid-cols-2 gap-2 tracking-wide	">
        <div className="flex flex-col gap-3 font-semibold md:text-lg lg:text-xl">
          <div className="flex flex-row gap-2 ">
            <PersonOutlineOutlinedIcon />
            <p className="contactInformation--p-text">Luciano</p>
          </div>
          <div className="flex flex-row gap-2 ">
            <LanguageIcon />
            <p className="contactInformation--p-text">Spanish Speaker</p>
          </div>
          <div className="flex flex-row gap-2 ">
            <LocalPhoneOutlinedIcon />
            <p className="contactInformation--p-text">012-345-6789</p>
          </div>
        </div>
        <div className="flex flex-col gap-3  font-semibold md:text-lg lg:text-xl">
          <div className="flex flex-row gap-2 ">
            <PersonOutlineOutlinedIcon />
            <p className="contactInformation--p-text">Another</p>
          </div>
          <div className="flex flex-row gap-2 ">
            <LanguageIcon />
            <p className="contactInformation--p-text">English Speaker</p>
          </div>
          <div className="flex flex-row gap-2 ">
            <LocalPhoneOutlinedIcon />
            <p className="contactInformation--p-text">987-654-3210</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInformation
