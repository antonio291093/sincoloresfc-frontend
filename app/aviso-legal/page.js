export const metadata = {
  title: "Aviso Legal | SinColoresFC.mx",
  description:
    "Consulta el aviso legal y las condiciones de uso de SinColoresFC.mx.",
};

export default function AvisoLegal() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-4">Aviso Legal</h1>
      <h2 className="text-xl font-semibold mt-6 mb-2">Titular del sitio web</h2>
      <p className="mb-4">
        <strong>SinColoresFC.mx</strong>
        Email de contacto:{" "}
        <a
          href="mailto:contacto@sincoloresfc.mx"
          className="text-blue-700 underline"
        >
          contacto@sincoloresfc.mx
        </a>
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Objeto</h2>
      <p className="mb-4">
        Este sitio web tiene como finalidad ofrecer información, análisis y
        pronósticos sobre la Liga MX. El contenido es meramente informativo y no
        constituye asesoramiento profesional.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Propiedad intelectual</h2>
      <p className="mb-4">
        Todos los contenidos, textos, imágenes y logotipos son propiedad de
        SinColoresFC.mx o de sus respectivos titulares y están protegidos por la
        legislación vigente.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        Limitación de responsabilidad
      </h2>
      <p className="mb-4">
        SinColoresFC.mx no garantiza la exactitud de los pronósticos publicados
        ni se responsabiliza por las decisiones tomadas por los usuarios basadas
        en la información del sitio.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Legislación aplicable</h2>
      <p className="mb-4">
        Este sitio se rige por la legislación mexicana. Para cualquier
        controversia, las partes se someten a los juzgados y tribunales de
        México.
      </p>
      <p className="mt-8 text-sm text-gray-500">
        Última actualización: {new Date().toLocaleDateString("es-MX")}
      </p>
    </main>
  );
}
