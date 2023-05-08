import React, { useState } from "react";

function Add() {
  //Se crea un estado para el metodo POST para guardar los datos del formulario
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    age: "",
  });

  //Poner la informacion actualizada
  const handleInputChange = (event) => {
    setFormData({
      id: formData.id,
      name: formData.name,
      lastName: formData.lastName,
      age: formData.age,
      [event.target.name]: event.target.value,
    });
  };

  //Creacion de funcion para enviar el formulario como solicitud PUT
  const HOST_API = "https://gt7uk3458j.execute-api.us-east-2.amazonaws.com";
  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = HOST_API + "/personas";
    let body = null;
    let contentType = null;

    // Si se debe enviar como JSON
    body = JSON.stringify(formData);
    contentType = "application/json";

    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
      },
      body: body,
    });
    const contentTypeHeader = response.headers.get("Content-Type");
    let data;
    if (contentTypeHeader && contentTypeHeader.includes("application/json")) {
      data = await response.json();
    }
    console.log(data);
  };

  return (
    <div className="formDiv">
      <form onSubmit={handleSubmit}>
        <label>
          ID
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Nombre
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Apellido
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Edad
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </label>
        <div className="buttonContainer">
          <button type="submit" className="buttonAdd">
            {" "}
            Enviar{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
