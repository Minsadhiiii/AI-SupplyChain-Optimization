import React, { useState } from 'react';
import axios from 'axios';

export default function PredictForm() {
  const [formData, setFormData] = useState({
    Category: '',
    Product: '',
    Region: '',
    Store: '',
    Size: '',
    Unit_Price: '',
    Total_Sales: '',
    Date: '',
    Current_Stock: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setPrediction(response.data);
    } catch (err) {
      setError('Failed to get prediction. Is backend running?');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow space-y-4">
      {Object.entries(formData).map(([key, value]) => (
        <input
          key={key}
          name={key}
          value={value}
          onChange={handleChange}
          placeholder={key.replace(/_/g, ' ')}
          className="w-full p-2 border rounded"
          required
        />
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Predicting...' : 'Predict'}
      </button>

      {error && <p className="text-red-600">{error}</p>}

      {prediction && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Prediction Result:</h2>
          <pre>{JSON.stringify(prediction, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}