import {FlatList, View, Text, TouchableHighlight, StyleSheet, Alert} from "react-native";
import CitaCard from "../components/CitaCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Colors from "../utils/Colors";
import {eliminarCita, guardarCita, obtenerCitas} from "../services/CitasService";


const Inicio = () => {
    const [citas, setCitas] = useState([]);


    useEffect(() => {
        const cargarDatos = async () => {
            const citasStorage = await obtenerCitas();
            setCitas(citasStorage);
        }
        cargarDatos();
    }, []);


    return(
        <View style={styles.container}>
                <Text style={styles.titulo}>Lista de citas</Text>
                <TouchableHighlight style={styles.boton}>
                    <Text style={styles.boton_texto}>Crear nueva Cita</Text>
                </TouchableHighlight>

                {/*no hay citas, mostrar mensaje de error*/} 
                {citas.length === 0 ? <Text style={styles.error}>No hay citas registradas</Text> : (

                    //Si hay citas, mostrar lista de citas
                    <FlatList
                        renderItem={({item}) => <CitaCard item={item} eliminarCita={(id) =>eliminarCita(id, setCitas)}/>}
                        data={citas}
                        keyExtractor={(item, index) => index.toString()}
                    />

                )}
        </View>
    )
}

export default Inicio;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    titulo: {
        fontSize: 20,
        textAlign: 'center',
        padding: 20,
    },
    boton:{
        backgroundColor: Colors.COLOR_PRIMARY,
        marginHorizontal: 15,
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    boton_texto :{
        textAlign: 'center',
        color: 'white',
    },
    error: {
        fontSize: 20,
        textAlign: 'center',
        color: 'red',
    }
})
