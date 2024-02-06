import React, { useState, useEffect } from "react";

function PropertyAdd() {
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState("");

  const getProperties = async () => {
    const url = `${process.env.REACT_APP_API_HOST}/properties`;
    try {
      const response = await fetch(url);
      // console.log("get properties response:", response);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setProperties(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  if (properties === undefined) {
    return null;
  }

  const handlePropertyChange = (e) => {
    const value = e.target.value;
    setProperty(value);
  };

  const handlePropertySubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_HOST}/user`;

    const data = {};
    data.property = property;
    const fetConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, fetConfig);
      if (response.ok) {
        const addProperty = await response.json();
        setProperty("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="container margin-bottom">
        <h2>2. Select Your Coop</h2>
        <p>If you don't see your coop in this list, please add it below</p>
        <form onSubmit={handlePropertySubmit}>
          <div className="form-floating mb-3">
            <select onChange={handlePropertyChange}>
              <option>Choose Property</option>
              {properties.map((property) => {
                return (
                  <option
                    key={property.property_id}
                    value={property.property_id}
                  >
                    {property.property_name}, {property.street},{" "}
                    {property.state}
                  </option>
                );
              })}
            </select>
          </div>
          <button>Submit!</button>
        </form>
      </div>
    </>
  );
}

// import React, { useState, useEffect } from "react";

// function PropertyAdd(properties, onChange) {
//   return (
//     <>
//       <div className="container margin-bottom">
//         <h2>2. Select Your Coop</h2>
//         <p>If you don't see your coop in this list, please add it below</p>
//         <form>
//           <div className="form-floating mb-3">
//             <select onChange={onChange}>
//               <option>Choose Property</option>
//               {properties.map((property) => {
//                 return (
//                   <option
//                     key={property.property_id}
//                     value={property.property_id}
//                   >
//                     {property.property_name}, {property.street},{" "}
//                     {property.state}
//                   </option>

//                 );
//               })}
//             </select>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

export default PropertyAdd;
