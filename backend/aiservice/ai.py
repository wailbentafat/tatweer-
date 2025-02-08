import uvicorn
from fastapi import FastAPI
import joblib
import keras

app = FastAPI()
joblib_in = open("model.h5","rb")
model=keras.models.load_model(joblib_in)

@app.get('/')
def index():
    return {'message': 'Anomaly detector ML API'}

@app.post('/anomaly/predict')
def predict_car_type(data):

    prediction = model.predict([data])
    
    return {
        'prediction': prediction[0]
    }

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
