import { useState, useEffect } from 'react';
import PersonItem from './PersonItem';
import Spinner from './Spinner';

function PeopleList({ infoPersonas }) {
  const [listaPersonas, setListaPersonas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPersonas();
  }, [infoPersonas]);

  const fetchPersonas = async () => {
    const response = await fetch('http://localhost:8081/api/members');
    const data = await response.json();

    setListaPersonas(data);
    setIsLoading(false);
  };

  if (listaPersonas.length === 0) {
    return <p>Todavía no se cargó a nadie al sistema</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
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
