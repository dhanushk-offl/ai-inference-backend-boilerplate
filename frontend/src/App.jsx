import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!input) return alert("Please enter some text!");

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/predict', { data: input });
      setResult(response.data.output);
    } catch (error) {
      console.error('Error predicting:', error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Sentiment Analysis</h1>
      <textarea 
        rows="4" 
        cols="50" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter text for sentiment analysis"
      />
      <br />
      <button onClick={handlePredict} disabled={loading}>
        {loading ? 'Loading...' : 'Analyze Sentiment'}
      </button>

      {result && (
        <div>
          <h3>Result:</h3>
          <p>Label: {result.label}</p>
          <p>Confidence: {result.score}</p>
        </div>
      )}
    </div>
  );
};

export default App;
