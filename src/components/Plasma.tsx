'use client';

import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

import './Plasma.css';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;

out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float t = uTime * 0.5;
  
  vec2 p = uv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;

  float v = 0.0;
  v += sin(p.x * 10.0 + t);
  v += sin((p.y * 10.0 + t) / 2.0);
  v += sin((p.x * 10.0 + p.y * 10.0 + t) / 2.0);
  
  p += vec2(0.5 * sin(t / 3.0), 0.5 * cos(t / 5.0));
  v += sin(sqrt(p.x * p.x + p.y * p.y) * 10.0 + t);
  
  v = v / 2.0;
  
  vec3 col = mix(uColor1, uColor2, sin(v * 3.14159) * 0.5 + 0.5);
  
  // High-end cinematic blend: low opacity for layering
  fragColor = vec4(col, 1.0);
}
`;

interface PlasmaProps {
  color1?: string;
  color2?: string;
  speed?: number;
  className?: string;
}

export default function Plasma({ 
  color1 = '#065f46', 
  color2 = '#10b981', 
  speed = 1.0,
  className = ''
}: PlasmaProps) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const propsRef = useRef({ color1, color2, speed });
  propsRef.current = { color1, color2, speed };

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({ 
      alpha: true, 
      antialias: true,
      premultipliedAlpha: true
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    
    const geometry = new Triangle(gl);
    
    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uColor1: { value: new Color(color1) },
        uColor2: { value: new Color(color2) },
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(gl.canvas);

    let animateId = 0;
    const update = (t: number) => {
      animateId = requestAnimationFrame(update);
      const { speed, color1, color2 } = propsRef.current;
      program.uniforms.uTime.value = t * 0.001 * speed;
      program.uniforms.uColor1.value.set(color1);
      program.uniforms.uColor2.value.set(color2);
      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    const resize = () => {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    };
    window.addEventListener('resize', resize);
    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={ctnDom} className={`plasma-container ${className}`} />;
}
