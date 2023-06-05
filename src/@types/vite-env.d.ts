interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_ENV_AND_ENVLOCAL_VALUE: string;
  readonly VITE_ENV_VALUE: string;
  readonly VITE_MYID: number;
  readonly VITE_API_KEY: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_DATABASE_URL: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_STORAGE_BUCKET: string;
  readonly VITE_MESSAGING_SENDER_ID: string;
  readonly VITE_APP_ID: string;
  readonly VITE_MEASUREMENT_ID: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
