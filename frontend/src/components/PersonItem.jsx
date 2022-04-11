function PersonItem({ person }) {
  return (
    <div className='person'>
      <div>{person.firstName}</div>
      <div>{person.lastName}</div>
      <div>{person.address}</div>
      <div>{person.ssn}</div>
    </div>
  );
}

export default PersonItem;
