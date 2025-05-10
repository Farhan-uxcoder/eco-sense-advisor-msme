
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
        this.radius = Math.random() * 10 + 5;
        this.color = `rgba(200, 200, 200, ${Math.random() * 0.3 + 0.1})`;
        this.velocity = {
          x: Math.random() * 0.5 - 0.25,
          y: Math.random() * -1.5 - 0.5
        };
        this.alpha = Math.random() * 0.5 + 0.2;
        this.alphaDecrease = Math.random() * 0.02 + 0.005;
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
        this.radius += 0.2;
        this.alpha -= this.alphaDecrease;
      }
    }

    // Factory chimney positions (adjust based on your layout)
    const chimneys = [
      { x: canvas.width * 0.7, y: canvas.height * 0.65 },  // Right side
    ];

    const particles: SmokeParticle[] = [];
    const MAX_PARTICLES = 100;

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add new particles at chimney positions
      chimneys.forEach(chimney => {
        if (particles.length < MAX_PARTICLES && Math.random() < 0.2) {
          const offsetX = Math.random() * 10 - 5;
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default SmokeAnimation;
