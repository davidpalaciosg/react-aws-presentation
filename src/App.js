import "./App.css";
import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import Add from "./components/Add";

function App() {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = "Personas App";
  }, []);

  const handleClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <h1 className="title">Tabla personas</h1>
      <p>
        La dirección del API Gateway es: 
        <a
          href="https://gt7uk3458j.execute-api.us-east-2.amazonaws.com/personas"
          target="_blank"
          rel="noreferrer"
        >
          API Gateway
        </a>
      </p>
      <Table />
      <div className="buttonContainer">
        {!showForm && (
          <button className="buttonAdd" onClick={handleClick}>
            Agregar persona
          </button>
        )}
        {showForm && <Add />}
      </div>
    </div>
  );
}

export default App;
