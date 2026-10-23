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
    if (isInitializing) return;
    setInitializing(true);
    const initDB = new Database(DB_NAME);
    initDB
      .connect()
      .then((conn) => {
        // Initialize repositories
        const repositories = new Repositories(conn);

        // initialize services
        const srv = new Services(repositories);

        setServices(srv);
        setInitializing(false);
      })
      .catch((err) => {
        console.error('Failed initialize db: ', err);
        setInitializing(false);
      });
  }, []);

  return (
    <ServicesContext.Provider value={{ services }}>
      {children}
    </ServicesContext.Provider>
  );
}
