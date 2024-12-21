import cv2
import easyocr

# Load the image from the specified path
img_path = r'D:\\mca\\project\\yolo-backend\\numberPlate\\cropImage2.jpg'  # Path to your image
image = cv2.imread(img_path)

# Bounding box coordinates (replace with the actual coordinates of your number plate)
x, y, w, h = 100, 50, 300, 100  # Example values for bounding box (adjust as needed)

# Crop the image using the bounding box
cropped_img = image[y:y+h, x:x+w]

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'])  # You can add more languages if necessary

# Extract text from the cropped image (number plate)
result = reader.readtext(cropped_img)

# Display the result
for detection in result:
    text = detection[1]
    print("Detected text:", text)
