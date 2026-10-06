export function esVisible(alumno, mostrarReprobados, busqueda) {
  const aprobado = Number(alumno.calificacion) >= 70;
  if (!mostrarReprobados && !aprobado) return false;

  const texto = busqueda.trim().toLowerCase();
  if (!texto) return true;

  return `${alumno.nombre} ${alumno.apellido}`.toLowerCase().includes(texto);
}