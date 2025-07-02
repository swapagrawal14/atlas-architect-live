use wasm_bindgen::prelude::*;
use noise::{NoiseFn, Fbm, Perlin};

#[wasm_bindgen]
pub fn generate_elevation_data(width: u32, height: u32, seed: u32, scale: f64, octaves: usize) -> Vec<f32> {
    console_error_panic_hook::set_once();
    let mut fbm = Fbm::<Perlin>::new(seed);
    fbm.octaves = octaves;
    let mut data = vec![0.0; (width * height) as usize];
    for y in 0..height {
        for x in 0..width {
            let nx = x as f64 / width as f64;
            let ny = y as f64 / height as f64;
            let noise_val = fbm.get([nx * scale, ny * scale]);
            data[(y * width + x) as usize] = ((noise_val + 1.0) / 2.0) as f32;
        }
    }
    data
}
