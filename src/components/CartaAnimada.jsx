import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Esta es la versión final, ajustada para diseño responsive y carga de assets.

export default function CartaAnimada() {
  // Configuración de la base para GitHub Pages (Debe coincidir con vite.config.js)
  // Usaremos el nombre del repositorio como base para asegurar las rutas.
  const BASE_PATH = "/carta-para-sofi"; // <--- NOMBRE DEL REPOSITORIO

  // Los nombres de archivo deben coincidir exactamente con los que están en la carpeta 'public'
  const [audio1] = useState(new Audio(`${BASE_PATH}/mujhse_dosti_karoge.mp3`));
  const [audio2] = useState(new Audio(`${BASE_PATH}/sea_of_dreams.mp3`));
  
  const [playing, setPlaying] = useState(true); 
  const [showSecond, setShowSecond] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false); // Flag para la interacción

  const frases = [
    "Desde que llegaste a mi vida, cada día se volvió un poco más bonito…",
    "Recuerdo nuestras llamadas, las risas hasta tarde, y la semana que pasé contigo: lo mejor…",
    "A la distancia aprendimos que el amor se construye con intentos, con paciencia y con detalles.",
    "Si decides volver a intentarlo, prometo cuidarlo con la misma ternura con la que pienso en ti.",
    "Por ti, volvería a elegir este sueño una y otra vez.",
    "Gracias por existir, amor.",
  ];

  const peonias = Array.from({ length: 15 });

  // Control de Audio (intenta iniciar al cargar, si el navegador lo bloquea, se necesita un clic)
  useEffect(() => {
    audio1.volume = 0.5;
    audio2.volume = 0.5;

    // Intentar reproducir el audio 1 al cargar
    audio1.play()
      .then(() => setPlaying(true))
      .catch(e => {
        console.log("Autoplay de audio 1 bloqueado:", e);
        setPlaying(false); // Marca que el audio no está sonando
      });

    const transitionTimer = setTimeout(() => {
      setShowSecond(true);
      audio1.pause();
      // Intentar reproducir el audio 2
      if (playing) audio2.play().catch(e => console.log("Audio 2 bloqueado:", e));
    }, 70000); // 70s antes de cambiar canción

    return () => {
      clearTimeout(transitionTimer);
      audio1.pause();
      audio2.pause();
    };
  }, [playing]); // Se vuelve a ejecutar si 'playing' cambia (al hacer clic en el botón)

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
        className="relative min-h-screen w-full bg-black overflow-x-hidden text-white font-sans"
        onClick={handleInitialInteraction} // Captura el primer clic/toque
    >
      {/* Indicador de clic para iniciar si el autoplay falla */}
      {!playing && !userInteracted && (
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 text-xl md:text-2xl text-pink-400 cursor-pointer"
          >
              Haz clic o toca la pantalla para iniciar la música y las animaciones...
          </motion.div>
      )}

      {/* Fondo estrellado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#222_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Lluvia de peonías (ajustadas a tamaño más pequeño: w-4 md:w-6) */}
      {peonias.map((_, i) => (
        <motion.img
          key={i}
          src={`${BASE_PATH}/peonia.png`}
          alt="peonia"
          className="absolute w-4 md:w-6 opacity-70" // Peonías más pequeñas
          initial={{ y: -100, x: `${Math.random() * 100}vw` }}
          animate={{
            y: "110vh",
            x: `${Math.random() * 100}vw`,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Contenedor principal: Centrado y con scroll vertical */}
      <div className="relative flex flex-col items-center justify-start z-10 space-y-20 py-16 md:py-24 px-4 md:px-12">
        
        {/* Frases románticas (centradas y con max-width) */}
        <div className="flex flex-col space-y-16 md:space-y-20 items-center text-center w-full max-w-md md:max-w-2xl mt-8">
          {frases.map((frase, index) => (
            <motion.p
              key={index}
              className="text-2xl md:text-3xl text-white font-[Great_Vibes] leading-relaxed italic" // Texto más grande y legible
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }} // Activa la animación cuando está visible
              transition={{ delay: 0.3, duration: 1.8 }}
            >
              {frase}
            </motion.p>
          ))}
        </div>

        {/* Foto central destacada (al final, como cierre) */}
        <motion.img
          src={`${BASE_PATH}/foto_sofi.jpg`}
          alt="Nosotros"
          className="rounded-full shadow-2xl w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-pink-300/50 mb-16"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }} // Activa al estar visible
          transition={{ duration: 1.5, delay: 1 }}
        />
      </div>

      {/* Botón de pausa */}
      <button
        onClick={togglePlay}
        className="fixed top-5 right-5 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm hover:bg-white/20 transition z-20"
      >
        {playing ? "❚❚ Pausar" : "▶️ Reproducir"}
      </button>

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

