import React, { useState } from 'react';
import CitaForm from '../components/CitaForm';
import shortid from "react-id-generator";
import { Alert } from 'react-native';
import { guardarCita } from '../services/CitaService';
import { validarEntrada, validarFechaModelo } from '../utils/validations';
import { navegarInicio } from '../utils/validations';

const AgendarCita = ({navigation, citas, setCitas}) => {

    //Estado para guardar la cita
    const [cita, setCita] = useState({
        fecha: new Date(),
        hora: new Date(),
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
        const validacion = validarEntrada(cita, citas);
        if (validacion.status === false) {
            Alert.alert("Error", validacion.message);
            return;
        }

        //Validar si ya existe una cita con la misma fecha y hora o incluso, con el mismo modelo de vehiculo
        validarFechaModelo(cita, citas);

        //Id aleatorio para una cita
        const nuevaCita = {
            ...cita,
            id: shortid()
        }

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