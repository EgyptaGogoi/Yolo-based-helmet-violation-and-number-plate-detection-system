import axios from 'axios'
import { useState } from 'react'

export default function InferenceForm() {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [result, setResult] = useState(null);

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    }

    const handleUrlSubmit = async () =>{
        try {
            const response = await axios.post('http://localhost:8000/yolo/url',{
                url: imageUrl,
            });
            setResult(response.message);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleFileSubmit = async ()=>{
        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await axios.post('http://localhost:8000/yolo/local', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
        <h1>YOLO Inference</h1>
  
        <div>
          <h2>Infer Using Image URL</h2>
          <input
            type="text"
            placeholder="Enter Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <button onClick={handleUrlSubmit}>Submit</button>
        </div>
  
        <div>
          <h2>Infer Using Local Image</h2>
          <input type="file" onChange={handleImageUpload} />
          <button onClick={handleFileSubmit}>Upload</button>
        </div>
  
        {result && (
          <div>
            <h2>Inference Result</h2>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div> 
    )
}
