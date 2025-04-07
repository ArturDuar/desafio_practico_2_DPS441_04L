import React, { useState } from 'react';
import CitaForm from '../components/CitaForm';
import { Alert } from 'react-native';
import { guardarCita } from '../services/CitaService';
import { validarEntrada, validarFechaModelo } from '../utils/validations';
import { navegarInicio } from '../utils/validations';

const AgendarCita = ({navigation, citas, setCitas}) => {

    //Estado para guardar la cita
    const [cita, setCita] = useState({
        fecha: null,
        hora: null,
        cliente: "",
        modelo_vehiculo: "",
        descripcion: ""
    });

    //Metodo para actualizar el estado de la cita
    const handleChange = (text, field) => {
        setCita(prev => ({
            ...prev,
            [field]: text ?? prev[field]
        }));
    };

    //Metodo para guardar la cita
    const handleSubmit = () => {
    
        //Validar si la entrada es valida
        const validacion = validarEntrada(cita);
        if (validacion.status === false) {
            Alert.alert("Error", validacion.message);
            return;
        }

        //Id aleatorio para una cita
        const nuevaCita = {
            ...cita,
            id: Math.random().toString(36).substring(2, 10)
        }

         //Validar si ya existe una cita con la misma fecha y hora o incluso, con el mismo modelo de vehiculo
         if(validarFechaModelo(nuevaCita, citas).status === false){
             Alert.alert("Error", validarFechaModelo(nuevaCita, citas).message);
             return;
         }


                 console.log(validarFechaModelo(nuevaCita, citas).message)


        //guardar en el Array nuevasCitas el nuevo objeto
        const nuevasCitas = [...citas, nuevaCita]; 

        //guardar en el Async Storage y actualizar estado global de citas
        guardarCita(nuevasCitas, setCitas);
        

        //Luego de guardar la cita, se manda a inicio de nuevo
        navegarInicio(navigation);
        
    }
    
    return(
        <CitaForm titulo="Crear nueva Cita" handleExit={() => navegarInicio(navigation)} handleChange={handleChange} handleSubmit={handleSubmit} cita={cita} setCita={setCita}/>
    )
}

export default AgendarCita;