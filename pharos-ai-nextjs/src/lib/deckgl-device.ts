/**
 * Force luma.gl (DeckGL v9) to use WebGL2 instead of WebGPU.
 *
 * DeckGL v9 probes WebGPU first. When navigator.gpu.requestAdapter() returns
 * null (Electron, VMs, older GPUs), luma crashes reading adapter.limits
 * before it can fall back to WebGL2.
 *
 * Fix: register the webgl2Adapter and call enforceWebGL2() so luma never
 * attempts the WebGPU path.
 *
 * Import this at the top of any file that renders a DeckGL component.
 * Gated on typeof window — safe to import in SSR.
 *
 * Also guarded against double-initialization: Next.js Turbopack (HMR) can
 * re-evaluate this module during dev, which would trigger "luma.gl has
 * already been initialized". A window-level flag prevents that.
 */

type WindowWithLuma = Window & { __lumaGlInitialized?: boolean };

if (typeof window !== 'undefined') {
  const win = window as WindowWithLuma;

  if (!win.__lumaGlInitialized) {
    win.__lumaGlInitialized = true;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { luma } = require('@luma.gl/core') as {
      luma: {
        registerAdapters: (adapters: unknown[]) => void;
        enforceWebGL2: () => void;
      };
    };
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { webgl2Adapter } = require('@luma.gl/webgl') as {
      webgl2Adapter: unknown;
    };

    luma.registerAdapters([webgl2Adapter]);
    luma.enforceWebGL2();
  }
}

export {};
