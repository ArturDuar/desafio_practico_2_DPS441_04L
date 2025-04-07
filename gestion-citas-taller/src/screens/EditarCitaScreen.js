
import React, {useEffect, useState} from 'react';
import {Alert} from "react-native";
import {navegarInicio, validarEntrada, validarFechaModelo} from "../utils/validations";
import {editarCita, obtenerCitas} from "../services/CitaService";
import CitaForm from "../components/CitaForm";

const EditarCita = ({navigation, citas, setCitas, route}) => {
    const { item } = route.params;

    useEffect(() => {
        const cargarDatos = async () => {
            const citasStorage = await obtenerCitas();
            if (Array.isArray(citasStorage)) {
                const citaActual = citasStorage.find(cita => cita.id === item.id);
                setCita(citaActual);
            }
        }
        cargarDatos();
    }, []);

    //Estado para guardar la cita
    const [cita, setCita] = useState({
        id: "",
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
        if (validarFechaModelo(cita, citas).status === false) {
            Alert.alert("Error", validarFechaModelo(cita, citas).message);
            return;
        }

        console.log(validarFechaModelo(cita, citas).message)
        
        //guardar en el Async Storage y actualizar estado global de citas
        editarCita(cita, setCitas, navigation)
    }

    return(
        <CitaForm titulo="Editar Cita" handleExit={() => navegarInicio(navigation)} handleChange={handleChange} handleSubmit={handleSubmit} cita={cita} setCita={setCita}/>
    )
}

export default EditarCita;