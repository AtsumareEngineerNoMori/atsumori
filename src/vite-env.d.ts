interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_ENV_AND_ENVLOCAL_VALUE: string;
  readonly VITE_ENV_VALUE: string;
  readonly VITE_MYID: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
