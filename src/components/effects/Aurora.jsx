import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';
import './Aurora.css';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uAmplitude;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
    dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

vec3 colorPalette(float t, ColorStop stops[3]) {
  if (t <= stops[0].position) return stops[0].color;
  if (t >= stops[2].position) return stops[2].color;
  if (t < stops[1].position) {
    float factor = (t - stops[0].position) / (stops[1].position - stops[0].position);
    return mix(stops[0].color, stops[1].color, factor);
  } else {
    float factor = (t - stops[1].position) / (stops[2].position - stops[1].position);
    return mix(stops[1].color, stops[2].color, factor);
  }
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop stops[3];
  stops[0] = ColorStop(uColorStops[0], 0.0);
  stops[1] = ColorStop(uColorStops[1], 0.5);
  stops[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor = colorPalette(uv.x, stops);
  
  float height = uv.y;
  float wave = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.05)) * uAmplitude;
  
  float auroraIntensity = smoothstep(0.0, 0.4 + wave, height) * (1.0 - smoothstep(0.4 + wave, 1.0, height));
  
  vec3 finalColor = mix(vec3(0.0), rampColor, auroraIntensity * uBlend);
  
  fragColor = vec4(finalColor, auroraIntensity * uBlend);
}
`;

export default function Aurora(props) {
  const {
    colorStops = ["#7dd3fc", "#5eead4", "#e0f2fe"],
    amplitude = 1.0,
    blend = 0.5,
    speed = 0.5,
    className = ""
  } = props;
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const cStops = colorStops.map(hex => new Color(hex));

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: cStops },
        uResolution: { value: [container.offsetWidth, container.offsetHeight] },
        uBlend: { value: blend }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    let animationFrameId;

    function resize() {
      if (!container) return;
      const width = container.offsetWidth || 1;
      const height = container.offsetHeight || 1;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    }
    window.addEventListener('resize', resize);
    resize();

    function update(t) {
      program.uniforms.uTime.value = t * 0.001 * speed;
      renderer.render({ scene: mesh });
      animationFrameId = requestAnimationFrame(update);
    }
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (gl.canvas.parentNode) {
        gl.canvas.parentNode.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [amplitude, blend, colorStops, speed]);

  return <div ref={containerRef} className={`aurora-container ${className}`} />;
}
