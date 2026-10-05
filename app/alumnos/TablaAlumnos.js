"use client";

import { useState } from "react";
import { alumnosIniciales } from "../../data/alumnos";
import Alumno from "./Alumno";

function Seccion({ titulo, lista, onToggle }) {
  return (
    <section className="mb-8">
      <h2 className="mb-2 text-xl font-semibold">
        {titulo} ({lista.length})
      </h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="p-3">Nombre</th>
            <th className="p-3">Apellido</th>
            <th className="p-3">Estatus</th>
            <th className="p-3">Regular</th>
          </tr>
        </thead>
        <tbody>
          {lista.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-3 text-gray-500">
                No hay alumnos en esta sección.
              </td>
            </tr>
          ) : (
            lista.map((alumno) => (
              <Alumno key={alumno.id} alumno={alumno} onToggle={onToggle} />
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

export default function TablaAlumnos() {
  const [alumnos, setAlumnos] = useState(alumnosIniciales);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [regular, setRegular] = useState(true);

  function handleToggle(id) {
    setAlumnos(
      alumnos.map((a) => (a.id === id ? { ...a, regular: !a.regular } : a))
    );
  }

  function handleAgregar(e) {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim()) return;

    const nuevoAlumno = {
      id: Date.now(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      regular,
    };

    setAlumnos([...alumnos, nuevoAlumno]);
    setNombre("");
    setApellido("");
    setRegular(true);
    setMostrarForm(false);
  }

  const regulares = alumnos.filter((a) => a.regular);
  const irregulares = alumnos.filter((a) => !a.regular);

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {mostrarForm ? "Cancelar" : "Agregar alumno"}
        </button>
      </div>

      {mostrarForm && (
        <form
          onSubmit={handleAgregar}
          className="mb-6 flex flex-col gap-3 rounded-lg border border-gray-200 p-4"
        >
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="rounded border border-gray-300 p-2"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="rounded border border-gray-300 p-2"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={regular}
              onChange={(e) => setRegular(e.target.checked)}
            />
            Alumno regular
          </label>
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Guardar
          </button>
        </form>
      )}

      <Seccion titulo="Alumnos regulares" lista={regulares} onToggle={handleToggle} />
      <Seccion titulo="Alumnos irregulares" lista={irregulares} onToggle={handleToggle} />
    </>
  );
}