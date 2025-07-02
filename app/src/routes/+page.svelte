<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import init, { generate_elevation_data } from 'generator';

  let canvas;
  let isReady = false;

  let config = {
    width: 300,
    height: 300,
    seed: 1,
    scale: 5.0,
    octaves: 4
  };

  onMount(async () => {
    if (browser) {
      await init();
      isReady = true;
      generateAndDraw();
    }
  });

  function generateAndDraw() {
    if (!isReady) return;
    const elevationData = generate_elevation_data(
      config.width,
      config.height,
      config.seed,
      config.scale,
      config.octaves
    );
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(config.width, config.height);
    for (let i = 0; i < elevationData.length; i++) {
      const color = elevationData[i] * 255;
      imageData.data[i * 4] = color;
      imageData.data[i * 4 + 1] = color;
      imageData.data[i * 4 + 2] = color;
      imageData.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function randomizeSeed() {
    config.seed = Math.floor(Math.random() * 100000);
    generateAndDraw();
  }
</script>

<main>
  <h1>Atlas Architect: World Generator</h1>
  <canvas
    bind:this={canvas}
    width={config.width}
    height={config.height}
    aria-label="World elevation map"
  ></canvas>
  {#if !isReady}
    <p>Loading Engine...</p>
  {:else}
    <div class="controls">
      <label>
        <span>Scale:</span>
        <input
          type="range"
          bind:value={config.scale}
          min="1"
          max="20"
          step="0.1"
          on:input={generateAndDraw}
        />
        <span>{config.scale}</span>
      </label>
      <label>
        <span>Seed:</span>
        <input
          type="number"
          bind:value={config.seed}
          min="0"
          max="100000"
          on:input={generateAndDraw}
        />
      </label>
      <label>
        <span>Octaves:</span>
        <input
          type="number"
          bind:value={config.octaves}
          min="1"
          max="8"
          on:input={generateAndDraw}
        />
      </label>
      <button on:click={randomizeSeed}>Random Seed</button>
    </div>
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 2em 1em;
    font-family: system-ui, sans-serif;
    background: #f9fafb;
    min-height: 100vh;
  }
  .controls {
    margin: 1.5em auto 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;
    max-width: 320px;
  }
  label {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-weight: 500;
  }
  canvas {
    border: 1px solid #bbb;
    background: #fff;
    max-width: 100%;
    margin: 1em auto;
    display: block;
  }
  button {
    padding: 0.35em 1.2em;
    border: none;
    border-radius: 4px;
    background: #2563eb;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }
  button:hover {
    background: #1e40af;
  }
</style>
