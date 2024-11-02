import { useEffect, useState } from "react";
import useMediaQuery from "../hooks/useMediaQuery";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import moment from "moment";

type TripFormDataType = {
  image:
    | "Business"
    | "Citybreak"
    | "Hiking"
    | "Nature"
    | "Socialevent"
    | "Summer"
    | "Wellness"
    | "Winter";
  tripName: string;
  roundTrip: boolean;
  roundTripCost?: number | undefined;
  travelCost?: number | undefined;
  accomodationCost?: number | undefined;
  startDay: string;
  startMonth: string;
  startYear: string;
  endDay: string;
  endMonth: string;
  endYear: string;

  description?: string;
};

type TripsCreatorFormProps = {
  tripImage:
    | "Business"
    | "Citybreak"
    | "Hiking"
    | "Nature"
    | "Socialevent"
    | "Summer"
    | "Wellness"
    | "Winter";
};

const TripsCreatorForm: React.FC<TripsCreatorFormProps> = ({ tripImage }) => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  console.log(tripImage);

  // *UseEffect for updating the image in the form
  useEffect(() => {
    setTripFormData((prev) => ({ ...prev, image: tripImage }));
  }, [tripImage]);

  // *TRIP FORM STATE
  const [tripFormData, setTripFormData] = useState<TripFormDataType>({
    image: tripImage,
    tripName: "",
    roundTrip: true,
    roundTripCost: undefined,
    travelCost: undefined,
    accomodationCost: undefined,

    startDay: "",
    startMonth: "",
    startYear: moment().year().toString(),

    endDay: "",
    endMonth: "",
    endYear: moment().year().toString(),

    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTripFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(tripFormData);

  return (
    <form className="mt-4 flex flex-col justify-center items-center text-sm gap-2">
      {/* //*NAME INPUT */}
      <input
        onChange={handleChange}
        value={tripFormData.tripName}
        name="tripName"
        type="text"
        className="inputStyle bg-transparent text-center w-full md:w-2/3"
        placeholder="Trip Name"
      />
      {/* //*ROUND TRIP */}
      <div className="flex justify-between items-center gap-1 group ">
        <div className="flex gap-1 justify-center items-center">
          <input
            onChange={() =>
              setTripFormData((prev) => ({
                ...prev,
                roundTrip: !prev.roundTrip,
              }))
            }
            checked={tripFormData.roundTrip}
            name="roundTrip"
            type="checkbox"
            className="appearance-none border border-base-300 p-2 rounded-md bg-base-200 checked:bg-primary checked:border-primary-darker group-hover:cursor-pointer"
          />
          <p>RoundTrip</p>
        </div>
        <input
          onChange={handleChange}
          value={tripFormData.roundTrip ? tripFormData.roundTripCost : ""}
          name="roundTripCost"
          disabled={!tripFormData.roundTrip}
          type="number"
          className="inputStyle bg-transparent text-center w-1/3 disabled:opacity-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Price"
        />
      </div>
      {/* //*TRANSPORT AND ACCOMODATION */}
      <AnimatePresence>
        {!tripFormData.roundTrip && (
          <>
            <motion.input
              initial={{ translateY: "-10px", opacity: 0 }}
              animate={{ translateY: "0px", opacity: 100 }}
              transition={{ duration: "0.5" }}
              exit={{ translateY: "-10px", opacity: 0 }}
              onChange={handleChange}
              value={!tripFormData.roundTrip ? tripFormData.travelCost : ""}
              name="travelCost"
              type="number"
              className="inputStyle bg-transparent text-center  md:w-1/2 lg:w-1/3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Travel price"
            />
            <motion.input
              initial={{ translateY: "-10px", opacity: 0 }}
              animate={{ translateY: "0px", opacity: 100 }}
              transition={{ duration: "0.5" }}
              exit={{ translateY: "-10px", opacity: 0 }}
              onChange={handleChange}
              value={
                !tripFormData.roundTrip ? tripFormData.accomodationCost : ""
              }
              name="accomodationCost"
              type="number"
              className="inputStyle bg-transparent  text-center md:w-1/2 lg:w-1/3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none "
              placeholder="Accomodation price"
            />
          </>
        )}
      </AnimatePresence>
      {/* //*START-END DATE */}

      <div className="flex flex-col lg:w-1/2">
        <p>StartDate</p>
        <div className="flex justify-center items-center">
          <input
            onChange={handleChange}
            value={tripFormData.startDay}
            name="startDay"
            type="number"
            placeholder="DD"
            className="inputStyle bg-transparent w-1/4 text-center"
          />
          <span>/</span>
          <input
            onChange={handleChange}
            value={tripFormData.startMonth}
            name="startMonth"
            type="number"
            placeholder="MM"
            className="inputStyle bg-transparent w-1/4 text-center"
          />
          <span>/</span>
          <input
            onChange={handleChange}
            value={tripFormData.startYear}
            name="startYear"
            type="number"
            placeholder="YYYY"
            className="inputStyle bg-transparent w-1/3 text-center"
          />
        </div>
      </div>
      <div className="flex flex-col lg:w-1/2">
        <p>EndDate</p>
        <div className="flex justify-center items-center">
          <input
            onChange={handleChange}
            value={tripFormData.endDay}
            name="endDay"
            type="number"
            placeholder="DD"
            className="inputStyle bg-transparent w-1/4 text-center"
          />
          <span>/</span>
          <input
            onChange={handleChange}
            value={tripFormData.endMonth}
            name="endMonth"
            type="number"
            placeholder="MM"
            className="inputStyle bg-transparent w-1/4 text-center"
          />
          <span>/</span>
          <input
            onChange={handleChange}
            value={tripFormData.endYear}
            name="endYear"
            type="number"
            placeholder="YYYY"
            className="inputStyle bg-transparent w-1/3 text-center"
          />
        </div>
      </div>
      {/* //*DESCRIPTION FIELD */}
      <textarea
        onChange={handleChange}
        value={tripFormData.description}
        name="description"
        placeholder="Description"
        className="inputStyle placeholder:text-center bg-transparent border-2 appearance-none resize-none rounded-md  w-full"
        rows={isSmallScreen ? 4 : 6}
      />
      <button className="text-xs lg:text-normal lg:px-4 py-2 bg-secondary text-secondary-text rounded-md w-1/2 mt-8 font-semibold hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out drop-shadow-xl">
        add
      </button>
    </form>
  );
};

export default TripsCreatorForm;
