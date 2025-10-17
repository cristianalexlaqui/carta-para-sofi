import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CartaAnimada() {
  const [audio1] = useState(() => new Audio("/mujhse_dosti_karoge.mp3"));
  const [audio2] = useState(() => new Audio("/sea_of_dreams.mp3"));
  const [playing, setPlaying] = useState(true);
  const [showSecond, setShowSecond] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const frases = [
    "Desde que llegaste a mi vida, cada día se volvió un poco más bonito…",
    "Recuerdo nuestras llamadas, las risas hasta tarde, y la semana que pasé contigo: lo mejor.",
    "A la distancia aprendimos que el amor se construye con intentos, con paciencia y con detalles.",
    "Si decides volver a intentarlo, prometo cuidarlo con la misma ternura con la que pienso en ti.",
    "Por ti, volvería a elegir este sueño una y otra vez.",
    "Gracias por existir, amor.",
  ];

  const peonias = Array.from({ length: 20 });

  useEffect(() => {
    // ajustar volumen y reproducir solo cuando el usuario interactúa
    const startMusic = () => {
      audio1.volume = 0.5;
      audio2.volume = 0.5;
      audio1.play().catch(() => {}); // prevenir bloqueo del navegador
      document.removeEventListener("click", startMusic);
    };
    document.addEventListener("click", startMusic);

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    const transitionTimer = setTimeout(() => {
      setShowSecond(true);
      audio1.pause();
      audio2.play().catch(() => {});
    }, 70000); // cambia a la segunda canción después de 70s

    return () => {
      clearTimeout(transitionTimer);
      audio1.pause();
      audio2.pause();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const togglePlay = () => {
    if (playing) {
      audio1.pause();
      audio2.pause();
    } else {
      if (showSecond) audio2.play().catch(() => {});
      else audio1.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden text-white font-sans">
      {/* Fondo estrellado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#222_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Lluvia de peonías */}
      {peonias.map((_, i) => (
        <motion.img
          key={i}
          src="/peonia.png"
          alt="peonia"
          className="absolute w-12 opacity-70"
          initial={{ y: -100, x: Math.random() * screenWidth, rotate: 0 }}
          animate={{
            y: "110vh",
            rotate: Math.random() * 360,
            x: Math.random() * screenWidth,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Imagen central */}
      <img
        src="/foto_sofi.jpg"
        alt="Nosotros"
        className="absolute inset-0 w-full h-full object-cover opacity-25 blur-sm"
      />

      {/* Frases animadas centradas */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 space-y-8">
        {frases.map((frase, index) => (
          <motion.p
            key={index}
            className="text-3xl md:text-5xl text-white font-[Great_Vibes]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 6, duration: 2 }}
          >
            {frase}
          </motion.p>
        ))}
      </div>

      {/* Botón de pausa */}
      <button
        onClick={togglePlay}
        className="absolute top-5 right-5 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition"
      >
        {playing ? "❚❚" : "▶️"}
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        body {
          margin: 0;
          overflow: hidden;
          background: black;
        }
      `}</style>
    </div>
  );
}


