import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Colors from "../utils/Colors";

const CitaCard = ({item, eliminarCita}) =>{
    return(
        <View style={styles.card}>
            <View style={styles.horafecha}>

                <View style={styles.fecha}>
                    <Text style={styles.label_hora_fecha}>Fecha</Text>
                    <Text style={styles.fecha_hora_dato} >{item.fecha}</Text>
                </View>

                <View style={styles.hora}>
                    <Text style={styles.label_hora_fecha}>Hora</Text>
                    <Text style={styles.fecha_hora_dato}>{item.hora}</Text>
                </View>
            </View>
            <View style={styles.grupo_dato}>
                <Text style={styles.label}>Nombre del cliente</Text>
                <Text style={styles.dato}>{item.cliente}</Text>
            </View>
            <View style={styles.grupo_dato}>
                <Text style={styles.label}>Modelo del vehículo</Text>
                <Text style={styles.dato}>{item.modelo_vehiculo}</Text>
            </View>
            <View style={styles.grupo_dato}>
                <Text style={styles.label}>Descripcion</Text>
                <Text style={styles.dato}>{item.descripcion}</Text>
            </View>
            <TouchableHighlight style={styles.boton} onPress={()=> eliminarCita(item.id)}>
                <Text style={styles.boton_texto}>Eliminar Cita</Text>
            </TouchableHighlight>
        </View>
    )
}

export default CitaCard;


const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.COLOR_SECONDARY,
        margin: 15,
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horafecha: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        backgroundColor: 'rgb(250,249,249)',
        marginBottom: 20,
        borderRadius: 2.5,

    },
    hora: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fecha: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    grupo_dato : {
        flexDirection: 'row',
        gap: 20,
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 0.5
    },
    dato: {
        flex: 2,
        textAlign: 'left',
    },
    label :{
        flex: 1,
        textAlign: 'right',
    },
    label_hora_fecha: {
        fontSize: 15,
    },
    fecha_hora_dato:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    boton:{
        backgroundColor: Colors.COLOR_TERCIARY,
        marginVertical: 15,
        borderRadius: 10,
        padding: 15,
    },
    boton_texto :{
        textAlign: 'center',
        color: 'white',
        fontWeight: '600',
    }
})