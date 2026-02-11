import { useEffect, useRef } from 'react';
import angelDark from "@/assets/angel-dark.png";

const vertexShader = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision mediump float;
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform sampler2D iChannel0;

varying vec2 vUv;

// Simplex noise function
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = vUv;
    
    // Mouse interaction
    vec2 mouse = iMouse / iResolution;
    float dist = distance(uv, mouse);
    float mouseEffect = smoothstep(0.4, 0.0, dist) * 0.05;
    
    // Liquid distortion
    float noise1 = snoise(uv * 3.0 + iTime * 0.1);
    float noise2 = snoise(uv * 6.0 - iTime * 0.2);
    
    vec2 displacement = vec2(noise1, noise2) * (0.02 + mouseEffect);
    
    vec2 distortedUv = uv + displacement;
    
    // Chromatic aberration
    float r = texture2D(iChannel0, distortedUv + vec2(0.002, 0.0)).r;
    float g = texture2D(iChannel0, distortedUv).g;
    float b = texture2D(iChannel0, distortedUv - vec2(0.002, 0.0)).b;
    
    vec3 color = vec3(r, g, b);
    
    // Vignette
    float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5) * 1.5);
    color *= vignette;
    
    // Darken
    color = mix(color, vec3(0.0), 0.3);
    
    gl_FragColor = vec4(color, 1.0);
}
`;

const HeroBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) return;

        const program = gl.createProgram();
        if (!program) return;

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vs = createShader(gl.VERTEX_SHADER, vertexShader);
        const fs = createShader(gl.FRAGMENT_SHADER, fragmentShader);

        if (!vs || !fs) return;

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = new Float32Array([
            -1.0, -1.0,
            1.0, -1.0,
            -1.0, 1.0,
            -1.0, 1.0,
            1.0, -1.0,
            1.0, 1.0,
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const image = new Image();
        image.src = angelDark;
        image.onload = () => {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            render();
        };

        const startTime = Date.now();
        const iTimeLocation = gl.getUniformLocation(program, "iTime");
        const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
        const iMouseLocation = gl.getUniformLocation(program, "iMouse");

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        window.addEventListener('resize', resize);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: window.innerHeight - e.clientY }; // Flip Y for WebGL
        };
        window.addEventListener('mousemove', handleMouseMove);

        let animationId: number;
        const render = () => {
            gl.uniform1f(iTimeLocation, (Date.now() - startTime) * 0.001);
            gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
            gl.uniform2f(iMouseLocation, mouseRef.current.x, mouseRef.current.y);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationId = requestAnimationFrame(render);
        };

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
            gl.deleteProgram(program);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />;
};

export default HeroBackground;
