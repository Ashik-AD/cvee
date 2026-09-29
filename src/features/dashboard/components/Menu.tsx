import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { menu } from "@/constants/menubar";
import useMapMenuAactionStatus from "@/hooks/useMapMenuActionStatus";
import useMenu from "@/hooks/useMenu";
import useMenuActions from "@/hooks/useMenuActions";
import { Check } from "lucide-react";

function Menu() {
  const { isMenuActionEnabled } = useMenu();
  const { execMenuAction } = useMenuActions();
  const mapActionStatus = useMapMenuAactionStatus();
  return (
    <Menubar className="rounded-2xl px-0! py-0! h-fit hover:bg-current/10 backdrop-blur-xl hover:shadow-lg shadow-document-foreground transition-all duration-500">
      {menu.map((mn) => {
        return (
          <MenubarMenu key={mn.name}>
            <MenubarTrigger className="text-xs gap-1.5 items-center px-2.5 py-2 rounded-2xl hover:ring transition-all duration-400 hover:bg-current/20">
              <mn.icon size={14} />
              <span className="leading-0">{mn.name}</span>
            </MenubarTrigger>
            <MenubarContent className="w-fit">
              {mn.actions.map((action, idx) => {
                if (action?.type === "separator") {
                  return <MenubarSeparator key={`sep_${idx}`} />;
                }
                const disabled = !isMenuActionEnabled(action.key);
                const status = mapActionStatus(action.key);
                return (
                  <MenubarItem
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
                        <MenubarShortcut>{action.cmd}</MenubarShortcut>
                      )}
                      {status && status.active && (
                        <Check size={8} className="text-neutral-6B6B6B" />
                      )}
                    </span>
                  </MenubarItem>
                );
              })}
            </MenubarContent>
          </MenubarMenu>
        );
      })}
    </Menubar>
  );
}

export default Menu;
