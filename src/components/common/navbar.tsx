import { usePathname } from "wouter/use-browser-location";
import { Button } from "../ui/button";
import { Flex } from "./layout";
import { Link, useLocation } from "wouter";
import Menu from "@/features/dashboard/components/Menu";
import { cn } from "cn";
import { ArrowLeft, Plus, Search } from "lucide-react";
import MobileMenu from "@/features/editor/components/MobileMenu";
import { useCommonActions } from "@/store";
import { Kbd } from "../ui/kbd";
import useCreateResume from "@/hooks/useCreateResume";
import { toast } from "../ui/toast";
import { getErrorMessage } from "@/utils/error";

function Navbar() {
  const pathname = usePathname();
  const isEditorPath = pathname.startsWith("/editor");
  const { toggleCommandCenter } = useCommonActions();
  const createNewResume = useCreateResume();
  const [_, navigate] = useLocation();

  async function handleCreateResume() {
    try {
      const res = await createNewResume();
      if (res) {
        navigate(`/editor?id=${res.id}`);
      }
    } catch (error) {
      toast.add({
        type: "error",
        title: getErrorMessage(
          error,
          "Failed to create resume. Please try again.",
        ),
      });
    }
  }

  return (
    <Flex className="app-navbar py-2 px-1 max-h-10 h-10 justify-between items-center gap-6 border-b border-b-muted-foreground/10 relative">
      <Flex className="items-center gap-1">
        <img src="/logo.svg" alt="brand logo" height={24} width={24} />
        <span className="text-base font-bold">CV.</span>
      </Flex>

      {!isEditorPath && (
        <Button
          variant="outline"
          className={cn(
            "absolute transition duration-300 origin-center rounded-full min-w-32 justify-start text-muted-foreground",
            !isEditorPath
              ? "left-1/2 -translate-x-1/2"
              : "left-16 translate-x-20",
          )}
          onClick={toggleCommandCenter}
        >
          <Search />
          Search...
          <Kbd className="ml-3">Ctrl+K</Kbd>
        </Button>
      )}

      {isEditorPath && (
        <div className="hidden min-[26rem]:inline-flex">
          <Menu />
        </div>
      )}

      <Flex className="hidden gap-4 min-[26rem]:flex">
        {pathname === "/" ? (
          <Button
            className="bg-neutral-444748 text-white rounded-xs"
            size="sm"
            onClick={handleCreateResume}
          >
            <Plus size={20} />
            New CV
          </Button>
        ) : (
          <>
            <Link href="/" className="hidden min-[26rem]:inline-flex">
              <Button variant="secondary">
                <ArrowLeft />
                <span className="hidden min-[32rem]:inline-flex text-xs">
                  Dashboard
                </span>
              </Button>
            </Link>
          </>
        )}
      </Flex>
      {/* Editor menu for smaller screen */}
      <div className="min-[26rem]:hidden">
        <MobileMenu />
      </div>
    </Flex>
  );
}

export default Navbar;
