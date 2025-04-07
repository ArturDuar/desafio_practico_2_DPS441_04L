import {Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {navegarInicio} from "../utils/validations";

export const obtenerCitas = async () =>{
    try{
        
        const citas = await AsyncStorage.getItem('citas');
        return citas ? JSON.parse(citas) : [];
    } catch (error) {
        console.log(error);
    }
}

export const guardarCita = async (citas, setCitas) => {
        try {
            await AsyncStorage.setItem('citas', JSON.stringify(citas));
            const actualizarCitas = await obtenerCitas();
            setCitas(actualizarCitas);
        } catch (error) {
            console.log(error);
        }

}

export const eliminarCita = (cita, setCitas) => {
    Alert.alert(
        "Eliminar",
        "¿Deseas eliminar esta cita?",
        [
            {
                text: "Cancelar",
                onPress: () => console.log("Cancelado"),
                style: "cancel",
            },
            {
                text: "OK",
                onPress: () => {
                    obtenerCitas().then((citas) => {
                        console.log("Cita Eliminada que será eliminada", citas.filter((item) => item.id === cita.id));
                        console.log(citas.filter((item) => item.id === cita.id));
                        const nuevasCitas = citas.filter((item) => item.id !== cita.id);
                        guardarCita(nuevasCitas, setCitas);
                        setCitas(nuevasCitas);
                    });
                    
                    console.log(`Cita Eliminada ${cita.id}`);

                },
            },
        ]
    );
}

export const editarCita = (cita, setCitas, navigation) => {
    Alert.alert(
        "Editar",
        "¿Deseas editar esta cita?",
        [
            {
                text: "Cancelar",
                onPress: () => console.log("Cancelado"),
                style: "cancel",
            },
            {
                text: "OK",
                onPress: () => {
                    obtenerCitas().then((citas) => {
                        const nuevasCitas = citas.map((item) => 
                            item.id === cita.id ? cita : item
                        );
                        guardarCita(nuevasCitas, setCitas);
                        setCitas(nuevasCitas);
                    });
                    console.log(`Cita Editada ${cita.id}`);
                    navegarInicio(navigation);

                },
            },
        ]
    );
}
