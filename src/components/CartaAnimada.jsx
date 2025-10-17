import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [audio1] = useState(new Audio("/mujhse_dosti_karoge.mp3"));
  const [audio2] = useState(new Audio("/sea_of_dreams.mp3"));
  
  const [playing, setPlaying] = useState(true); // Inicia en true para autoplay
  const [showSecond, setShowSecond] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false); // Para control de autoplay por navegador

  const frases = [
    "Desde que llegaste a mi vida, cada día se volvió un poco más bonito.",
    "Recuerdo nuestras llamadas, las risas hasta tarde, y la semana que pasé contigo: lo mejor.",
    "A la distancia aprendimos que el amor se construye con intentos, con paciencia y con detalles.",
    "Si decides volver a intentarlo, prometo cuidarlo con la misma ternura con la que pienso en ti.",
    "Por ti, volvería a elegir este sueño una y otra vez."
  ];

  const peonias = Array.from({ length: 15 });

  // Control de Audio (autoplay al inicio, si el navegador lo permite)
  useEffect(() => {
    audio1.volume = 0.5;
    audio2.volume = 0.5;

    // Intentar reproducir el audio 1 al cargar
    audio1.play()
      .then(() => setPlaying(true)) // Si se reproduce, establecer playing a true
      .catch(e => {
        console.log("Autoplay de audio 1 bloqueado:", e);
        setPlaying(false); // Si no se reproduce, establecer playing a false
        // Mostrar un mensaje para que el usuario haga clic y active el audio
      });

    const transitionTimer = setTimeout(() => {
      setShowSecond(true);
      audio1.pause();
      // Intentar reproducir el audio 2
      audio2.play().catch(e => console.log("Autoplay de audio 2 bloqueado:", e));
    }, 70000); // 70s antes de cambiar canción

    return () => {
      clearTimeout(transitionTimer);
      audio1.pause();
      audio2.pause();
    };
  }, []); // Se ejecuta una sola vez al montar el componente

  // Alternar pausa/play (ahora también gestiona el inicio manual si el autoplay falla)
  const togglePlay = () => {
    if (playing) {
      audio1.pause();
      audio2.pause();
    } else {
      // Si el autoplay falló, esto lo iniciará
      if (showSecond) audio2.play().catch(() => {});
      else audio1.play().catch(() => {});
    }
    setPlaying(!playing);
    setUserInteracted(true); // Marcar que el usuario ya interactuó
  };

  // Manejar el clic en cualquier parte de la pantalla si el autoplay falla
  const handleInitialInteraction = () => {
    if (!userInteracted && !playing) {
      // Si el audio no está reproduciéndose y el usuario no ha interactuado
      audio1.play().catch(() => {});
      setPlaying(true);
      setUserInteracted(true);
    }
  };

  return (
    <div 
        className="relative h-screen w-full bg-black overflow-hidden text-white font-sans"
        onClick={handleInitialInteraction} // Capturar el primer clic/toque
    >
      {/* Indicador de clic para iniciar si el autoplay falla */}
      {!playing && !userInteracted && (
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 text-xl md:text-2xl text-pink-400 cursor-pointer"
          >
              Haz clic o toca la pantalla para iniciar la música y las animaciones...
          </motion.div>
      )}

      {/* Fondo estrellado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#222_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Lluvia de peonías */}
      {peonias.map((_, i) => (
        <motion.img
          key={i}
          src="/peonia.png" 
          alt="peonia"
          className="absolute w-8 md:w-12 opacity-60" // Más pequeñas y responsive
          initial={{ y: -100, x: `${Math.random() * 100}vw`, rotate: 0 }}
          animate={{
            y: "110vh",
            rotate: Math.random() * 360,
            x: `${Math.random() * 100}vw`
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{ left: `${Math.random() * 100}%` }}
        />
      ))}

      {/* Imagen central */}
      <img
        src="/foto_sofi.jpg"
        alt="Nosotros"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-64 h-64 md:w-96 md:h-96 object-cover opacity-20 blur-sm rounded-full" // Tamaños y centrado
      />

      {/* Frases animadas */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-20 space-y-4 md:space-y-8">
        {frases.map((frase, index) => (
          <motion.p
            key={index}
            className="text-xl md:text-4xl text-white font-[Great_Vibes] max-w-4xl" // Tamaño y centrado
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 6 + 3, duration: 2 }}
          >
            {frase}
          </motion.p>
        ))}
        {/* Firma final (aparece después de todas las frases) */}
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: frases.length * 6 + 4, duration: 1.5 }}
          className="text-lg md:text-3xl text-pink-400 font-[Great_Vibes] mt-8 md:mt-10" // Tamaño y margen
        >
          — Cristian
        </motion.p>
      </div>

      {/* Botón de pausa */}
      <button
        onClick={togglePlay}
        className="absolute top-5 right-5 z-40 bg-white/10 backdrop-blur-md text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base hover:bg-white/20 transition"
      >
        {playing ? "❚❚ Pausar" : "▶️ Reproducir"}
      </button>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        body {
          margin: 0;
          overflow: hidden;
          /* Asegurar que la altura del body sea la del viewport para h-screen */
          height: 100vh; 
          width: 100vw;
        }
      `}</style>
    </div>
  );
}
