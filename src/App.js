import { useEffect, useState } from 'react';
import { Cita } from './components/Cita';
import { Formulario } from './components/Formulario';
import './index.css';
export const App = () => {
  const key = 'citas';

  const obtenerCitasStorage = ()=>{
    
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  
    if(!citasIniciales){
      citasIniciales = [];
    }
    return citasIniciales;
  }
  
  const [citas, guardarCitas] = useState(obtenerCitasStorage());
  useEffect(() => {
    localStorage.setItem(key,JSON.stringify(citas));
  }, [citas])

  //funcion para almacenar citas
  const crearCita = cita =>{
    console.log(cita);
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //funcion que elimina una cita
  const eliminarCita = id =>{
  const nuevasCitas = citas.filter( cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  return (
    <>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className='row'>
          <div className='one-half column'>  
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className='one-half column'>
            {
              (citas.length > 0) ? <h2> Administra tus citas </h2> : <h2> No existen citas </h2>
            }
            {
              citas.map(cita=>(
                <Cita
                  key={cita.id}   
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))
            }
          </div>
        </div>

      </div>
    </>
  )
}
