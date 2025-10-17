import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CartaAnimada() {
  const [audio1] = useState(new Audio("/mujhse_dosti_karoge.mp3"));
  const [audio2] = useState(new Audio("/sea_of_dreams.mp3"));
  const [playing, setPlaying] = useState(true);
  const [showSecond, setShowSecond] = useState(false);

  const frases = [
    "Desde que llegaste a mi vida, cada día se volvió un poco más bonito…",
    "Recuerdo nuestras llamadas, las risas hasta tarde, y la semana que pasé contigo: lo mejor.…",
    "A la distancia aprendimos que el amor se construye con intentos, con paciencia y con detalles.",
    "Si decides volver a intentarlo, prometo cuidarlo con la misma ternura con la que pienso en ti.",
    "Por ti, volvería a elegir este sueño una y otra vez.",
    "Gracias por existir, amor.",
  ];

  const peonias = Array.from({ length: 15 });

  useEffect(() => {
    audio1.volume = 0.5;
    audio2.volume = 0.5;
    audio1.play();

    const transitionTimer = setTimeout(() => {
      setShowSecond(true);
      audio1.pause();
      audio2.play();
    }, 70000); // 70s antes de cambiar canción

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
      if (showSecond) audio2.play();
      else audio1.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden text-white font-sans">
      {/* Fondo estrellado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#222_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Lluvia de peonías pequeñas */}
      {peonias.map((_, i) => (
        <motion.img
          key={i}
          src="/peonia.png"
          alt="peonia"
          className="absolute w-8 opacity-70"
          initial={{ y: -100, x: Math.random() * window.innerWidth }}
          animate={{
            y: "110vh",
            x: Math.random() * window.innerWidth,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Contenedor principal */}
      <div className="relative flex flex-col items-center justify-start z-10 space-y-20 py-24 px-6 md:px-12">
        {/* Foto central destacada */}
        <motion.img
          src="/foto_sofi.jpg"
          alt="Nosotros"
          className="rounded-2xl shadow-2xl w-64 h-64 object-cover border-4 border-white/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
        />

        {/* Frases románticas */}
        <div className="flex flex-col space-y-24 items-center text-center w-full max-w-2xl">
          {frases.map((frase, index) => (
            <motion.p
              key={index}
              className="text-3xl md:text-4xl text-white font-[Great_Vibes] leading-snug"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1.8 }}
            >
              {frase}
            </motion.p>
          ))}
        </div>
      </div>

      {/* Botón de pausa */}
      <button
        onClick={togglePlay}
        className="fixed top-5 right-5 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition z-20"
      >
        {playing ? "❚❚" : "▶️"}
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        body {
          margin: 0;
          overflow-x: hidden;
          background-color: black;
        }
      `}</style>
    </div>
  );
}

