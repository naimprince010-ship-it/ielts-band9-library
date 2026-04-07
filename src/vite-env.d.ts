/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Comma-separated emails treated as admin + full premium (client-side UI gating). */
  readonly VITE_ADMIN_EMAILS?: string;
}
