import { buscarCitaValidar } from "../services/CitaService";
import { formatearFecha, formatearHora } from "./format";

export const validarNombre = (nombre) => {
    //Comprobamos si tiene al menos 3 caracteres y si solo son letras
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
    return regex.test(nombre);
}

export const validarHora = (hora) => {
    const fechaHora = new Date(hora);
    const ahora = new Date();

    // Comparamos si la fechaHora es menor a ahora
    if (fechaHora > ahora) {
        return true;
    } else {
        return false;
    }
}

//metodo para validar si la fecha y hora de la cita ya existe en el asyn storage
export const validarFechaModelo = (cita, citas) => {
   
    const fecha = formatearFecha(cita.fecha);
    const hora = formatearHora(cita.hora);

    const citasExistentes = citas.filter(item=> item.id !== cita.id)

    for (const item of citasExistentes) {
        const fechaItem = formatearFecha(item.fecha);
        const horaItem = formatearHora(item.hora);

        if (fechaItem === fecha && horaItem === hora && item.modelo_vehiculo === cita.modelo_vehiculo) {
            return { status: false, message: "Ya hay una cita a esa fecha y hora con ese modelo de vehiculo" };
        } else if (fechaItem === fecha && horaItem === hora) {
            return { status: false, message: "Ya hay una cita a esa fecha y hora" };
        }
    }

    return { status: true, message: "No hay conflictos" };
    // Si no hay conflictos, devuelve status: true
};

export const validarEntrada = (cita) => {
    if (cita.fecha === null || cita.hora === null || cita.cliente === "" || cita.modelo_vehiculo === "") {
        return { status: false, message: "Rellena los campos correctamente" };
    }

    //Validar si el nombre del cliente es valido
    if (!validarNombre(cita.cliente)) {
        return { status: false, message: "El nombre del cliente no es valido" };
    }

    //Validar si la hora es posterior a la hora actual
    if (!validarHora(cita.hora)) {
        return { status: false, message: "La hora no es valida, debe ser posterior a la hora actual" };
    }

    return { status: true, message: "Entrada valida" };
}

export const navegarInicio = (navigation) => {
    navigation.reset({
        index: 0,
        routes: [{ name: 'Inicio' }],
    });
}