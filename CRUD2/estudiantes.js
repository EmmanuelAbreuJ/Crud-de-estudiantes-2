import fs from 'fs';

const RUTA_ARCHIVO = './data.json';

const leerRegistros = () => {
    if (!fs.existsSync(RUTA_ARCHIVO)) return [];
    const data = fs.readFileSync(RUTA_ARCHIVO, 'utf8');
    return JSON.parse(data);
};

const guardarRegistros = (registros) => fs.writeFileSync(RUTA_ARCHIVO, JSON.stringify(registros, null, 2), 'utf8');

export const agregarRegistro = (nuevoRegistro) => {
    const registros = leerRegistros();
    registros.push(nuevoRegistro);
    guardarRegistros(registros);
};

export const obtenerRegistros = () => leerRegistros();

export const buscarRegistro = (id) => leerRegistros().find(reg => reg.id === id || reg.nombre.toLowerCase() === id.toLowerCase());

export const actualizarRegistro = (id, datosActualizados) => {
    let registros = leerRegistros();
    registros = registros.map(reg => reg.id === id ? { ...reg, ...datosActualizados } : reg);
    guardarRegistros(registros);
};

export const eliminarRegistro = (id) => {
    let registros = leerRegistros();
    registros = registros.filter(reg => reg.id !== id);
    guardarRegistros(registros);
};
