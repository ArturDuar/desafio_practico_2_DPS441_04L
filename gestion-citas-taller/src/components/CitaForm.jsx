import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import Colors from '../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatearFecha, formatearHora } from '../utils/format';

const CitaForm = ({ cita, handleChange, handleSubmit, handleExit, titulo}) => {
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>{titulo}</Text>

            <Text style={styles.label}>Seleccionar fecha</Text>
            <TouchableHighlight onPress={() => setDatePickerVisible(true)}>
                <Text style={styles.input}>{cita.fecha ? formatearFecha(cita.fecha) : "Seleccionar fecha"}</Text>
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
            <TouchableHighlight onPress={() => setTimePickerVisible(true)}>
                <Text style={styles.input}>{cita.hora ? formatearHora(cita.hora) : "Seleccionar hora"}</Text>
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

            <Text>Nombre del cliente</Text>
            <TextInput 
            style={styles.input} 
            value={cita.cliente}
            placeholder="Cliente" 
            onChangeText={(text) => handleChange(text, 'cliente')}
            />

            <Text>Modelo de vehiculo</Text>
            <TextInput 
            style={styles.input} 
            value={cita.modelo_vehiculo}
            placeholder="Modelo de vehiculo" 
            onChangeText={(text) => handleChange(text, 'modelo_vehiculo')}/>

            <Text>Descripcion</Text>
            <TextInput 
            style={styles.input} 
            value={cita.descripcion}
            placeholder="Descripcion" 
            onChangeText={(text) => handleChange(text, 'descripcion')}/>

            <TouchableHighlight style={styles.boton} onPress={() => handleSubmit()}>
                <Text style={styles.boton_texto}>Guardar</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.boton_cancelar} onPress={() => handleExit()}>
                <Text style={styles.boton_texto}>Cancelar</Text>
            </TouchableHighlight>

        </View>
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
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    boton: {
        backgroundColor: Colors.COLOR_PRIMARY,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    boton_texto: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white'
    },
    boton_cancelar: {
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