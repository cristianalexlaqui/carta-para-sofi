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

  // --- TEXTO DINÁMICO CON EFECTO ---
  const frases = [
    "Desde que llegaste a mi vida, cada día se volvió un poco más bonito…",
    "Recuerdo nuestras llamadas, las risas hasta tarde, y la semana que pasé contigo: lo mejor…",
    "A la distancia aprendimos que el amor se construye con intentos, con paciencia y con detalles.",
    "Si decides volver a intentarlo, prometo cuidarlo con la misma ternura con la que pienso en ti.",
    "Por ti, volvería a elegir este sueño una y otra vez.",
    "Gracias por existir, amor.",
  ];

  // --- PÁRRAFO DE INTRODUCCIÓN ESTÁTICO (SOLICITADO POR EL USUARIO) ---
  const introParagraph = (
    <>
      <p className="mb-2">
        Desde que llegaste a mi vida, cada día se volvió un poquito más bonito.
      </p>
      <p className="mb-2">
        A veces pienso en nuestras llamadas, en cómo el silencio se sentía
        cómodo contigo, en cómo reíamos hasta tarde o simplemente hablábamos
        de nada y de todo. Esa semana que estuve contigo, cuando viajé a verte,
        fue una de las más bonitas que he vivido; ver tu sonrisa en persona,
        sentir tu presencia real, me hizo entender cuánto significas para mí.
      </p>
      <p className="mb-2">
        Hoy, que celebramos 4 meses, quiero que recuerdes que esto no es solo
        una fecha. Es una promesa, un recordatorio de que estoy aquí, incluso
        en la distancia, creyendo en nosotros, en todo lo que hemos aprendido y
        en lo que aún nos espera. Quiero seguir creciendo contigo, seguir
        aprendiendo, seguir amándote cada día un poco más.
      </p>
      <p className="text-pink-300">
        Eres mi calma, mi caos bonito, y mi sueño despierto.💗
      </p>
    </>
  );

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
        className="relative w-full bg-black overflow-x-hidden text-white font-sans"
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

      {/* Contenedor principal: VISIBILIDAD INMEDIATA (top-4 left-4) */}
      <div className="absolute top-4 left-4 z-10 w-full max-w-sm md:max-w-lg"> 
        
        {/* TITULO DE INICIO */}
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-2xl md:text-3xl text-pink-300 font-[Great_Vibes] mb-2 italic text-left" 
        >
            ✨ Para mi Sofi ✨
        </motion.h1>
        
        {/* PÁRRAFO DE INTRODUCCIÓN (SE VE INMEDIATAMENTE) */}
        <motion.div
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.8, duration: 1 }}
             className="text-sm md:text-base text-white/90 font-sans leading-relaxed mb-4"
        >
            {introParagraph}
        </motion.div>

        {/* TITULO SECUNDARIO (FELICES 4 MESES AMOR) */}
        <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }} 
            transition={{ delay: 0.3, duration: 1 }}
            className="text-xl md:text-2xl text-pink-300 font-[Great_Vibes] mb-2 italic text-left mt-4" 
        >
            FELICES 4 MESES AMOR
        </motion.h2>

        {/* Frases románticas (COMPACTO Y CON EFECTO) */}
        <div className="flex flex-col space-y-1 items-start w-full"> 
          {frases.map((frase, index) => (
            <motion.p
              key={index}
              className="text-base md:text-lg text-white font-[Great_Vibes] leading-snug italic p-0.5 text-left" 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.8 }} 
              transition={{ delay: 0.3 + index * 2.5, duration: 1.8 }} 
            >
              {frase}
            </motion.p>
          ))}
        </div>

        {/* Foto central destacada (al final, muy pequeña y alineada a la izquierda) */}
        <motion.img
          src={`${BASE_PATH}/foto_sofi.jpg`}
          alt="Nosotros"
          className="rounded-lg shadow-xl w-20 h-20 md:w-28 h-28 object-cover border-4 border-pink-300/50 mt-4" 
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }} 
          transition={{ duration: 1.5, delay: photoDelay }} 
        />
        
        {/* Controles de Música (Alineados debajo de la foto) */}
        <div className="flex space-x-2 mt-4">
            <button
              onClick={togglePlay}
              className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs hover:bg-white/20 transition"
            >
              {playing ? "❚❚ Pausar" : "▶️ Reproducir"}
            </button>
            <button
              onClick={handleNextSong}
              className="bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs hover:bg-white/20 transition"
            >
              {currentSong === 1 ? 'Siguiente' : 'Siguiente'}
            </button>
        </div>
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        body {
          margin: 0;
          background-color: black;
        }
      `}</style>
    </div>
  );
}