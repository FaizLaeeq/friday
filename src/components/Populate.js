import React, { useState } from "react";
import { useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import { BsFillStarFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

function Populate() {
  const data = useSelector((state) => state.data);
  const params = useSelector((state) => state.params);
  const url = useSelector((state) => state.url);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    window.history.pushState({}, "", `?${params}`);
  }, [params]);

  useEffect(() => {
    fetchProfiles();
  }, [url]);

  const fetchProfiles = async () => {
    setFlag(false);
    setIsLoading(true);
    try {
      const fetchedData = await fetch(url);
      const jsonData = await fetchedData.json();
      if (!Array.isArray(jsonData)) {
        dispatch({ type: "SETDATA", payload: [] });
        setFlag(true);
      } else dispatch({ type: "SETDATA", payload: jsonData });
    } catch (error) {
      console.log("error:", error);
      setFlag(true);
    }
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <table>
        <tbody>
          <tr className="error">
            <td>Fetching Data</td>
          </tr>
        </tbody>
      </table>
    );

  if (data.length === 0 && !flag) {
    return (
      <table>
        <tbody>
          <tr className="error">
            <td>The Page did not return any results</td>
          </tr>
        </tbody>
      </table>
    );
  }
  if (flag && params) {
    return (
      <table>
        <tbody>
          <tr className="error">
            <td>Page not Found</td>
          </tr>
        </tbody>
      </table>
    );
  } else
    return (
      <table>
        <tbody>
          {!isLoading &&
            data.map((item) => (
              <tr key={item.id}>
                <td width="80%">{item.name}</td>
                <td width="350px">
                  <BsFillStarFill />
                  {` ${item.stargazers_count}`}
                </td>
                <td width="150px">
                  <a target="_blank" href={item.html_url} rel="noreferrer">
                    <FiExternalLink />
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
}
export default Populate;
