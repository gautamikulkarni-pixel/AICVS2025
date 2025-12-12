import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import kagglePoster from "../assets/kaggle.jpg";
import { Trophy, Calendar, Clock, BookOpen, Github, ExternalLink } from "lucide-react";

const Register = () => {
  const registerLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSeBCvsE1oiieGQxHBuvzJ2SpguANwGeclzsjQfz3y5k6tiCFA/viewform?usp=sf_link";

  const repository =
    import.meta.env.VITE_REPOSITORY_LINK ||
    "https://github.com/example/aicvs-kaggle-learning";
  const kaggle = import.meta.env.VITE_KAGGLE_LINK || "https://www.kaggle.com/";

  const eventDate = new Date("December 18, 2025 00:00:00").getTime();
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = eventDate - now;

      if (diff > 0) {
        setTimer({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / (1000 * 60)) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Neural network and particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;
    const connectionDistance = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 51, 234, 0.6)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const units = [
    { key: "days", label: "DAYS" },
    { key: "hours", label: "HOURS" },
    { key: "mins", label: "MINS" },
    { key: "secs", label: "SECS" },
  ];

  return (
    <div className="bg-[#0a0e27] min-h-screen text-white flex flex-col overflow-hidden relative">
      <Header />

      {/* Neural network canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 py-32 relative" style={{ zIndex: 2 }}>
        {/* Animated background elements */}
        <div className="pointer-events-none fixed inset-0" style={{ zIndex: 1 }}>
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-3"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(168, 85, 247, 0.5)",
                "0 0 40px rgba(168, 85, 247, 0.8)",
                "0 0 20px rgba(168, 85, 247, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white">Welcome to </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Kaggle 2025
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl text-gray-300 font-semibold mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Get Ready for the Kaggle Challenge!
          </motion.p>
          <motion.p 
            className="text-base sm:text-lg text-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Learn, practice, and compete—everything begins with your first step.
          </motion.p>
        </motion.div>

        {/* Main Gaming Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl w-full group"
        >
          {/* Animated outer glow */}
          <motion.div 
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/30 via-transparent to-cyan-500/30 blur-xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Main card container */}
          <div className="relative bg-gradient-to-br from-[#1a1f3a]/95 to-[#0f1225]/95 rounded-3xl border-2 border-purple-500/40 shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-purple-500/60 group-hover:shadow-[0_0_50px_rgba(168,85,247,0.4)] backdrop-blur-sm">
            {/* Corner accent dots with pulse */}
            <motion.div 
              className="absolute top-3 left-3 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-3 right-3 w-2.5 h-2.5 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div 
              className="absolute bottom-3 left-3 w-2.5 h-2.5 bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <motion.div 
              className="absolute bottom-3 right-3 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />

            {/* Content */}
            <div className="relative p-6 sm:p-7 md:p-8">
              <div className="grid md:grid-cols-2 gap-6 items-stretch">
                {/* Left Column - Poster */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.03, rotateY: 3 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex items-stretch justify-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative w-full flex">
                    {/* Poster glow effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/40 to-cyan-500/40 blur-2xl rounded-3xl"
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative bg-gradient-to-br from-purple-900/50 to-cyan-900/50 rounded-2xl border-2 border-purple-400/60 p-4 backdrop-blur-md transition-all duration-300 hover:border-purple-400/80 w-full flex shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                      <div className="rounded-xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.6)] w-full ring-2 ring-purple-500/30">
                        <img
                          src={kagglePoster}
                          alt="Kaggle 2025 Poster"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Column - Info */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col justify-between space-y-4"
                >
                  {/* Pre-Kaggle Workshop */}
                  <motion.div 
                    className="relative bg-gradient-to-br from-purple-600/15 via-purple-700/10 to-transparent rounded-2xl p-4 backdrop-blur-sm transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)'
                    }}
                  >
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <motion.div 
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.6), rgba(34, 211, 238, 0.6), rgba(236, 72, 153, 0.6), rgba(168, 85, 247, 0.6))',
                          backgroundSize: '300% 100%',
                          padding: '2px',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude'
                        }}
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                      />
                    </div>
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <Calendar className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-base sm:text-lg">Pre-Kaggle Workshop</h3>
                            <p className="text-purple-100 text-xs sm:text-sm">Join the warm-up event</p>
                            <p className="text-purple-200/90 text-xs font-semibold mt-0.5">15th-17th December 2025</p>
                          </div>
                        </div>
                        <motion.a
                          href={registerLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-lg hover:shadow-purple-500/50"
                        >
                          REGISTER NOW
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Main Event */}
                  <motion.div 
                    className="relative bg-gradient-to-br from-purple-600/20 via-purple-700/12 to-transparent rounded-2xl p-4 backdrop-blur-sm transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)'
                    }}
                  >
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <motion.div 
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.6), rgba(34, 211, 238, 0.6), rgba(236, 72, 153, 0.6), rgba(168, 85, 247, 0.6))',
                          backgroundSize: '300% 100%',
                          padding: '2px',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude'
                        }}
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: 0.5
                        }}
                      />
                    </div>
                    <div className="relative">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                          <Trophy className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-base sm:text-lg mb-1">Kaggle Competition</h3>
                          <p className="text-purple-100 text-xs sm:text-sm mb-1">18th–30th December 2025</p>
                          <p className="text-purple-200/80 text-xs">Work with real-world data, build models and compete while learning hands-on.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Countdown Timer */}
                  <motion.div 
                    className="relative bg-gradient-to-br from-purple-600/18 via-purple-700/10 to-transparent rounded-2xl p-4 backdrop-blur-sm transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)'
                    }}
                  >
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <motion.div 
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: 'linear-gradient(90deg, rgba(168, 85, 247, 0.6), rgba(34, 211, 238, 0.6), rgba(236, 72, 153, 0.6), rgba(168, 85, 247, 0.6))',
                          backgroundSize: '300% 100%',
                          padding: '2px',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude'
                        }}
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: 1
                        }}
                      />
                    </div>
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-5 h-5 text-purple-300" />
                        <p className="text-purple-200 font-bold uppercase tracking-wider text-xs sm:text-sm">Event Starts In</p>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {units.map(({ key, label }, index) => (
                          <motion.div 
                            key={key} 
                            className="text-center"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div 
                              className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-3 shadow-[0_0_20px_rgba(168,85,247,0.6)] border-2 border-purple-400/50"
                              animate={{ 
                                boxShadow: [
                                  '0 0 20px rgba(168,85,247,0.6)',
                                  '0 0 30px rgba(168,85,247,0.9)',
                                  '0 0 20px rgba(168,85,247,0.6)'
                                ]
                              }}
                              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                            >
                              <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
                                {String(timer[key]).padStart(2, "0")}
                              </p>
                            </motion.div>
                            <p className="text-[0.6rem] sm:text-xs text-gray-300 font-bold mt-1.5 tracking-wider uppercase">
                              {label}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Register Button */}
                  <motion.a
                    href={registerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group cursor-pointer"
                  >
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl blur-xl opacity-75"
                      animate={{
                        opacity: [0.75, 1, 0.75],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-xl py-3 px-6 text-center font-black text-base shadow-2xl border-2 border-white/30 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                      <span className="relative z-10">REGISTER NOW</span>
                    </div>
                  </motion.a>

                  {/* Resources */}
                  <motion.div 
                    className="bg-gradient-to-br from-purple-600/12 via-purple-700/8 to-transparent rounded-2xl border-2 border-purple-400/35 p-4 backdrop-blur-sm transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                    whileHover={{ 
                      scale: 1.02,
                      borderColor: 'rgba(168, 85, 247, 0.55)',
                      boxShadow: '0 0 30px rgba(168, 85, 247, 0.35)'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                        <BookOpen className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-white font-bold text-base sm:text-lg">Learning Resources</h3>
                    </div>

                    <div className="space-y-2.5 text-xs sm:text-sm">
                     <motion.div 
  className="flex items-center gap-2"
  whileHover={{ x: 3 }}
>
  <Github className="w-5 h-5 text-purple-400" />
  <span className="text-gray-300">GitHub Repository:</span>
  <a
    href={repository}
    target="_blank"
    rel="noopener noreferrer"
    className="text-cyan-400 hover:text-cyan-300 transition-colors underline font-semibold"
  >
    Open GitHub
  </a>
</motion.div>


                   <motion.div 
  className="flex items-center gap-2"
  whileHover={{ x: 3 }}
>
  <ExternalLink className="w-5 h-5 text-cyan-400" />
  <span className="text-gray-300">Kaggle:</span>
  <a
    href={kaggle}
    target="_blank"
    rel="noopener noreferrer"
    className="text-cyan-400 hover:text-cyan-300 transition-colors underline font-semibold"
  >
    Visit Kaggle
  </a>
</motion.div>

                    </div>
                  </motion.div>

                </motion.div>
              </div>
            </div>

            {/* Scan line effect */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-scan" />
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Register;