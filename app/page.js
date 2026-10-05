import TablaAlumnos from "./alumnos/TablaAlumnos";

export default function AlumnosPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-2xl font-bold">Lista de alumnos</h1>
      <TablaAlumnos />
    </main>
  );
}