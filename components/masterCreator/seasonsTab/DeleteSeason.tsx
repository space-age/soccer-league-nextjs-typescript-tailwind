function DeleteSeason() {
  return (
    <>
      <h2 className=" text-xl font-semibold">
        Deleting a season will remove the Entire Season, including all data in
        the season such as Teams, Schedules, Tables.{' '}
      </h2>
      <h3 className="text-lg text-[red]">
        A warning will be prompted once delete is selected. Will need password
        to autheriaze the deletion as a final warning. Once password is entered,
        and submission entered, season will permanantly be deleted.
      </h3>
    </>
  )
}

export default DeleteSeason
