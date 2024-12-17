import { useState } from "react";
import axios from "axios";

export default function InputUrl() {
  const [url, setUrl] = useState("");
  const [sub, setSub] = useState("");

  function handleChange(e) {
    setUrl(e.target.value);
  }

  async function Submit() {
    const result = await axios.post('http://localhost:3000/driver/byUrl',{
      "img": "https://images.hindustantimes.com/rf/image_size_640x362/HT/p2/2016/06/01/Pictures/connectivity-satyaparkash-commuters-hindustan-initially-transport-innovative_4d921dca-2765-11e6-a271-92fd27615944.jpg"
    })

    console.log(result)
    setSub(result)
    // const proxy = "https://cors-anywhere.herokuapp.com/"; // Temporary proxy for bypassing CORS

    // axios({
    //   method: "POST",
    //   url: `${proxy}https://app.roboflow.com/helmate-and-numberplate-detection-system/helmet-detection-and-number-plate-detection-gqppa-jkrn7/1`,
    //   params: {
    //     api_key: "ALi15MAfe2TMEwydwlS0",
    //     image: url,
    //   },
    // })
    //   .then(function (response) {
    //     console.log(response.data);
    //     setSub(response.data);
    //   })
    //   .catch(function (error) {
    //     console.error("Error:", error.message);
    //   });
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
