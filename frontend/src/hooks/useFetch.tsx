import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetch = <T,>(url: string | null) => {
  const [apiData, setApiData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [JWTtoken, setJWTtoken] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setJWTtoken(token);
    }
  }, []);

  useEffect(() => {
    if (!url) return;
    setIsLoading(true);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const config = JWTtoken
          ? {
              headers: {
                Authorization: `Bearer ${JWTtoken}`,
              },
            }
          : {};

        const response = await axios.get<T>(url, config);
        const data = response?.data;
        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setServerError(error.message);
        } else {
          setServerError("An unexpected error ocurred!");
        }
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, JWTtoken]);

  return { isLoading, apiData, serverError };
};

export default useFetch;
