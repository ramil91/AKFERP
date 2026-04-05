/// <reference types="vite/client" />

/** Vite injects env at build time; define optional keys you read in app code. */
interface ImportMetaEnv {
  readonly VITE_API_URL: string | undefined;
  /** When "true", auth uses in-memory mock instead of HTTP. */
  readonly VITE_USE_MOCK_AUTH: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
