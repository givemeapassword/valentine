import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRive } from '@rive-app/react-canvas';
import Confetti from 'react-confetti';
import useSound from 'use-sound';
import { FloatingHeart } from './components/FloatingHeart';

export default function App() {
  const [showCard, setShowCard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [message, setMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRickroll, setShowRickroll] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  const { RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    stateMachines: "idle",
    autoplay: true,
  });

  const [playSound, { stop }] = useSound('https://assets.mixkit.co/music/preview/mixkit-sweet-love-message-alert-937.mp3', {
    loop: true,
  });

  const [playRickroll] = useSound('https://www.soundboard.com/mediafiles/mz/Mzg1ODMxNTIzMzg1ODM3_JzthsfvUY24.MP3', {
    volume: 0.5,
  });

  useEffect(() => {
    if (isPlaying) {
      playSound();
    } else {
      stop();
    }
    return () => stop();
  }, [isPlaying, playSound, stop]);

  const messages = [
    "Ты заставляешь мое сердце биться чаще! 💓",
    "Ты - CSS для моего HTML! 💘",
    "Ты - мое любимое уведомление! 🔔",
    "Ты - точка с запятой в моем коде! 😊",
    "Ты тот, кому я хочу сделать commit! 🔐",
    "Ты - мой тип данных! 💝",
    "Ты обернул(а) меня в Promise! 🎀",
    "Ты - функция моего сердца! 💖",
    "Без тебя мой код не компилируется! 💕",
    "Ты - самый красивый баг в моей жизни! 🐞",
    "Ты - мой бесконечный цикл любви! ∞",
    "Ты - антивирус моего сердца! 🛡️",
    "Ты - мой главный репозиторий! 📁",
    "Ты - мой любимый pull request! 🎯",
    "Ты - самая важная переменная в моей жизни! 🌟"
  ];

  const handleTap = () => {
    setClickCount(prev => prev + 1);
    
    if (!showCard) {
      setShowCard(true);
      setShowConfetti(true);
      setIsPlaying(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }

    // Rickroll after 5 clicks
    if (clickCount === 4) {
      setShowRickroll(true);
      stop();
      playRickroll();
      setTimeout(() => {
        setShowRickroll(false);
        setIsPlaying(true);
      }, 3000);
    }

    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  // Generate floating hearts
  const hearts = Array.from({ length: 10 }, (_, i) => ({
    x: Math.random() * window.innerWidth,
    delay: Math.random() * 5
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-red-100 p-4 flex items-center justify-center overflow-hidden relative">
      {hearts.map((heart, index) => (
        <FloatingHeart key={index} x={heart.x} delay={heart.delay} />
      ))}
      
      {showConfetti && <Confetti />}
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-full max-w-md relative"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-0 right-0 z-10 bg-white rounded-full p-2 shadow-md"
        >
          {isPlaying ? '🔇' : '🔊'}
        </motion.button>

        {showRickroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black"
          >
            <img 
              src="https://media.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif" 
              alt="rickroll"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTap}
          className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-2xl"
        >
          <div className="h-64 relative">
            <RiveComponent className="w-full h-full" />
          </div>

          <AnimatePresence>
            {showCard && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-6 text-center"
              >
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-3xl font-bold text-red-500 mb-4"
                >
                  С Днём Святого Валентина!
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-gray-700 mb-4"
                >
                  {message || "Нажми для милого сообщения! 💝"}
                </motion.p>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="flex justify-center space-x-2"
                >
                  {['❤️', '💖', '💝', '💕', '🌹', '✨'].map((emoji, index) => (
                    <motion.span
                      key={index}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 10,
                        transition: { duration: 0.2 }
                      }}
                      className="text-2xl cursor-pointer transform hover:rotate-12"
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}