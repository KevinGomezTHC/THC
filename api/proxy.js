import fetch from "node-fetch";

export default async function handler(req, res) {
  const url = "https://script.google.com/macros/s/AKfycbxqi8QUbIZSurFKL7FjFR4WGn32WeWUnuIGfCaa-PzkRFu-DOCj31ud1qpEwre2okm91Q/exec";

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: req.method === "POST" ? req.body : null,
    });

    const contentType = response.headers.get("content-type");
    const rawResponse = await response.text();

    console.log("📦 Respuesta del Google Script:", rawResponse); // <-- Esto lo verás en los logs de Vercel

    if (contentType && contentType.includes("application/json")) {
      res.status(200).json(JSON.parse(rawResponse));
    } else {
      res.status(200).send(rawResponse); // Enviamos texto plano
    }
  } catch (error) {
    console.error("❌ Error en proxy:", error);
    res.status(500).json({ error: "Error en proxy", detalle: error.message });
  }
}
