import { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import Spinner from './Spinner';
import { toast } from 'react-toastify';

function PersonForm() {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    ssn: '',
  });

  // destructure
  const { firstName, lastName, address, ssn } = formData;

  // handle form data change event
  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // reset form state
  const clearFormData = () => {
    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      ssn: '',
    });
  };

  // allow only digits to be typed in 'ssn' field w/ some regex
  const checkInput = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setFormData((prevState) => ({
      ...prevState,
      ['ssn']: onlyDigits,
    }));
  };

  // disablear el btn de submit si no se cumplen las validaciones previas
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // minimo de largo en el input de Nombre, Apellido, Direccion
    if (
      firstName.trim().length < 1 ||
      lastName.trim().length < 1 ||
      address.trim().length < 1
    ) {
      setIsLoading(false);
      toast.error(
        'Nombre, Apellido y Dirección deben tener por lo menos dos letras'
      );
      return;
    }
    // validacion de formato correcto ssn
    else if (ssn.trim().length !== 9) {
      setIsLoading(false);
      toast.error('SSN incorrecto');
      return;
    }

    try {
      // si llegaron 9 numeros en 'ssn'
      // aplicar formato correcto para SSN antes de enviar al servidor
      let formattedSsn = ssn.replace(/^(\d{3})(\d{2})(\d{4})$/, '$1-$2-$3');
      await axios.post('http://localhost:8081/api/members', {
        firstName,
        lastName,
        address,
        ssn: formattedSsn,
      });
      setIsLoading(false);
      clearFormData();
      toast.success('Persona agregada exitosamente!');
      return;
    } catch (error) {
      setIsLoading(false);
      clearFormData();
      toast.error('Ocurrió un error al tratar de cargar la persona al sistema');
      return;
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Cargar persona al sistema</h3>
        <p>Llene los datos requeridos en el formulario</p>

        <div className='form-group'>
          <label htmlFor='firstName'>Nombre</label>
          <input
            type='text'
            id='firstName'
            value={firstName}
            onChange={onMutate}
            placeholder='Nombre'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Apellido</label>
          <input
            type='text'
            id='lastName'
            value={lastName}
            onChange={onMutate}
            placeholder='Apellido'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='address'>Dirección</label>
          <input
            type='text'
            id='address'
            value={address}
            onChange={onMutate}
            placeholder='Dirección'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='ssn'>Social Security Number</label>
          <input
            type='text'
            id='ssn'
            value={ssn}
            onChange={checkInput}
            placeholder='XXX-XX-XXXX'
            required
          />
        </div>
        <div className='form-group'>
          <Button
            type='submit'
            isDisabled={btnDisabled}
            innerText='Submit'
          ></Button>
          <button className='btn btn-block btn-reverse' onClick={clearFormData}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm;
