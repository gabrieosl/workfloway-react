declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_BACKEND_URL: string;
    }
  }
}
export {};
