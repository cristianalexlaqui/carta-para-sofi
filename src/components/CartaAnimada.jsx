import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CartaAnimada() {
  const BASE_PATH = "/carta-para-sofi";

  const [audio1] = useState(new Audio(`${BASE_PATH}/mujhse_dosti_karoge.mp3`));
  const [audio2] = useState(new Audio(`${BASE_PATH}/sea_of_dreams.mp3`));
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(1);
  const [userInteracted, setUserInteracted] = useState(false);

  const frases = [
    "Desde que llegaste a mi vida, cada día se volvió un poco más bonito…",
    "Recuerdo nuestras llamadas, las risas hasta tarde, y la semana que pasé contigo: lo mejor…",
    "A la distancia aprendimos que el amor se construye con intentos, con paciencia y con detalles.",
    "Si decides volver a intentarlo, prometo cuidarlo con la misma ternura con la que pienso en ti.",
    "Por ti, volvería a elegir este sueño una y otra vez.",
    "Gracias por existir, amor.",
  ];

  const peonias = Array.from({ length: 18 });

  useEffect(() => {
    audio1.volume = 0.5;
    audio2.volume = 0.5;

    audio1.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));

    return () => {
      audio1.pause();
      audio2.pause();
    };
  }, []);

  const togglePlay = () => {
    if (playing) {
      audio1.pause();
      audio2.pause();
    } else {
      if (currentSong === 1) audio1.play().catch(() => {});
      if (currentSong === 2) audio2.play().catch(() => {});
    }
    setPlaying(!playing);
    setUserInteracted(true);
  };

  const handleNextSong = () => {
    const nextSong = currentSong === 1 ? 2 : 1;
    if (currentSong === 1) audio1.pause();
    if (currentSong === 2) audio2.pause();
    if (nextSong === 1) audio1.play().catch(() => {});
    if (nextSong === 2) audio2.play().catch(() => {});
    setCurrentSong(nextSong);
    setPlaying(true);
    setUserInteracted(true);
  };

  const handleInitialInteraction = () => {
    if (!userInteracted && !playing) {
      audio1.play().catch(() => {});
      setPlaying(true);
      setUserInteracted(true);
    }
  };

  const photoDelay = 0.3 + frases.length * 2.5 + 2;

  return (
    <div
      className="relative w-full bg-black overflow-x-hidden text-white font-sans min-h-screen"
      onClick={handleInitialInteraction}
    >
      {/* Pantalla para iniciar si el autoplay falla */}
      {!playing && !userInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 text-xl md:text-2xl text-pink-400 cursor-pointer text-center p-4"
        >
          Haz clic o toca la pantalla para iniciar la música y las animaciones...
        </motion.div>
      )}

      {/* Fondo estrellado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#222_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Lluvia de peonías (ahora mucho más pequeñas y suaves) */}
      {peonias.map((_, i) => (
        <motion.img
          key={i}
          src={`${BASE_PATH}/peonia.png`}
          alt="peonia"
          className="absolute w-3 opacity-60"
          initial={{ y: -100, x: `${Math.random() * 100}vw` }}
          animate={{
            y: "110vh",
            x: `${Math.random() * 100}vw`,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 18 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Contenedor principal */}
      <div className="relative flex flex-col items-center justify-start z-10 pt-12 pb-24 px-4 md:px-12">
        {/* Título principal centrado */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-5xl md:text-6xl text-pink-300 font-[Great_Vibes] text-center mb-8 md:mb-12 italic"
        >
          Felices 4 meses amor 💖
        </motion.h1>

        {/* Frases románticas (centradas arriba, con espacio suave) */}
        <div className="flex flex-col space-y-10 items-center text-center w-full max-w-3xl">
          {frases.map((frase, index) => (
            <motion.p
              key={index}
              className="text-xl md:text-3xl text-white font-[Great_Vibes] leading-relaxed italic mx-auto p-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ delay: 0.3 + index * 2.3, duration: 1.8 }}
            >
              {frase}
            </motion.p>
          ))}
        </div>

        {/* Imagen al final, centrada, pequeña */}
        <motion.img
          src={`${BASE_PATH}/foto_sofi.jpg`}
          alt="Nosotros"
          className="rounded-full shadow-2xl w-28 h-28 md:w-32 md:h-32 object-cover border-4 border-pink-300/50 mt-20 mx-auto"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 1.8, delay: photoDelay }}
        />
      </div>

      {/* Botones de música */}
      <div className="fixed top-5 right-5 flex space-x-2 z-20">
        <button
          onClick={togglePlay}
          className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition"
        >
          {playing ? "❚❚ Pausar" : "▶️ Reproducir"}
        </button>
        <button
          onClick={handleNextSong}
          className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition"
        >
          {currentSong === 1
            ? "Siguiente (Sea of Dreams)"
            : "Siguiente (Mujhse Dosti Karoge)"}
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        body {
          margin: 0;
          overflow-x: hidden;
          background-color: black;
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
}