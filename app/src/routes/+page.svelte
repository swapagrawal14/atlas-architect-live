<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    // NEECHE WALI LINE THEEK KAR DI GAYI HAI
    import init, { generate_elevation_data } from '$lib/wasm/generator.js';

    let canvas;
    let isReady = false;
    
    let config = { width: 300, height: 300, seed: 1, scale: 5.0, octaves: 4 };

    onMount(async () => {
        if (browser) {
            await init();
            isReady = true;
            generateAndDraw();
        }
    });

    function generateAndDraw() {
        if (!isReady) return;
        const elevationData = generate_elevation_data(config.width, config.height, config.seed, config.scale, config.octaves);
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
</script>
<main>
    <h1>World Generator</h1>
    <canvas bind:this={canvas} width={config.width} height={config.height}></canvas>
    {#if !isReady}
        <p>Loading Engine...</p>
    {:else}
        <div class="controls">
            <label>Scale: <input type="range" bind:value={config.scale} min="1" max="20" step="0.1" on:input={generateAndDraw}></label>
            <label>Seed: <input type="number" bind:value={config.seed} on:input={generateAndDraw}></label>
            <button on:click={() => {config.seed = Math.floor(Math.random()*10000); generateAndDraw();}}>Random</button>
        </div>
    {/if}
</main>
<style>
    main { text-align: center; padding: 1em; font-family: sans-serif; }
    .controls { margin: 1em; display: flex; flex-direction: column; gap: 1em; align-items: center; }
    canvas { border: 1px solid #ccc; max-width: 100%; }
</style>
