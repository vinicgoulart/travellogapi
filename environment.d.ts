declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      URI: string;
      SECRET: string
    }
  }
}
  
export {}
