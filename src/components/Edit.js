import React, { useState } from "react";

const Edit = ({ person }) => {
  //Valores recibidos
  const [id, setId] = useState(person.id);
  const [name, setName] = useState(person.name);
  const [lastName, setLastName] = useState(person.lastName);
  const [age, setAge] = useState(person.age);


  //Creacion de funcion para enviar el formulario como solicitud PUT
  const HOST_API = "https://gt7uk3458j.execute-api.us-east-2.amazonaws.com";

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const endpoint = HOST_API + "/personas";
    let body = null;
    let contentType = null;
    const formData = {
      id: id,
      name: name,
      lastName: lastName,
      age: age,
    };

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
      <form onSubmit={handleEditSubmit}>
        <label htmlFor="id">ID</label>
        <input
          type="text"
          id="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="lastName">Apellido</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="age">Edad</label>
        <input
          type="text"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <div className="buttonContainer">
          <button className="buttonAdd" type="submit">
            Enviar información
          </button>
        </div>
      </form>
    </div>
    
  );
};

export default Edit;
