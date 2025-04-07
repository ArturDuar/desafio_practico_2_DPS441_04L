import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import Colors from '../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatearFecha, formatearHora } from '../utils/format';

const CitaForm = ({ cita, handleChange, handleSubmit, handleExit, titulo}) => {
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);

    return(
        <ScrollView>
            <View style={styles.container}>
            <Text style={styles.titulo}>{titulo}</Text>

            <Text style={styles.label}>Seleccionar fecha</Text>
            <TouchableHighlight onPress={() => setDatePickerVisible(true)} style={styles.input}>
                <Text style={styles.datetime}>{cita.fecha ? formatearFecha(cita.fecha) : "Seleccionar fecha"}</Text>
            </TouchableHighlight>
        
            {/*mostrar modal de datepicker solo cuando se presiona el boton*/}
            {isDatePickerVisible && (
                <DateTimePicker
                    value={new Date(cita.fecha) || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setDatePickerVisible(false);
                        if (event.type === 'set' && selectedDate) {
                            const horaSeleccionada = new Date(cita.hora);
                            const nuevaFecha = new Date(selectedDate);
                            nuevaFecha.setHours(horaSeleccionada.getHours(), horaSeleccionada.getMinutes(), horaSeleccionada.getSeconds(), horaSeleccionada.getMilliseconds());
                            handleChange(nuevaFecha, 'fecha');
                        }
                    }}
                    minimumDate={new Date()} // Fecha mínima es hoy
                />
            )}
            
            <Text style={styles.label}>Seleccionar hora</Text>
            <TouchableHighlight onPress={() => setTimePickerVisible(true)} style={styles.input}>
                <Text style={styles.datetime}>{cita.hora ? formatearHora(cita.hora) : "Seleccionar hora"}</Text>
            </TouchableHighlight>
            
            {/*mostrar modal de timepicker solo cuando se presiona el boton*/}
            {isTimePickerVisible && (
                <DateTimePicker
                    value={new Date(cita.hora) || new Date()}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                        setTimePickerVisible(false);
                    
                        if (event.type === 'set' && selectedTime) {
                            const fechaSeleccionada = new Date(cita.fecha);
                            fechaSeleccionada.setHours(selectedTime.getHours(), selectedTime.getMinutes(), selectedTime.getSeconds(), selectedTime.getMilliseconds());
                            handleChange(fechaSeleccionada, 'hora');
                        }
                    }}
                    minimumDate={new Date()} // Hora mínima es la hora actual
                />
            )}

            <Text style={styles.label}>Nombre del cliente</Text>
            <TextInput 
            style={styles.input} 
            value={cita.cliente}
            placeholder="Cliente" 
            onChangeText={(text) => handleChange(text, 'cliente')}
            />

            <Text style={styles.label}>Modelo de vehiculo</Text>
            <TextInput 
            style={styles.input} 
            value={cita.modelo_vehiculo}
            placeholder="Modelo de vehiculo" 
            onChangeText={(text) => handleChange(text, 'modelo_vehiculo')}/>

            <Text style={styles.label}>Descripcion</Text>
            <TextInput 
            style={styles.input} 
            value={cita.descripcion}
            placeholder="Descripción (Opcional)" 
            onChangeText={(text) => handleChange(text, 'descripcion')}/>

            <View style={styles.boton_container}>
                <TouchableHighlight style={styles.boton} onPress={() => handleSubmit()}>
                    <Text style={styles.boton_texto}>Guardar</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.boton_cancelar} onPress={() => handleExit()}>
                    <Text style={styles.boton_texto}>Cancelar</Text>
                </TouchableHighlight>
            </View>
            

        </View>
        </ScrollView>
    )
}

export default CitaForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    titulo: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: 'bold',
    }, 
    datetime: {
        fontWeight: '700',
        textAlign: 'left'
    },
    input: {
        marginHorizontal: 10,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        maxWidth: '100%',
        justifyContent: 'center',
        fontWeight: '700'
    },
    boton_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    boton: {
        backgroundColor: Colors.COLOR_PRIMARY,
        padding: 10,
        borderRadius: 5,
        width: '40%',
    },
    boton_texto: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white'
    },
    boton_cancelar: {
        width: '40%',
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        paddingLeft: 10,
    },
});