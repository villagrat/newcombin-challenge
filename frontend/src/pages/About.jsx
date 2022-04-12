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
        HTTP, <code>react-icons</code> para traer unos Iconos de FontAwesome, y{' '}
        <code>react-toastify</code> para los popups al crear items y/o mostrar
        errores al usuario
      </p>
      <p className='about-mt'>
        Por último, comprobamos haber cumplido con los requisitos pedidos usando{' '}
        <code>cypress</code> como framework de testing end-to-end. Los tests
        escritos se pueden encontrar en el directorio{' '}
        <code>/frontend/cypress/integration/test-suite/</code>
      </p>
      <p className='about-mt'>
        Las instrucciones para correr el suite de tests están detalladas en el
        <code>README.md</code> del{' '}
        <a href='https://github.com/villagrat/newcombin-challenge'>proyecto</a>
      </p>
    </>
  );
}

export default About;
