import { useState, useEffect } from "react";


const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async (req, res) => {
      setLoading(true);
      try {
        const res = await fetch(url,{
          method:"get",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:"include",
        });
        if (!res.ok) {
          setError("Failed to fetch");
          setLoading(false)
        }
        const result=await res.json();
        setData(result.data);
        setLoading(false)

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
