import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PersonItem from './PersonItem';
import Spinner from './Spinner';

function PeopleList() {
  const [listaPersonas, setListaPersonas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/members');

      setListaPersonas(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  if (listaPersonas.length === 0) {
    return <p>Todavía no se cargó a nadie al sistema</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='lista-container'>
      <h1 className='lista-header'>Lista de personas cargadas en el sistema</h1>
      <div className='person-headings'>
        <div>Nombre</div>
        <div>Apellido</div>
        <div>Dirección</div>
        <div>SSN</div>
      </div>
      {listaPersonas.map((person) => (
        <PersonItem key={person.ssn} person={person} />
      ))}
    </div>
  );
}

export default PeopleList;
