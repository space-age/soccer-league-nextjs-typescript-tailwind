import ContactFees from './ContactFees'
import ContactInformation from './ContactInformation'

function Contact() {
  return (
    <div className="grid w-full  md:h-[54vh] md:grid-cols-2 lg:h-[40vh] ">
      <ContactInformation />
      <ContactFees />
    </div>
  )
}

export default Contact
