import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { menu } from "@/constants/menubar";
import useMapMenuAactionStatus from "@/hooks/useMapMenuActionStatus";
import useMenu from "@/hooks/useMenu";
import useMenuActions from "@/hooks/useMenuActions";
import { AlignRight, Check } from "lucide-react";

function MobileMenu() {
  const { isMenuActionEnabled } = useMenu();
  const { execMenuAction } = useMenuActions();
  const mapActionStatus = useMapMenuAactionStatus();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AlignRight />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {menu.map((mn) => {
            return (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <mn.icon />
                  {mn.name}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {mn.actions?.map((action) => {
                      if (action.type === "separator")
                        return <DropdownMenuSeparator />;

                      const disabled = !isMenuActionEnabled(action.key);
                      const status = mapActionStatus(action.key);
                      return (
                        <DropdownMenuItem
                          key={action.label}
                          disabled={disabled}
                          onClick={async () => {
                            await execMenuAction(action.key);
                          }}
                          className="gap-3 justify-between items-center-safe"
                        >
                          <span className="flex gap-1.5 items-center-safe">
                            {action.icon && <action.icon />}
                            {action.label}
                          </span>
                          <span className="flex gap-1">
                            {action.cmd && (
                              <DropdownMenuShortcut>
                                {action.cmd}
                              </DropdownMenuShortcut>
                            )}
                            {status && status.active && (
                              <Check size={8} className="text-neutral-6B6B6B" />
                            )}
                          </span>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MobileMenu;
