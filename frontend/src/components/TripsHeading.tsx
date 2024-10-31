import { IoMdAdd } from "react-icons/io";

const TripsHeading = () => {
  return (
    <div className="mx-auto flex flex-col gap-6 justify-between items-center w-4/5 lg:w-2/5 mt-12 md:flex md:flex-row font-base">
      <div className="flex  gap-4 items-center">
        <div className="relative inline-block mt-2">
          <input
            type="checkbox"
            className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border-2 border-base-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset checked:border-primary"
          />
          <span className="pointer-events-none absolute left-1 top-1  block h-4 w-4 rounded-full bg-base-300 transition-all duration-200 peer-checked:left-7 peer-checked:bg-primary"></span>
        </div>
        <div className="text-xl">Roundtrips Only</div>
      </div>
      <div className=" bg-secondary text-secondary-text font-semibold   p-1 md:p-1.5 rounded-md active:scale-90 hover:scale-105 hover:cursor-pointer focus:border-secondary-darker focus:border-2 transition-transform duration-300 ease-in-out flex justify-around items-center gap-4 md:px-4 group w-1/3 self-center md:w-auto">
        <IoMdAdd className="text-xl md:text-2xl group-hover:rotate-90  transition-all duration-1000" />
        <p className="font-base">Add</p>
      </div>
    </div>
  );
};

export default TripsHeading;
