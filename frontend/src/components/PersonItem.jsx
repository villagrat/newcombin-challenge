function PersonItem({ person }) {
  return (
    <div className='person'>
      <div className='person-info'>{person.firstName}</div>
      <div className='person-info'>{person.lastName}</div>
      <div className='person-info'>{person.address}</div>
      <div className='person-info'>{person.ssn}</div>
    </div>
  );
}

export default PersonItem;
