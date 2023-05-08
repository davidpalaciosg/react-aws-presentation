import React, { useState, useEffect } from 'react';
import Edit from './Edit';

//metodo GET
function Table() {
  const [data, setData] = useState([]);
  
  const HOST_API = "https://gt7uk3458j.execute-api.us-east-2.amazonaws.com";
  const endpoint = HOST_API + "/personas";

  useEffect(() => {
    //Informacion JSON
    renderPersons();
}, );

  const getPersons = async () => {
    const response = await fetch(endpoint);
    return await response.json();
  };

  const renderPersons = async () => {
    const persons = await getPersons();
    setData(persons);
  };

  //Metodo DELETE
  const handleDelete = async (id) => {
    try {
      const deleteEndpoint = endpoint + "/" + id;
      const response = await fetch(deleteEndpoint, {
        method: "DELETE"
      });
      if (response.ok) {
        //getProducts();
      } else {
        throw new Error("Error eliminando el producto");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Metodo PUT
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEditClick = (id) => {
    setSelectedPerson(data.find(item => item.id === id));
    setShowForm(true);
  };
  

  return (
    <div>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th className='buttonColum'>Eliminar</th>
            <th className='buttonColumEdit'>Modificar</th>
          </tr>
        </thead>
        <tbody>
          {data?.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td><button onClick={() => handleDelete(item.id)} className='deleteB'>Eliminar</button></td>
              <td>
                {showForm ? (
                  <button className='modify' disabled>Modificar</button>
                ) : (
                  <button className='modify' onClick={() => handleEditClick(item.id)}>Modificar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className="buttonContainer">
          <Edit person={selectedPerson}/>
        </div>
      )}
    </div>
  );
}

export default Table;