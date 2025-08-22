import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = "https://script.google.com/a/macros/thehospitalitycenter.net/s/AKfycbxqi8QUbIZSurFKL7FjFR4WGn32WeWUnuIGfCaa-PzkRFu-DOCj31ud1qpEwre2okm91Q/exec";

  try {
    if (req.method === "POST") {
      // Convierte el body JSON en URL-encoded
      const formEncoded = new URLSearchParams(req.body).toString();

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formEncoded,
      });

      const data = await response.json();
      return res.status(200).json(data);
    }

    // Si no es POST, responde con 405 Method Not Allowed
    return res.status(405).json({ error: "Método no permitido" });
  } catch (error) {
    console.error("Error en proxy:", error);
    return res.status(500).json({ error: "Error en proxy", detalle: error.message });
  }
}
