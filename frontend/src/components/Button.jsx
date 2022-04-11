function Button({ type, isDisabled, innerText }) {
  return (
    <button type={type} disabled={isDisabled} className='btn btn-block'>
      {innerText}
    </button>
  );
}

export default Button;
