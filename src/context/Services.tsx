import { Database } from "@/lib/database";
import { Services } from "@/lib/service";
import { createContext, useEffect, useState, type ReactNode } from "react";

type Context = {
  services: Services | null;
};
export const ServicesContext = createContext<Context>({
  services: null,
});

const DB_NAME = "cvee";
export default function ServicesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [services, setServices] = useState<Services | null>(null);

  // initialize DB & Services
  useEffect(() => {
    const initDB = new Database(DB_NAME);
    initDB
      .connect()
      .then((conn) => {
        const srv = new Services(conn);
        setServices(srv);
      })
      .catch(console.error);
    return () => {};
  }, []);

  return (
    <ServicesContext.Provider value={{ services }}>
      {children}
    </ServicesContext.Provider>
  );
}
