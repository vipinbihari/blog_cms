// This file provides basic Node type declarations to satisfy TypeScript

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    [key: string]: string | undefined;
  }
  
  interface Process {
    env: ProcessEnv;
  }
}

declare var process: NodeJS.Process;

declare module 'node' {
  export = NodeJS;
}
