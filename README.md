# 🚀 Cold Chain Anomaly Detection

## 📌 Project Overview

Welcome to the **Cold Chain Anomaly Detection** project! 🌡️❄️ This system leverages deep learning (LSTM) to monitor cold chain environments, ensuring that temperature and humidity stay within safe ranges. It detects anomalies that might indicate failures or inefficiencies, keeping your perishable goods in check! 🍎📦

## ✨ Features

🔹 **Data Preprocessing**: Cleans and scales the input features.  
🔹 **Sequence Creation**: Converts data into time series sequences for LSTM input.  
🔹 **LSTM Model**: Trains an anomaly detection model using deep learning.  
🔹 **Balanced Training**: Handles imbalanced data through resampling.  
🔹 **Anomaly Detection**: Identifies deviations based on learned patterns.  
🔹 **Visualization**: Plots anomalies in temperature and humidity over time.  
🔹 **Google Drive Integration**: Saves and loads trained models seamlessly.  

## ⚙️ Installation

### Prerequisites

Before diving in, make sure you have these libraries installed:

```bash
pip install numpy pandas matplotlib seaborn scikit-learn tensorflow
```

## 🚀 Usage

### 1️⃣ Load the Data

Modify `file_path` in `ColdChainDataLoader` to point to your dataset (CSV file with `datetime`, `temperature_C`, `humidity_%`, and `deviation_flag` columns). 

### 2️⃣ Run the Script

Launch the system by running:

```bash
python main.py
```

This will:

✅ Load and preprocess data  
✅ Train an LSTM model  
✅ Detect anomalies in new data  
✅ Visualize detected anomalies  

### 3️⃣ Save and Load the Model

After training, the model is saved to Google Drive for future use:

```python
model.save('/content/drive/MyDrive/model.h5')
```

To reload the trained model:

```python
import keras
keras.models.load_model('/content/drive/MyDrive/model.h5')
```

## 📂 Code Structure

🔹 **`ColdChainDataLoader`**: Loads and prepares features.  
🔹 **`preprocess_data`**: Scales features.  
🔹 **`create_sequences`**: Prepares data for LSTM.  
🔹 **`build_model`**: Constructs the LSTM-based neural network.  
🔹 **`train_model`**: Balances data and trains the model.  
🔹 **`detect_anomalies`**: Predicts anomalies using the trained model.  
🔹 **`plot_anomalies`**: Visualizes anomalies in temperature and humidity.  
🔹 **`main()`**: Orchestrates the workflow.  

## 📊 Dataset Format

Your dataset should be in CSV format and structured as follows:

```
datetime,temperature_C,humidity_%,deviation_flag
2023-01-01 00:00:00,5.4,72,0
2023-01-01 01:00:00,5.6,74,1
...
```

## 🎯 Results

- The trained model **detects anomalies** in temperature and humidity fluctuations.  
- Plots highlight abnormal values in **red** against normal data for easy interpretation.  

