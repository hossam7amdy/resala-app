import { configuration } from '@/configuration';
import { CloudFrontAdapter } from '@/infrastructure/cdn-provider';
import { PrismaDBConfig } from '@/infrastructure/database';

const DataStoreSingleton = () => {
  const cdn = new CloudFrontAdapter({ baseUrl: configuration().cdnBaseUrl });

  return new PrismaDBConfig(configuration()).$extends({
    result: {
      product: {
        imageUrl: {
          needs: { mediaId: true },
          compute: ({ mediaId }) => cdn.generateUrl(mediaId),
        },
      },
      productImage: {
        imageUrl: {
          needs: { mediaId: true },
          compute: ({ mediaId }) => cdn.generateUrl(mediaId),
        },
      },
    },
  });
};

declare const globalThis: {
  dbGlobal: ReturnType<typeof DataStoreSingleton>;
} & typeof global;

export const db = globalThis.dbGlobal ?? DataStoreSingleton();
export type DataStore = typeof db;

if (process.env.NODE_ENV !== 'production') globalThis.dbGlobal = db;
