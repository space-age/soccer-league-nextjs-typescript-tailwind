function ContactFees() {
  return (
    <div className="flex flex-col gap-4 bg-[#eeeeee] p-4 pb-6 capitalize text-black md:gap-9 lg:gap-5 lg:p-6">
      <h2 className="text-2xl font-bold tracking-wider md:text-3xl	">
        Team and Player registration!
      </h2>
      <p className=" text-lg font-medium normal-case tracking-wider ">
        Players are required to be registered with a team to be able to play in
        the soccer match
      </p>
      <div className="grid gap-2 tracking-wide  sm:grid-cols-2 ">
        <div className="flex flex-col">
          <h3 className=" text-lg font-bold underline underline-offset-2 ">
            One time fees
          </h3>
          <p className="pb-1 font-semibold">
            Player registration:{' '}
            <span className="font-extrabold text-[#00838f]">$20</span>
          </p>
          <p className="font-semibold">
            Team registration:{' '}
            <span className="font-extrabold text-[#00838f]">$100</span>
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold underline underline-offset-2 ">
            Match day fees
          </h3>
          <p className="font-semibold">
            Match day referee fee:{' '}
            <span className="font-extrabold text-[#00838f]">$100</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactFees
