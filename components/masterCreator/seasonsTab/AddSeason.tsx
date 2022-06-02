function AddSeason() {
  return (
    <>
      {/* <h2 className=" text-xl font-semibold">Add a season</h2> */}
      <form
        // onSubmit={handleSubmit}
        className="grid-row mt-1 grid gap-3 text-lg"
      >
        <label className=" pr-2 ">
          Season name:
          <input
            type="text"
            id="seasonName"
            name="seasonName"
            placeholder=" Season Name"
            // value={enteredSeasonName}
            // onChange={(e) => setEnteredSeasonName(e.target.value)}
            className="ml-2"
          />
        </label>
        <label className=" ">
          Division name:
          <input placeholder=" Division Name" className="ml-2" />
        </label>
        <button className="content-start border-2">+ Add more Division</button>
        <button
          type="submit"
          className=" w-[15%] rounded bg-[#00838f] px-1 text-white hover:bg-[white] hover:text-black"
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default AddSeason
