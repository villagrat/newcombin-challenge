import { useState, useEffect, useContext } from 'react';
import PersonasContext from '../context/PersonasContext';
import Button from './Button';
import Spinner from './Spinner';
import { toast } from 'react-toastify';

function PersonForm() {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    ssn: '',
  });

  // destructure form data
  const { firstName, lastName, address, ssn } = formData;
  // destructure context
  const { isLoading, addPersona } = useContext(PersonasContext);

  // handle form data change event
  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // allow only digits to be typed in 'ssn' field using regex
  const checkInput = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, '');
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: onlyDigits,
    }));
  };

  // on form state change, check conditions to enable btn
  useEffect(() => {
    checkIfEnableBtn();
    // eslint-disable-next-line
  }, [onMutate, checkInput]);
  // disable submit btn if any of the previous validations fail
  const checkIfEnableBtn = () => {
    if (
      firstName.trim().length >= 2 &&
      lastName.trim().length >= 2 &&
      address.trim().length >= 2 &&
      ssn.trim().length === 9
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };

  // reset form state
  const clearFormData = () => {
    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      ssn: '',
    });
    setBtnDisabled(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // estos chequeos solo son salvaguardas para no enviar una mala request a la API
    // minimo de largo en el input de Nombre, Apellido, Direccion
    if (
      firstName.trim().length < 1 ||
      lastName.trim().length < 1 ||
      address.trim().length < 1
    ) {
      toast.error(
        'Nombre, Apellido y Direcci??n deben tener por lo menos dos letras'
      );
      return;
    }
    // validacion de formato correcto ssn
    else if (ssn.trim().length !== 9) {
      toast.error('SSN incorrecto');
      return;
    }

    addPersona(formData);

    // resetear estado del form
    clearFormData();
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
          <label htmlFor='address'>Direcci??n</label>
          <input
            type='text'
            id='address'
            value={address}
            onChange={onMutate}
            placeholder='Direcci??n'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='ssn'>
            Social Security Number - (solamente n??meros)
          </label>
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
          <button
            className='btn btn-block btn-reverse'
            onClick={clearFormData}
            title='Borrar datos del formulario'
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonForm;
