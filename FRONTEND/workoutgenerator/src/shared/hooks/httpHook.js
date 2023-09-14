import { useCallback, useEffect, useRef, useState, useContext } from "react";

import { AuthContext } from "../context/authContext";

export const useHttpHook = () => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const activeHttpRequests = useRef([]);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortController = new AbortController();
      activeHttpRequests.current.push(httpAbortController);
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortController.signal,
        });
        const responseData = await response.json();
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortController
        );
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message || "Something went wrong, please try again");
        setIsLoading(false);
        throw error;
      }
    },
    []
  );
  const removeError = () => {
    setError(null);
  };
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return { isLoading, error, sendRequest, removeError };
};
