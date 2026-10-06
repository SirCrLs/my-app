import Alumno from "./Alumno";
import { esVisible } from "./utils";

export default function Seccion({
  titulo,
  lista,
  onToggle,
  mostrarReprobados,
  busqueda,
}) {
  const visibles = lista.filter((a) =>
    esVisible(a, mostrarReprobados, busqueda)
  );

  return (
    <section className={visibles.length === 0 ? "oculto" : "mb-8"}>
      <h2 className="mb-2 text-xl font-semibold">
        {titulo} ({visibles.length})
      </h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="p-3">Nombre</th>
            <th className="p-3">Apellido</th>
            <th className="p-3">Calificación</th>
            <th className="p-3">Estatus</th>
            <th className="p-3">Regular</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((alumno) => (
            <Alumno
              key={alumno.id}
              alumno={alumno}
              onToggle={onToggle}
              visible={esVisible(alumno, mostrarReprobados, busqueda)}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}