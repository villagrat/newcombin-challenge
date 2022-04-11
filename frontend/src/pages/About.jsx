function About() {
  return (
    <>
      <h1>NewCombin React Challenge</h1>
      <p className='about-mt'>
        Este proyecto fue desarrollado como parte del proceso de selección como
        dev React para NewCombin.
      </p>
      <p className='about-mt'>
        Como dependencias, instalamos <code>react-router-dom</code> para manejar
        la navegación en la página, <code>axios</code> para hacer los requests
        HTTPS, <code>react-icons</code> para traer unos Iconos de FontAwesome, y{' '}
        <code>react-toastify</code> para los popups al crear items y/o mostrar
        errores al usuario
      </p>
    </>
  );
}

export default About;
