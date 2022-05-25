function ContactFees() {
  return (
    <div className="flex flex-col gap-4 bg-[#eeeeee] p-4 capitalize text-black md:gap-9 md:p-4 lg:gap-5 lg:p-6">
      <h2 className="text-2xl font-bold tracking-wider md:text-3xl	">
        Team and Player registration!
      </h2>
      <p className=" text-lg font-medium md:text-lg">
        Players are required to be registered with a team to be able to play in
        the soccer match
      </p>
      <div className=" grid grid-cols-2 md:gap-2">
        <div className="flex flex-col">
          <h3 className=" font-semibold underline lg:text-lg">One time fees</h3>
          <p className="pb-1 font-semibold">
            Player registration: <span className="font-bold">$10</span>
          </p>
          <p className="font-semibold">
            Team registration: <span className="font-bold">$10</span>
          </p>
        </div>
        <div>
          <h3 className="font-semibold underline lg:text-lg">Match day fees</h3>
          <p className="font-semibold">
            Match day referee fee: <span className="font-bold">$100</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ContactFees
