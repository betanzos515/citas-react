import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'; //con esta linea se documenta el componente

export const Formulario = ({crearCita}) => {
    
    //crear State de citas 
    const initialState = {
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    }
    const [ cita, setActualizarCita ] = useState( initialState )

    const [ error, actualizarError ] = useState(false);

    const handleChange = ( e )=>{
        setActualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    const { mascota, propietario, fecha, hora, sintomas } = cita;

    const submitCita = ( e )=>{
        e.preventDefault();

        //validar
        if( mascota.trim() === '' || propietario.trim() === '' || fecha === '' || hora === '' || sintomas.trim() === '' ){
            actualizarError(true);
            return;
        }
        
        //asignar un ID
        actualizarError(false);
        cita.id = uuidv4();
        console.log(cita);

        //crear la cita
        crearCita(cita);

        //reiniciar el form
        setActualizarCita(initialState);
    }

    return (
        <>
            <h2>Crear Cita</h2>
            { error ? 
                <p className='alerta-error' >Todos los campos son obligatorios</p> 
              : null
            }
            <form onSubmit={submitCita}>
                <label>Nombre mascota</label>
                <input
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    onChange={handleChange}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre Dueño de la mascota'
                    onChange={handleChange}
                    value={propietario}
                />
                <label>Fecha</label>
                <input
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    onChange={handleChange}
                    value={fecha}
                />
                <label>Hora</label>
                <input
                    type='time'
                    name='hora'
                    className='u-full-width'
                    onChange={handleChange}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    className='u-full-width'
                    name='sintomas'
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>
                
                <button
                    type='submit'
                    className='u-full-width button-primary'
                    onClick={submitCita}
                >Agregar Cita</button>
                
            </form>
        </>
    )
}

//La configuracion de los propTypes se establecen como un objeto.
Formulario.propTypes = {
    crearCita : PropTypes.func.isRequired
}