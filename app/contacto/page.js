export const metadata = {
  title: "Contacto | SinColoresFC.mx",
  description:
    "Ponte en contacto con el equipo de SinColoresFC.mx para dudas, sugerencias o ejercicio de derechos.",
};

export default function Contacto() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-4">Contacto</h1>
      <p className="mb-4">
        ¿Tienes dudas, sugerencias? Escríbenos a{" "}
        <a
          href="mailto:contacto@sincoloresfc.mx"
          className="text-blue-700 underline"
        >
          contacto@sincoloresfc.mx
        </a>{" "}
        o completa el siguiente formulario:
      </p>
      {/* Si más adelante quieres un formulario real, puedes agregarlo aquí */}
      <form className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1 font-semibold">Nombre</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Correo electrónico</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Mensaje</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Enviar mensaje
        </button>
      </form>
      <p className="mt-8 text-sm text-gray-500">
        También puedes contactarnos por redes sociales oficiales.
      </p>
    </main>
  );
}
