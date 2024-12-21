import { useState } from "react";
import axios from "axios";

export default function InputUrl() {
  const [url, setUrl] = useState("");
  const [sub, setSub] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    setUrl(e.target.value);
    setImage(null); // Reset image preview when the URL is changed
  }

  async function Submit() {
    if (!url) {
      setError("Please enter a valid image URL.");
      return;
    }
    setError(""); // Clear previous error message

    try {
      const result = await axios.post("http://localhost:3000/driver/byUrl", {
        img: url,
      });

      console.log(result);
      setSub(result.data); // Set the API response to the sub state
      setImage(url); // Set the image URL to preview it

    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message);
    }
  }

  // Helper function to determine violation status
  const getViolationStatus = (predictions) => {
    let helmetViolation = "No Violation";
    let numberPlate = "No Plate Detected";

    predictions.forEach((prediction) => {
      if (prediction.class === "with helmet") {
        helmetViolation = "No Violation";
      } else if (prediction.class === "without helmet") {
        helmetViolation = "Violated";
      }

      if (prediction.class === "Number Plate") {
        numberPlate = "Detected";
      }
    });

    return { helmetViolation, numberPlate };
  };

  return (
    <div className="w-screen p-6 flex flex-col items-center mb-52">
      <p className="font-bold text-2xl text-slate-900 mb-4">Enter Your Image Url</p>

      <input
        type="text"
        value={url}
        placeholder="Input your image URL"
        className="p-3 w-80 border-2 rounded-md border-cyan-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4"
        onChange={handleChange}
      />

      <button
        type="submit"
        onClick={Submit}
        className="bg-cyan-500 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-cyan-600 transition duration-200 ease-in-out mb-4"
         id='url'
      >
        Submit
      </button>

      {/* Error handling */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      
      {image && (
        <>
          <p className="text-md font-semibold text-slate-700 mb-4">
            { image ? "Uploaded Image" :""}
          </p>
          <div className="my-6 w-full flex justify-center">
            <img
              src={image}
              alt="Uploaded Preview"
              className="max-w-2xl w-full h-auto rounded-md shadow-lg object-contain"
            />
          </div>
        </>
      )}

      {/* Show the result from the API */}
      <p className="text-sm text-slate-700 mb-4">
        {sub && sub.length > 0 ? "Detection Results:" : "No data received."}
      </p>


      {/* Carousel of Images */}
      <div className="w-full flex justify-center mb-6">
        {sub &&
          sub.map((item, index) => (
            <div key={index} className="flex items-center mx-2">
              <img
                src={`../../croped-Image/cropImage${index+1}.jpg`} // Adjust URL if needed
                alt={`Figure ${index + 1}`}
                className="max-w-xs w-full h-auto rounded-md shadow-lg object-contain"
              />
            </div>
          ))}
      </div>

      {/* Table for displaying results */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full table-auto text-sm border-separate border-spacing-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Figure</th>
              <th className="px-4 py-2 text-left">Helmet Violation</th>
              <th className="px-4 py-2 text-left">Number Plate</th>
            </tr>
          </thead>
          <tbody>
            {sub &&
              sub.map((item, index) => {
                const { helmetViolation, numberPlate } = getViolationStatus(
                  item.detectionResult.predictions
                );

                return (
                  <tr key={index} className="bg-white hover:bg-gray-100">
                    <td className="px-4 py-2">Figure {index + 1}</td>
                    <td className="px-4 py-2">{helmetViolation}</td>
                    <td className="px-4 py-2">{numberPlate}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>

  );
}
