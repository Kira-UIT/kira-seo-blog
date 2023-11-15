declare global {
  namespace NodeJS {
    interface ProcessEnv {
      OPENAI_API_KEY: string | undefined;
      AUTH0_SECRET: string | undefined;
      AUTH0_BASE_URL: string | undefined;
      AUTH0_ISSUER_BASE_URL: string | undefined;
      AUTH0_CLIENT_ID: string | undefined;
      AUTH0_CLIENT_SECRET: string | undefined;
      MONGODB_URI: string | undefined;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string | undefined;
      STRIPE_SECRET_KEY: string | undefined;
      STRIPE_WEBHOOK_SECRET: string | undefined;
    }
  }

  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>;
  }
}

export {};
