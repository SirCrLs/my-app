"use client";

import { useState } from "react";
import { alumnosIniciales } from "../../data/alumnos";
import Campo from "./Campo";
import Seccion from "./Seccion";
import { esVisible } from "./utils";

export default function TablaAlumnos() {
  const [alumnos, setAlumnos] = useState(alumnosIniciales);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [regular, setRegular] = useState(true);
  const [mostrarReprobados, setMostrarReprobados] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  function handleToggle(id) {
    setAlumnos(
      alumnos.map((a) => (a.id === id ? { ...a, regular: !a.regular } : a))
    );
  }

  function handleAgregar(e) {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim() || calificacion === "") return;

    const nuevoAlumno = {
      id: Date.now(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      calificacion: Number(calificacion),
      regular,
    };

    setAlumnos([...alumnos, nuevoAlumno]);
    setNombre("");
    setApellido("");
    setCalificacion("");
    setRegular(true);
    setMostrarForm(false);
  }

  const regulares = alumnos.filter((a) => a.regular);
  const irregulares = alumnos.filter((a) => !a.regular);

  const hayVisibles = alumnos.some((a) =>
    esVisible(a, mostrarReprobados, busqueda)
  );
  const ocultosPorCalificacion = mostrarReprobados
    ? 0
    : alumnos.filter((a) => Number(a.calificacion) < 70).length;

  return (
    <>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-end gap-4">
          <Campo
            label="Buscar"
            placeholder="Nombre o apellido"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}/>
          <label className="flex items-center gap-2 pb-2">
            <input
              type="checkbox"
              checked={mostrarReprobados}
              onChange={(e) => setMostrarReprobados(e.target.checked)}/>
            Mostrar reprobados
          </label>
        </div>

        <button
          onClick={() => setMostrarForm(!mostrarForm)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          {mostrarForm ? "Cancelar" : "Agregar alumno"}
        </button>
      </div>

      {mostrarForm && (
        <form
          onSubmit={handleAgregar}
          className="mb-6 flex flex-col gap-3 rounded-lg border border-gray-200 p-4">
          <Campo
            label="Nombre"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}/>
          <Campo
            label="Apellido"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}/>
          <Campo
            label="Calificación"
            type="number"
            min="0"
            max="100"
            placeholder="0 a 100"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}/>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={regular}
              onChange={(e) => setRegular(e.target.checked)}/>
            Alumno regular
          </label>
          <button
            type="submit"
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
            Guardar
          </button>
        </form>
      )}

      {!hayVisibles && (
        <p className="mb-4 text-gray-500">Sin resultados.</p>
      )}

      <Seccion
        titulo="Alumnos regulares"
        lista={regulares}
        onToggle={handleToggle}
        mostrarReprobados={mostrarReprobados}
        busqueda={busqueda}
      />
      <Seccion
        titulo="Alumnos irregulares"
        lista={irregulares}
        onToggle={handleToggle}
        mostrarReprobados={mostrarReprobados}
        busqueda={busqueda}
      />
    </>
  );
}