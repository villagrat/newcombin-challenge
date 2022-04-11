import { useContext, useEffect } from 'react';
import PersonasContext from '../context/PersonasContext';
import { toast } from 'react-toastify';
import PersonItem from './PersonItem';
import Spinner from './Spinner';

function PeopleList() {
  // destructure context
  const { isLoading, listaPersonas } = useContext(PersonasContext);

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
