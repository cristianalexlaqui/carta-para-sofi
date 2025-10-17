import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CartaAnimada() {
  // Configuración de la base para GitHub Pages
  // NOTA: Si cambiaste el nombre del repositorio, debes cambiarlo aquí también
  const BASE_PATH = "/carta-para-sofi";

  // Se inicializan los audios
  const [audio1] = useState(new Audio(`${BASE_PATH}/mujhse_dosti_karoge.mp3`));
  const [audio2] = useState(new Audio(`${BASE_PATH}/sea_of_dreams.mp3`));
  
  const [playing, setPlaying] = useState(false); // Inicia en false, esperando interacción
  const [currentSong, setCurrentSong] = useState(1); // 1 = audio1, 2 = audio2
  const [userInteracted, setUserInteracted] = useState(false); 

  const frases = [
    "Desde que llegaste a mi vida, cada día se volvió un poco más bonito…",
    "Recuerdo nuestras llamadas, las risas hasta tarde, y la semana que pasé contigo: lo mejor…",
    "A la distancia aprendimos que el amor se construye con intentos, con paciencia y con detalles.",
    "Si decides volver a intentarlo, prometo cuidarlo con la misma ternura con la que pienso en ti.",
    "Por ti, volvería a elegir este sueño una y otra vez.",
    "Gracias por existir, amor.",
  ];

  const peonias = Array.from({ length: 15 });

  // 1. Lógica de Autoplay/Inicio de Música
  useEffect(() => {
    audio1.volume = 0.5;
    audio2.volume = 0.5;

    audio1.play()
      .then(() => setPlaying(true))
      .catch(e => {
        // Si falla (lo más común), se prepara el overlay de 'Haz Clic'
        setPlaying(false);
      });
      
    return () => {
      audio1.pause();
      audio2.pause();
    };
  }, []);

  // 2. Control de Pausa/Play
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

  // 3. Control de Siguiente Canción
  const handleNextSong = () => {
    const nextSong = currentSong === 1 ? 2 : 1;
    
    // Pausar la actual
    if (currentSong === 1) audio1.pause();
    if (currentSong === 2) audio2.pause();
    
    // Reproducir la siguiente
    if (nextSong === 1) audio1.play().catch(() => {});
    if (nextSong === 2) audio2.play().catch(() => {});
    
    setCurrentSong(nextSong);
    setPlaying(true);
    setUserInteracted(true);
  };

  // 4. Manejar el clic en cualquier parte de la pantalla (Si el autoplay falló)
  const handleInitialInteraction = () => {
    if (!userInteracted && !playing) {
      audio1.play().catch(() => {});
      setPlaying(true);
      setUserInteracted(true);
    }
  };

  // Calcula el delay total para que la foto aparezca después de la última frase
  const photoDelay = 0.3 + frases.length * 2.5 + 2;

  return (
    <div 
        // Restauramos el centrado vertical estricto para eliminar el scroll inicial
        className="relative w-full bg-black overflow-x-hidden text-white font-sans min-h-screen"
        onClick={handleInitialInteraction} // Captura el primer clic/toque
    >
      {/* Indicador de clic para iniciar si el autoplay falla */}
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

      {/* Lluvia de peonías (TAMAÑO MÁS PEQUEÑO: w-3) */}
      {peonias.map((_, i) => (
        <motion.img
          key={i}
          src={`${BASE_PATH}/peonia.png`}
          alt="peonia"
          className="absolute w-3 opacity-70" // Peonías al mínimo
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

      {/* Contenedor principal: CENTRADO VERTICAL Y HORIZONTAL */}
      <div className="relative flex flex-col items-center justify-center min-h-screen z-10 px-4 md:px-12">
        
        {/* TITULO PRINCIPAL */}
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-5xl md:text-6xl text-pink-300 font-[Great_Vibes] text-center mb-4 italic" // Espacio reducido
        >
            FELICES 4 MESES AMOR
        </motion.h1>

        {/* Frases románticas (CENTRADO y COMPACTO) */}
        <div className="flex flex-col space-y-2 items-center text-center w-full max-w-4xl"> {/* Espacio reducido al mínimo */}
          {frases.map((frase, index) => (
            <motion.p
              key={index}
              className="text-xl md:text-3xl text-white font-[Great_Vibes] leading-snug italic mx-auto p-1" // Texto ajustado y relleno reducido
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }} 
              transition={{ delay: 0.3 + index * 2.5, duration: 1.8 }} 
            >
              {frase}
            </motion.p>
          ))}
        </div>

        {/* Foto central destacada (al final, muy pequeña y centrada) */}
        <motion.img
          src={`${BASE_PATH}/foto_sofi.jpg`}
          alt="Nosotros"
          className="rounded-full shadow-2xl w-20 h-20 md:w-28 h-28 object-cover border-4 border-pink-300/50 mt-8 mx-auto" // Reducida al mínimo
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }} 
          transition={{ duration: 1.5, delay: photoDelay }} 
        />
      </div>

      {/* Controles de Música */}
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
          {currentSong === 1 ? 'Siguiente (Sea of Dreams)' : 'Siguiente (Mujhse Dosti Karoge)'}
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        body {
          margin: 0;
          overflow: hidden; /* ELIMINA EL SCROLL TOTALMENTE */
          background-color: black;
        }
      `}</style>
    </div>
  );
}