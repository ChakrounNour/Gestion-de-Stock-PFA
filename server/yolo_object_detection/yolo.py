import cv2 
import numpy as np
import sys
import imutils
import os
import pytesseract
from dataclasses import make_dataclass
import pandas as pd
import uuid

# Args
input_path = sys.argv[1]
output_path = sys.argv[2]
cwd = os.path.dirname(os.path.realpath(__file__)) + "\\"
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

WEIGHTS_FILE = cwd + "yolov3.weights"
CONFIG_FILE = cwd + "yolov3.cfg"
CLASSES_FILE = cwd + "coco.names"

net = cv2.dnn.readNet(WEIGHTS_FILE,CONFIG_FILE)
classes = []
with open(CLASSES_FILE,"r") as f:
    classes = [line.strip() for line in f.readlines()]

colors= np.random.uniform(0,255,size=(len(classes),3))
layer_names = net.getLayerNames()
outputlayers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]


img = cv2.imread(input_path)
height,width,channels = img.shape
blob = cv2.dnn.blobFromImage(img,0.00392,(416,416),(0,0,0),True,crop=False)
net.setInput(blob)
outs = net.forward(outputlayers)
class_ids=[]
confidences=[]
boxes=[]
for out in outs:
    for detection in out:
        scores = detection[5:]
        class_id = np.argmax(scores)
        confidence = scores[class_id]
        if confidence > 0.5:
            center_x= int(detection[0]*width)
            center_y= int(detection[1]*height)
            w = int(detection[2]*width)
            h = int(detection[3]*height)

            
            x=int(center_x - w/2)
            y=int(center_y - h/2)

            boxes.append([x,y,w,h]) 
            confidences.append(float(confidence))
            class_ids.append(class_id) 

indexes = cv2.dnn.NMSBoxes(boxes,confidences,0.4,0.6)

result= [{"nomSTE":0,"adresseSTE":0,"emailSTE":0,"telSTE":0,"nomCli":0,"adresseCli":0,"cin":0,"dateFac":0,"codeArt":0,"desgArt":0,"qte":0,"prixUT":0,"TVA":0,"remise":0,"totalTVA":0,"timbre":0,"totalHT":0,"montantTTC":0,"montantHT":0,"commande":0,"numTel":0,"dateLiv":0,"modeLiv":0,"numFact":0}]

font = cv2.FONT_HERSHEY_PLAIN
for i in range(len(boxes)):
    if i in indexes:
        x,y,w,h = boxes[i]
        crop_img = img[y:y+h, x:x+w]
        cv2.imwrite("Crop/crop__" + str(i) + ".jpg",crop_img)
        gray = cv2.cvtColor(crop_img, cv2.COLOR_RGB2GRAY)
    # resize image to three times as large as original for better readability
        gray = cv2.resize(gray, None, fx = 3, fy = 3, interpolation = cv2.INTER_CUBIC)
    # perform gaussian blur to smoothen image
        blur = cv2.GaussianBlur(gray, (5,5), 0)
    # threshold the image using Otsus method to preprocess for tesseract
        ret, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)
    #perfrom bitwise not to flip image to black text on white background
        roi = cv2.bitwise_not(thresh)
    #saving the roi regions
        cv2.imwrite("Crop/roi__" + str(i) + ".jpg",roi)
        label = str(classes[class_ids[i]])
        color = colors[i]
        cv2.rectangle(img,(x,y),(x+w,y+h),color,2)
        cv2.putText(img,label,(x,y+30),cv2.FONT_HERSHEY_SIMPLEX, 1,color,1,cv2.LINE_AA)
        pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
        try:
            text = pytesseract.image_to_string(roi, config='--psm 11 --oem 3')
            print("Class: {}, Text Extracted: {}".format(label, text))

            for cle in result[0].keys():
                if cle==label:
                    result[0][cle]=text
        except: 
            text = None
K = ["nomSTE","adresseSTE","emailSTE","telSTE","faxSTE","nomCli","adresseCli","cin","dateFac","codeArt","desgArt","qte","prixUT","TVA","remise","totalTVA","timbre","totalHT","montantTTC","montantHT","commande","codeTVA","numTel","dateLiv","modeLiv","RIB","RC","numFact"]
# Data = dict(zip(K,result))
print(result)

#Creating a Dataframe
df = pd.DataFrame(result)


unique_filename = str(uuid.uuid4())
df.to_json (r'detected_images/ocr.json', index = False, orient="table")
df.to_json (r'detected_images/archives/ocr'+unique_filename+'.json', index = False, orient="table")

cv2.imwrite(output_path,img)
print(result)
print(output_path)
sys.stdout.flush()
