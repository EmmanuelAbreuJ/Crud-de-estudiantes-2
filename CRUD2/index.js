import readline from 'readline';
import { agregarRegistro, obtenerRegistros, eliminarRegistro, buscarRegistro } from './estudiantes.js';
import { listarRegistros, calcularPromedioPorRegistro, filtrarPorNota, registrosPorAsignatura, promedioGeneral, rankingRegistros, reporteDesempeño } from './modules-reportes.js';

const interfaz = readline.createInterface({ input: process.stdin, output: process.stdout });

const mostrarMenu = () => {
    console.log('\n1. Agregar registro');
    console.log('2. Listar registros');
    console.log('3. Mostrar promedios');
    console.log('4. Buscar registro');
    console.log('5. Filtrar por promedio');
    console.log('6. Aprobados/Reprobados por asignatura');
    console.log('7. Promedio general del grupo');
    console.log('8. Ranking de registros');
    console.log('9. Reporte de desempeño');
    console.log('10. Eliminar registro');
    console.log('11. Salir');
    interfaz.question('\nElige una opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                interfaz.question('Nombre: ', (nombre) => {
                    interfaz.question('Especialidad: ', (especialidad) => {
                        interfaz.question('¿Cuántas asignaturas tiene el registro? ', (numAsignaturas) => {
                            const notas = {};
                            let contadorAsignaturas = 0;

                            const preguntarAsignatura = () => {
                                if (contadorAsignaturas < Number(numAsignaturas)) {
                                    interfaz.question(`Ingrese la nota para la asignatura ${contadorAsignaturas + 1}: `, (nota) => {
                                        interfaz.question(`Ingrese el nombre de la asignatura ${contadorAsignaturas + 1}: `, (asignatura) => {
                                            notas[asignatura] = Number(nota);
                                            contadorAsignaturas++;
                                            preguntarAsignatura();
                                        });
                                    });
                                } else {
                                    agregarRegistro({ id: Date.now(), nombre, especialidad, notas });
                                    console.log('Registro agregado!');
                                    mostrarMenu();
                                }
                            };
                            preguntarAsignatura();
                        });
                    });
                });
                break;
            case '2':
                console.log(listarRegistros());
                mostrarMenu();
                break;
            case '3':
                console.log(calcularPromedioPorRegistro());
                mostrarMenu();
                break;
            case '4':
                interfaz.question('Ingrese ID o nombre: ', (id) => {
                    console.log(buscarRegistro(id));
                    mostrarMenu();
                });
                break;
            case '5':
                interfaz.question('Ingrese umbral: ', (umbral) => {
                    console.log(filtrarPorNota(Number(umbral)));
                    mostrarMenu();
                });
                break;
            case '6':
                interfaz.question('Ingrese asignatura: ', (asignatura) => {
                    console.log(registrosPorAsignatura(asignatura));
                    mostrarMenu();
                });
                break;
            case '7':
                console.log(promedioGeneral());
                mostrarMenu();
                break;
            case '8':
                console.log(rankingRegistros());
                mostrarMenu();
                break;
            case '9':
                console.log(reporteDesempeño());
                mostrarMenu();
                break;
            case '10':
                interfaz.question('ID del registro a eliminar: ', (id) => {
                    eliminarRegistro(Number(id));
                    console.log('Registro eliminado!');
                    mostrarMenu();
                });
                break;
            case '11':
                interfaz.close();
                break;
            default:
                console.log('Opción inválida.');
                mostrarMenu();
        }
    });
};

mostrarMenu();