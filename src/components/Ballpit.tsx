
'use client';

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

import './Ballpit.css';

interface BallpitProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
  colors?: string[];
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  followCursor?: boolean;
}

export default function Ballpit({
  count = 25,
  minSize = 15,
  maxSize = 35,
  colors = ['#065f46', '#10b981', '#34d399', '#ecfdf5'],
  gravity = 0.1,
  friction = 0.02,
  wallBounce = 0.6,
  followCursor = true,
}: BallpitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    engine.gravity.y = gravity;

    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio,
      },
    });

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;

    // Boundary walls (invisible but physical)
    const walls = [
      Bodies.rectangle(width / 2, -50, width, 100, { isStatic: true }),
      Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true }),
      Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true }),
      Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true }),
    ];
    Composite.add(engine.world, walls);

    // Initial balls
    const balls = Array.from({ length: count }).map(() => {
      const radius = Math.random() * (maxSize - minSize) + minSize;
      const x = Math.random() * (width - radius * 2) + radius;
      const y = Math.random() * (height - radius * 2) + radius;
      const color = colors[Math.floor(Math.random() * colors.length)];

      return Bodies.circle(x, y, radius, {
        restitution: wallBounce,
        friction: friction,
        render: {
          fillStyle: color,
        },
      });
    });
    Composite.add(engine.world, balls);

    // Interaction
    if (followCursor) {
      const mouse = Mouse.create(render.canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.1,
          render: {
            visible: false,
          },
        },
      });
      Composite.add(engine.world, mouseConstraint);
      render.mouse = mouse;
    }

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.offsetWidth;
      const newHeight = containerRef.current.offsetHeight;
      
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      Render.setPixelRatio(render, window.devicePixelRatio);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Engine.clear(engine);
      Runner.stop(runner);
    };
  }, [count, minSize, maxSize, colors, gravity, friction, wallBounce, followCursor]);

  return (
    <div ref={containerRef} className="ballpit-container opacity-20 dark:opacity-30">
      <canvas ref={canvasRef} />
    </div>
  );
}
