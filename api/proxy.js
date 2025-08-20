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

    // ✅ Manejo seguro del tipo de respuesta
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      const text = await response.text();
      res.status(200).send(text); // <-- Enviamos como texto plano si no es JSON
    }
  } catch (error) {
    console.error("Error en proxy:", error);
    res.status(500).json({ error: "Error en proxy", detalle: error.message });
  }
}
