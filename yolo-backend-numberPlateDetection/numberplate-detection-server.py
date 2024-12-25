from flask import Flask, request, jsonify
import cv2
import easyocr
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all domains
CORS(app)

def ocr(image_path, x, y, w, h):
    image = cv2.imread(image_path)

    # Convert x, y, w, h to integers for slicing
    x, y, w, h = int(x), int(y), int(w), int(h)

    # Calculate the top-left corner of the bounding box
    top_left_x = x - w // 2
    top_left_y = y - h // 2

    # Crop the bounding box region
    cropped_image = image[top_left_y:top_left_y + h, top_left_x:top_left_x + w]

    # Save the cropped image (optional, for verification)
    cv2.imwrite("cropped_image.jpg", cropped_image)

    # Initialize the EasyOCR reader
    reader = easyocr.Reader(['en'])  # Specify language(s), e.g., 'en' for English

    # Perform text recognition on the cropped image
    result = reader.readtext(cropped_image)

    # Collect the detected text into a single variable and return it
    detected_text = " ".join([detection[1] for detection in result if isinstance(detection[1], str)])

    return detected_text

@app.route('/extractNumberPlate', methods=['GET'])
def upload_file():
    # Check for JSON data in the request
    if not request.is_json:
        return jsonify({"error": "Request must be in JSON format"}), 400

    try:
        data = request.get_json()
        file_path = data.get('file_path')  # Full path to the file on the client system
        x = float(data.get('x'))
        y = float(data.get('y'))
        w = float(data.get('w'))
        h = float(data.get('h'))
    except (ValueError, TypeError, KeyError):
        return jsonify({"error": "Invalid or missing fields in JSON"}), 400
    
    # Return a response with file path and metadata
    return jsonify({
        "text": ocr(file_path, x, y, w, h)
    }), 200

@app.route('/')
def index():
    return "Welcome to the Image Upload Server. Use the /upload endpoint to upload images with metadata in JSON format.", 200

if __name__ == '__main__':
    app.run(debug=True)
