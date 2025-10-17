import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CartaAnimada() {
  const BASE_PATH = "/carta-para-sofi";

  const [audio1] = useState(new Audio(`${BASE_PATH}/mujhse_dosti_karoge.mp3`));
  const [audio2] = useState(new Audio(`${BASE_PATH}/sea_of_dreams.mp3`));
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(1);
  const [userInteracted, setUserInteracted] = useState(false);

  const peonias = Array.from({ length: 15 });

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

  return (
    <div
      className="relative min-h-screen w-full bg-black overflow-hidden text-white font-sans flex flex-col items-center justify-center text-center px-6"
      onClick={handleInitialInteraction}
    >
      {/* Overlay para iniciar si el autoplay falla */}
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

      {/* Lluvia de peonías pequeñas */}
      {peonias.map((_, i) => (
        <motion.img
          key={i}
          src={`${BASE_PATH}/peonia.png`}
          alt="peonia"
          className="absolute w-3 opacity-70"
          initial={{ y: -100, x: `${Math.random() * 100}vw` }}
          animate={{
            y: "110vh",
            x: `${Math.random() * 100}vw`,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Contenido principal centrado con animación de fundido global */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        // CAMBIO: Añadido flexbox para asegurar el centrado de los elementos internos.
        className="relative z-10 max-w-3xl flex flex-col items-center"
      >
        <h1 className="text-3xl md:text-5xl text-pink-300 font-[Great_Vibes] mb-6 italic">
          ✨ Para mi Sofi ✨
        </h1>

        <div className="text-base md:text-xl leading-relaxed font-[Great_Vibes] text-white space-y-6">
          <p>Desde que llegaste a mi vida, cada día se volvió un poquito más bonito.</p>
          <p>
            Recuerdo nuestras llamadas, cómo el silencio se sentía cómodo contigo, las risas
            hasta tarde, y cómo hablábamos de nada y de todo. Pero, sin duda, esa semana que
            viajé a verte fue una de las más bonitas que he vivido; ver tu sonrisa en persona y
            sentir tu presencia real, me hizo entender la profundidad de lo que significas.
          </p>
          <p>
            Hoy, que celebramos 4 meses, quiero que sepas que esto no es solo una fecha. Es una
            promesa, un recordatorio de que sigo aquí, creyendo en nosotros, en todo lo que hemos
            aprendido y en lo que aún nos espera. Quiero seguir creciendo contigo, seguir amándote
            cada día un poco más, y construir ese futuro juntos.
          </p>
          <p>
            Eres mi calma, mi caos bonito, y mi sueño despierto.
          </p>
          <p className="text-pink-300 text-lg md:text-2xl mt-4">
            ¡FELICES 4 MESES, AMOR! Gracias por existir. 💗
          </p>
        </div>

        {/* La clase 'mx-auto' ya centraba la imagen, pero con el flexbox padre, el centrado es más consistente. */}
        <motion.img
          src={`${BASE_PATH}/foto_sofi.jpg`}
          alt="Nosotros"
          className="rounded-full shadow-2xl w-28 h-28 md:w-32 md:h-32 object-cover border-4 border-pink-300/50 mx-auto mt-10"
        />
      </motion.div>

      {/* Botones de música */}
      <div className="fixed bottom-5 right-5 flex space-x-2 z-20">
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
          {currentSong === 1 ? "Siguiente" : "Volver"}
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