import React, { useState } from "react";
import axios from "axios";

export default function InputUrl() {
  const [url, setUrl] = useState("");
  const [sub, setSub] = useState("");

  function handleChange(e) {
    setUrl(e.target.value);
  }

  async function Submit() {
    const proxy = "https://cors-anywhere.herokuapp.com/"; // Temporary proxy for bypassing CORS

    axios({
      method: "POST",
      url: `${proxy}https://app.roboflow.com/helmate-and-numberplate-detection-system/helmet-detection-and-number-plate-detection-gqppa-jkrn7/1`,
      params: {
        api_key: "ALi15MAfe2TMEwydwlS0",
        image: url,
      },
    })
      .then(function (response) {
        console.log(response.data);
        setSub(response.data);
      })
      .catch(function (error) {
        console.error("Error:", error.message);
      });
  }

  return (
    <>
      <p className="font-bold text-slate-900">URL: {url}</p>
      <input
        type="text"
        value={url}
        placeholder="Input your image URL"
        className="p-3 border-2 rounded-md border-cyan-200 shadow-md"
        onChange={handleChange}
      />
      <button type="submit" onClick={Submit}>
        Submit
      </button>
      <br />
      <p>{JSON.stringify(sub)}</p>
    </>
  );
}
