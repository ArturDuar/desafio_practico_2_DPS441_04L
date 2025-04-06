import {Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const obtenerCitas = async () =>{
    try{
        const citas = await AsyncStorage.getItem('citas');
        return citas ? JSON.parse(citas) : [];
    } catch (error) {
        console.log(error);
    }

}

export const guardarCita = async (citas) => {
        try {
            await AsyncStorage.setItem('citas', JSON.stringify(citas));

        } catch (error) {
            console.log(error);
        }

}

export const eliminarCita = (citaId, setCitas) => {
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
                        const nuevasCitas = citas.filter((item) => item.id !== citaId);
                        guardarCita(nuevasCitas);
                        setCitas(nuevasCitas);
                    });
                    console.log(`Cita Eliminada ${citaId}`);

                },
            },
        ]
    );
}