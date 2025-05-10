
import React, { useEffect, useRef } from 'react';

const SmokeAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Smoke particle class
    class SmokeParticle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      alpha: number;
      alphaDecrease: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 15 + 10; // Increased size
        this.color = `rgba(180, 180, 180, ${Math.random() * 0.5 + 0.3})`; // Increased opacity
        this.velocity = {
          x: Math.random() * 0.8 - 0.4, // More horizontal movement
          y: Math.random() * -2.5 - 1.0 // Faster upward movement
        };
        this.alpha = Math.random() * 0.7 + 0.3; // Higher initial opacity
        this.alphaDecrease = Math.random() * 0.01 + 0.003; // Slower fade
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.radius += 0.3; // Faster expansion
        this.alpha -= this.alphaDecrease;
      }
    }

    // Factory chimney positions (adjust based on your layout)
    const chimneys = [
      { x: canvas.width * 0.7, y: canvas.height * 0.7 }, // Right side
      { x: canvas.width * 0.75, y: canvas.height * 0.68 }, // Another chimney nearby
    ];

    const particles: SmokeParticle[] = [];
    const MAX_PARTICLES = 200; // More particles

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add new particles at chimney positions
      chimneys.forEach(chimney => {
        if (particles.length < MAX_PARTICLES && Math.random() < 0.3) { // Higher spawn rate
          const offsetX = Math.random() * 15 - 7.5;
          particles.push(new SmokeParticle(chimney.x + offsetX, chimney.y));
        }
      });

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
        
        if (particles[i].alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
    />
  );
};

export default SmokeAnimation;
