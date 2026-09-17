import { usePathname } from "wouter/use-browser-location";
import { Button } from "../ui/button";
import { Flex } from "./layout";
import { Link } from "wouter";

function Navbar() {
  const pathname = usePathname();

  return (
    <Flex className="app-navbar border-b border-border py-2 px-1 max-h-10 h-10 justify-between items-center gap-6">
      <Flex className="items-center gap-1">
        <img src="/logo.svg" alt="brand logo" height={24} width={24} />
        <span className="text-base font-bold">CV.</span>
      </Flex>

      <Flex>
        {pathname === "/" ? (
          <Link href="/editor">
            <Button size="xs">Lunch Editor</Button>
          </Link>
        ) : (
          <>
            <Link href="/">
              <Button size="xs">Dashboard</Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default Navbar;
