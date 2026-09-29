import { usePathname } from "wouter/use-browser-location";
import { Button } from "../ui/button";
import { Flex } from "./layout";
import { Link } from "wouter";
import Menu from "@/features/dashboard/components/Menu";
import Searchbar from "./Searchbar";
import { cn } from "cn";
import { Plus } from "lucide-react";

function Navbar() {
  const pathname = usePathname();
  const isEditorPath = pathname.startsWith("/editor");

  function handleChange(searchTerm: string) {
    console.log(searchTerm);
  }

  return (
    <Flex className="app-navbar py-2 px-1 max-h-10 h-10 justify-between items-center gap-6 border-b border-b-muted-foreground/10 relative">
      <Flex className="items-center gap-1">
        <img src="/logo.svg" alt="brand logo" height={24} width={24} />
        <span className="text-base font-bold">CV.</span>
      </Flex>

      <div
        className={cn(
          "absolute transition duration-300 origin-center",
          !isEditorPath
            ? "left-1/2 -translate-x-1/2"
            : "left-16 translate-x-20",
        )}
      >
        <Searchbar onChange={handleChange} />
      </div>

      {isEditorPath && <Menu />}

      <Flex>
        {pathname === "/" ? (
          <Link href="/editor">
            <Button className="bg-neutral-444748 text-white rounded-xs" size="sm">
              <Plus size={20} />
              New CV
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/">
              <Button>Dashboard</Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default Navbar;
