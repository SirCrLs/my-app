export default function Alumno({ alumno, onToggle }) {
  return (
    <tr className="border-b border-gray-200">
      <td className="p-3">{alumno.nombre}</td>
      <td className="p-3">{alumno.apellido}</td>
      <td className="p-3">
        <span className={alumno.regular ? "text-green-600" : "text-red-600"}>
          {alumno.regular ? "Regular" : "Inactivo"}
        </span>
      </td>
      <td className="p-3">
        <input
          type="checkbox"
          checked={alumno.regular}
          onChange={() => onToggle(alumno.id)}
        />
      </td>
    </tr>
  );
}