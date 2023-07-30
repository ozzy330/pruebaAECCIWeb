import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const object = {
  code: 200,
  status: "ok",
  data: {
    id: "6976bfce0db5af28b84fd8e81e561177",
    minutes: 25,
  },
};

function App() {
  const [result, setResult] = useState(object);
  const [status, setStatus] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const convertFileToTXT = async (file) => {
    console.log("Preparando conversión de archivo...");
    // const apiKey = '_YOUR_API_KEY_';
    const apiKey = "586306f39d0437d272f543f310f5d191";
    const url = "http://api.convertio.co/convert";
    const data = {
      apikey: apiKey,
      file: file,
      outputformat: "txt",
    };

    // Envia el archivo para convertir
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }

      const resultData = await response.json();
      setResult(resultData);
    } catch (error) {
      console.error("Error converting file:", error);
    }
  };

  const statusConvertion = async (idConvertion) => {
    console.log("Estado de la conversion...");
    const url = `http://api.convertio.co/convert/${idConvertion}/status`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }

      const statusData = await response.json();
      setStatus(statusData);
    } catch (error) {
      console.error("Error converting file:", error);
    }
    await console.log(status, status.data.step, status.data.step_percent);
  };

  useEffect(() => {
    if (result == null) {
      // convertFileToTXT(
      //   "https://ori.ucr.ac.cr/sites/default/files/archivos/2023/guias_2_2023/Sede_Rodrigo_Facio_2-2023_v6.pdf"
      // );
    } else {
      console.log(result);
      statusConvertion(result?.data.id)
    }
  }, [result]);

  // Verificar a la fuerza el estado de la conversión
  useEffect(() => {
    // Start the interval when the component mounts
    if (status !== null && status.data.step === 'finish' && status.data.step_percent < 100) {
      const id = setInterval(() => {
        statusConvertion(status.data.id);
      }, 6000);
      setIntervalId(id);
    }
    // Clean up the interval when the component unmounts or when status changes
    return () => clearInterval(intervalId);
  }, [status]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1> Andrea guapa 🥰 </h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
