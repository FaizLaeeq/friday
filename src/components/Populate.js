import React, { useState } from "react";
import { useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import { BsFillStarFill } from "react-icons/bs";

function Populate({ params }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchUrl, setFetchUrl] = useState();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (params) {
      const newUrl = `https://api.github.com/users/${params}/repos?type=all&sort=updated`;
      setFetchUrl(newUrl);
      setFlag(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchUrl]);

  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      const fetchedData = await fetch(fetchUrl);
      const jsonData = await fetchedData.json();
      if (!Array.isArray(jsonData)) {
        setData([]);
        setFlag(true);
      } else setData(jsonData);
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
