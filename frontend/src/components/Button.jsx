function Button({ type, isDisabled, innerText }) {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className='btn btn-block'
      title={
        isDisabled ? 'Revisá los datos a ingresar en el formulario' : 'Enviar'
      }
    >
      {innerText}
    </button>
  );
}

export default Button;
