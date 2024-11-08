import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { ExpenseType } from "../components/ExpensesGrid";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "./AuthContext";

type TripType = {
  _id: string;
  image: string;
  name: string;
  roundTrip: boolean;
  roundTripCost?: number;
  startDate: string;
  endDate: string;
  description?: string;
  expenses?: ExpenseType[];
};

export type TripsContextType = {
  trips: TripType[];
  isLoading: boolean;
  reFetchTrips: () => void;
};

export const TripsContext = createContext<TripsContextType | undefined>(
  undefined
);

type TripsContextProviderProps = {
  children: ReactNode;
};

const TripsContextProvider: React.FC<TripsContextProviderProps> = ({
  children,
}) => {
  const [trips, setTrips] = useState<TripType[]>([]);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const reFetchTrips = () => {
    setTriggerFetch((prev) => !prev);
  };

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useContext must be used withing AuthContextProvider");
  }
  // const deployedUrl = "https://extr-backend.onrender.com";
  const local = "http://localhost:8080";

  const { user } = authContext;

  const { apiData, isLoading } = useFetch<TripsContextType>(
    `${local}/${user.id}?fetch=${triggerFetch}`
  );

  useEffect(() => {
    if (apiData) {
      setTrips(apiData.trips);
    }
  }, [apiData, triggerFetch]);
  // console.log(trips);

  return (
    <TripsContext.Provider value={{ trips, isLoading, reFetchTrips }}>
      {children}
    </TripsContext.Provider>
  );
};

export default TripsContextProvider;