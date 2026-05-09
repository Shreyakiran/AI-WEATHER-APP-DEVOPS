import React, { useState } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineAudio, AiOutlineBulb } from 'react-icons/ai';
import SpeechRecognition from 'react-speech-recognition';
import Lottie from 'lottie-react';

import weatherAnimation from './weat.json';
import './App.css';

// Replace with NEW Groq key after rotating old one
const GROQ_API_KEY = process.env.REACT_APP_GROQ_API_KEY;
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Please enter city name");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: `Give weather details of ${city} in short format.
Temperature:
Humidity:
Condition:`
            }
          ]
        },
        {
          headers: {
            "Authorization": `Bearer ${GROQ_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const result =
        response.data.choices[0].message.content;

      setWeather({
        city,
        result
      });

    } catch (error) {
      console.log("Groq Error:", error);

      if (error.response) {
        console.log("API Response:", error.response.data);

        alert(
          error.response.data?.error?.message ||
          "Groq API request failed"
        );
      } else {
        alert(
          "Network/CORS error. Groq blocks direct browser requests."
        );
      }
    }

    setLoading(false);
  };

  const handleVoiceSearch = () => {
    SpeechRecognition.startListening({
      continuous: false
    });
  };

  const toggleTheme = () => {
    setTheme(prev =>
      prev === 'light' ? 'dark' : 'light'
    );
  };

  return (
    <div className={`app-container ${theme}`}>

      <h1 className="title">
        ☁️ AI Weather Dashboard
      </h1>

      <button
        className="theme-toggle"
        onClick={toggleTheme}
      >
        <AiOutlineBulb />
      </button>

      <div className="search-box">

        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        <button onClick={fetchWeather}>
          <FiSearch />
        </button>

        <button onClick={handleVoiceSearch}>
          <AiOutlineAudio />
        </button>

      </div>

      {loading && <p>Loading...</p>}

      {weather && (
        <div className="weather-info">

          <h2>{weather.city}</h2>

          <p>{weather.result}</p>

          <Lottie
            animationData={weatherAnimation}
            style={{
              width: 150,
              margin: "auto"
            }}
          />

        </div>
      )}

    </div>
  );
}

export default App;