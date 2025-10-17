import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CartaAnimada() {
  const [audio1] = useState(() => new Audio(import.meta.env.BASE_URL + "mujhse_dosti_karoge.mp3"));
  const [audio2] = useState(() => new Audio(import.meta.env.BASE_URL + "sea_of_dreams.mp3"));
  const [playing, setPlaying] = useState(true);
  const [showSecond, setShowSecond] = useState(false);

  const frases = [
    "Desde que llegaste a mi vida, cada día se volvió un poco más bonito…",
    "Recuerdo nuestras llamadas, las risas hasta tarde, y la semana que pasé contigo: lo mejor.",
    "A la distancia aprendimos que el amor se construye con intentos, con paciencia y con detalles.",
    "Si decides volver a intentarlo, prometo cuidarlo con la misma ternura con la que pienso en ti.",
    "Por ti, volvería a elegir este sueño una y otra vez.",
    "Gracias por existir, amor.",
  ];

  // ✅ Generar peonías con valores al azar una sola vez
  const [peonias] = useState(
    Array.from({ length: 15 }, () => ({
      x: Math.random() * window.innerWidth,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      rotation: Math.random() * 360,
    }))
  );

  useEffect(() => {
    audio1.volume = 0.5;
    audio2.volume = 0.5;
    audio1.loop = true;
    audio2.loop = true;

    audio1.play().catch(() => console.log("Reproducción bloqueada hasta interacción del usuario."));

    const transitionTimer = setTimeout(() => {
      setShowSecond(true);
      audio1.pause();
      audio2.play();
    }, 70000); // cambia a los 70 segundos

    return () => {
      clearTimeout(transitionTimer);
      audio1.pause();
      audio2.pause();
    };
  }, []);

  const togglePlay = () => {
    if (playing) {
      audio1.pause();
      audio2.pause();
    } else {
      (showSecond ? audio2 : audio1).play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden text-white font-sans">
      {/* Fondo estrellado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#222_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Lluvia de peonías */}
      {peonias.map((p, i) => (
        <motion.img
          key={i}
          src={import.meta.env.BASE_URL + "peonia.png"}
          alt="peonia"
          className="absolute w-12 md:w-16 opacity-70"
          initial={{ y: -100, x: p.x }}
          animate={{
            y: "110vh",
            rotate: p.rotation,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      {/* Imagen de fondo difuminada */}
      <img
        src={import.meta.env.BASE_URL + "foto_sofi.jpg"}
        alt="Nosotros"
        className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm"
      />

      {/* Frases centradas */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 space-y-10">
        {frases.map((frase, index) => (
          <motion.p
            key={index}
            className="text-3xl md:text-5xl text-white font-[Great_Vibes]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 6, duration: 2 }}
          >
            {frase}
          </motion.p>
        ))}
      </div>

      {/* Botón de pausa/reproducir */}
      <button
        onClick={togglePlay}
        className="absolute top-6 right-6 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition"
      >
        {playing ? "❚❚" : "▶️"}
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        body {
          margin: 0;
          overflow: hidden;
          background-color: black;
        }
      `}</style>
    </div>
  );
}
