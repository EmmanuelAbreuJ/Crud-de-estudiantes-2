import { obtenerRegistros } from './estudiantes.js';

export const listarRegistros = () => obtenerRegistros().map(({ nombre, especialidad }) => ({ nombre, especialidad }));

export const calcularPromedioPorRegistro = () => obtenerRegistros().map(({ nombre, especialidad, notas }) => {
    const notasArray = Object.values(notas);
    const promedio = notasArray.reduce((a, b) => a + b, 0) / notasArray.length;
    return { nombre, promedio, especialidad };
});

export const filtrarPorNota = (umbral) => calcularPromedioPorRegistro().filter(reg => reg.promedio > umbral);

export const registrosPorAsignatura = (asignatura) => {
    const registros = obtenerRegistros();
    return {
        aprobados: registros.filter(reg => reg.notas[asignatura] >= 60),
        reprobados: registros.filter(reg => reg.notas[asignatura] < 60)
    };
};

export const promedioGeneral = () => {
    const registros = calcularPromedioPorRegistro();
    const promedio = registros.reduce((acc, reg) => acc + reg.promedio, 0) / registros.length;
    return { promedioGeneral: promedio };
};

export const rankingRegistros = () => calcularPromedioPorRegistro().sort((a, b) => b.promedio - a.promedio);

export const reporteDesempeño = () => {
    const registros = calcularPromedioPorRegistro();
    return {
        totalRegistros: registros.length,
        promedioGeneralGrupo: promedioGeneral().promedioGeneral,
        mejoresRegistros: registros.filter(reg => reg.promedio > 85),
        peoresRegistros: registros.filter(reg => reg.promedio < 60)
    };
};