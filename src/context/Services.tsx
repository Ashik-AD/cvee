import { createContext, useEffect, useState, type ReactNode } from 'react';
import { Database } from '@/lib/database';
import { Repositories } from '@/lib/repository/repositories';
import { Services } from '@/lib/service/services';

const DB_NAME = 'cvee';

type Context = {
  services: Services | null;
};
export const ServicesContext = createContext<Context>({
  services: null,
});

export default function ServicesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [services, setServices] = useState<Services | null>(null);
  const [isInitializing, setInitializing] = useState(false);

  // initialize DB & Services
  useEffect(() => {
    async function initServices() {
      try {
        setInitializing(true);
        const initDB = new Database(DB_NAME);
        const conn = await initDB.connect();
        // Initialize repositories
        const repositories = new Repositories(conn);

        // initialize services
        const srv = new Services(repositories);

        setServices(srv);
      } catch (error) {
        // eslint-disable-next-line no-console expose error in prod. for debug
        console.error('Failed initialize db: ', error);
      } finally {
        setInitializing(false);
      }
    }
    void initServices();
  }, []);

  return (
    <ServicesContext.Provider value={{ services }}>
      {isInitializing ? `loading...` : children}
    </ServicesContext.Provider>
  );
}
