import { useState, useEffect } from "react";
import "./App.css";
import { getLocations, isNameValid } from "./mock-api/apis";

function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    getLocations().then((locations) => setLocations(locations));
  }, []);

  const handleAddData = () => {
    if (!name?.length || !location?.length || !isValid) return;

    const newData = {
      name,
      location,
    };
    setData([...data, newData]);
  };

  const handleClearData = () => {
    setData([]);
    setName("");
    setLocation("");
  };

  const handleChangeName = async (e) => {
    const name = e.target.value;
    setName(name);

    const result = await isNameValid(name);
    console.log(result);
    setIsValid(result);
  };

  return (
    <div className="data-form">
      <div className="data-form-row">
        <label>Name</label>
        <input type="text" value={name} onChange={handleChangeName} />
      </div>
      {!isValid && (
        <p className="data-form-error">This name has already been taken </p>
      )}
      <div className="data-form-row">
        <label>Location</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="" />
          {locations?.map((location, index) => (
            <option key={`location_${index}`} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="data-form-row control">
        <button type="button" onClick={handleClearData}>
          Clear
        </button>
        <button type="button" onClick={handleAddData}>
          Add
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th> Name </th>
              <th> Location </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((el, index) => (
              <tr key={`table_tr_${index}`}>
                <td>{el.name}</td>
                <td>{el.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
