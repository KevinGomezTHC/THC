import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = "https://script.google.com/macros/s/AKfycbxqi8QUbIZSurFKL7FjFR4WGn32WeWUnuIGfCaa-PzkRFu-DOCj31ud1qpEwre2okm91Q/exec";

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    // Convierte el body en formato urlencoded
    const bodyEncoded = new URLSearchParams(req.body).toString();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: bodyEncoded,
    });

    if (!response.ok) {
      throw new Error("Respuesta no OK del servidor externo");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error en proxy:", error);
    res.status(500).json({ error: "Error en proxy" });
  }
}
