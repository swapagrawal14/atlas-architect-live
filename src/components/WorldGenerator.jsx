import React, { useRef, useEffect, useState } from "react";

// Simple 2D Perlin noise implementation for demo purposes
function lerp(a, b, t) {
  return a + t * (b - a);
}
function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function grad(hash, x, y) {
  const h = hash & 3;
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}
function perlin2(x, y, perm) {
  const xi = Math.floor(x) & 255;
  const yi = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = fade(xf);
  const v = fade(yf);

  const aa = perm[perm[xi] + yi];
  const ab = perm[perm[xi] + yi + 1];
  const ba = perm[perm[xi + 1] + yi];
  const bb = perm[perm[xi + 1] + yi + 1];

  const x1 = lerp(grad(aa, xf, yf), grad(ba, xf - 1, yf), u);
  const x2 = lerp(grad(ab, xf, yf - 1), grad(bb, xf - 1, yf - 1), u);

  return (lerp(x1, x2, v) + 1) / 2; // Normalize to [0,1]
}

function createPerm(seed) {
  // Simple seedable permutation table
  let perm = Array.from({ length: 256 }, (_, i) => i);
  let random = mulberry32(seed);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  return perm.concat(perm);
}
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function WorldGenerator() {
  const canvasRef = useRef(null);
  const [config, setConfig] = useState({
    width: 300,
    height: 300,
    seed: 1,
    scale: 5.0,
    octaves: 4
  });

  const [perm, setPerm] = useState(() => createPerm(config.seed));

  useEffect(() => {
    setPerm(createPerm(config.seed));
  }, [config.seed]);

  useEffect(() => {
    draw();
    // eslint-disable-next-line
  }, [config, perm]);

  function draw() {
    const { width, height, scale, octaves } = config;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imgData = ctx.createImageData(width, height);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let nx = x / width * scale;
        let ny = y / height * scale;
        let value = 0;
        let amplitude = 1;
        let frequency = 1;
        let max = 0;
        for (let o = 0; o < octaves; o++) {
          value += perlin2(nx * frequency, ny * frequency, perm) * amplitude;
          max += amplitude;
          amplitude /= 2;
          frequency *= 2;
        }
        value /= max;
        const color = Math.floor(value * 255);
        const idx = (y * width + x) * 4;
        imgData.data[idx] = color;
        imgData.data[idx + 1] = color;
        imgData.data[idx + 2] = color;
        imgData.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: name === "octaves" || name === "seed" ? parseInt(value) : parseFloat(value)
    }));
  }

  function randomizeSeed() {
    setConfig((prev) => ({
      ...prev,
      seed: Math.floor(Math.random() * 100000)
    }));
  }

  return (
    <div className="world-generator">
      <canvas
        ref={canvasRef}
        width={config.width}
        height={config.height}
        aria-label="World elevation map"
        style={{ border: "1px solid #bbb", background: "#fff", maxWidth: "100%" }}
      />
      <div className="controls">
        <label>
          Scale:
          <input
            type="range"
            name="scale"
            min="1"
            max="20"
            step="0.1"
            value={config.scale}
            onChange={handleChange}
          />
          <span>{config.scale}</span>
        </label>
        <label>
          Seed:
          <input
            type="number"
            name="seed"
            min="0"
            max="100000"
            value={config.seed}
            onChange={handleChange}
          />
        </label>
        <label>
          Octaves:
          <input
            type="number"
            name="octaves"
            min="1"
            max="8"
            value={config.octaves}
            onChange={handleChange}
          />
        </label>
        <button onClick={randomizeSeed}>Random Seed</button>
      </div>
    </div>
  );
}
