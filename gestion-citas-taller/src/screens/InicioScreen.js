import {FlatList, View, Text, TouchableHighlight, StyleSheet, Alert} from "react-native";
import CitaCard from "../components/CitaCard";
import { useEffect} from 'react';
import Colors from "../utils/colors";
import {eliminarCita, obtenerCitas} from "../services/CitaService";


const Inicio = ({navigation, citas, setCitas}) => {

    useEffect(() => {
        const cargarDatos = async () => {
            const citasStorage = await obtenerCitas();
            if (Array.isArray(citasStorage)) {
                setCitas((citasStorage));
            }
        }
        cargarDatos();
    }, []);


    return(
        <View style={styles.container}>
                <Text style={styles.titulo}>Lista de citas</Text>
                <TouchableHighlight style={styles.boton} onPress={() => navigation.navigate('Crear Cita')}>
                    <Text style={styles.boton_texto}>Crear nueva Cita</Text>
                </TouchableHighlight>

                {/*no hay citas, mostrar mensaje de error*/} 
                {citas.length === 0 ? <Text style={styles.error}>No hay citas registradas</Text> : (

                    //Si hay citas, mostrar lista de citas
                        <FlatList
                        contentContainerStyle={styles.lista}
                        renderItem={({item}) => <CitaCard item={item} eliminarCita={(id) =>eliminarCita(id, setCitas)} navigation={navigation}/>}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    lista: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    titulo: {
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold',
    },
    boton:{
        backgroundColor: Colors.COLOR_PRIMARY,
        marginHorizontal: 15,
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        width: '60%'
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
