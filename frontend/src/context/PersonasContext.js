import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PersonasContext = createContext();

export const PersonasProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [listaPersonas, setListaPersonas] = useState([]);

  useEffect(() => {
    fetchPersonas();
  }, [listaPersonas.length]);

  // Fetch personas de la API
  const fetchPersonas = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/members');

      setListaPersonas(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error('Error:' + error.response.data.message);
    }
  };

  // Cargar persona al sistema
  const addPersona = async (nuevaPersona) => {
    // destructure nuevaPersona properties
    const { firstName, lastName, address, ssn } = nuevaPersona;
    try {
      // si llegaron 9 numeros en 'ssn'
      // aplicar formato correcto para SSN antes de enviar al servidor con grupos de captura de regex
      let formattedSsn = ssn.replace(/^(\d{3})(\d{2})(\d{4})$/, '$1-$2-$3');
      const response = await axios.post('http://localhost:8081/api/members', {
        firstName,
        lastName,
        address,
        ssn: formattedSsn,
      });
      console.log(response.data);

      setListaPersonas([response.data, ...listaPersonas]);
      setIsLoading(false);
      toast.success('Persona agregada exitosamente!');
      return;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error('Error:' + error.response.data.message);
      return;
    }
  };

  return (
    <PersonasContext.Provider
      value={{
        isLoading,
        listaPersonas,
        fetchPersonas,
        addPersona,
      }}
    >
      {children}
    </PersonasContext.Provider>
  );
};

export default PersonasContext;
