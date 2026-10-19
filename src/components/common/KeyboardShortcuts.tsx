import { Keyboard, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Flex, FlexColumn, Grid } from './layout';
import { Kbd } from '../ui/kbd';
import { KeyboardShortcutGroups } from '@/constants/keyboardShortcuts';
import { menu } from '@/constants/menubar';
import { useModalActions } from '@/store/modal';

function KeyboardShortcuts() {
  const { closeModal } = useModalActions();

  const mappedShortcuts = KeyboardShortcutGroups?.map((shortcutGrp) => {
    const mappedAction = shortcutGrp.actions?.map((act) => {
      let action;
      for (let i = 0; i < menu.length; i++) {
        action = menu[i]?.actions?.find(
          (actDef) => actDef?.type === 'action' && actDef.key === act,
        );
        if (action) break;
      }
      return action;
    });
    return {
      ...shortcutGrp,
      actions: mappedAction,
    };
  }).filter((shortcut) =>
    shortcut.actions?.some((act) => act?.type === 'action' && act.label),
  );

  return (
    <FlexColumn className="bg-neutral-131313 max-h-screen scrollbar-none gap-3 overflow-y-auto rounded-md border px-4 pb-4">
      <Flex className="bg-neutral-131313 sticky top-0 justify-between border-b py-4">
        <FlexColumn className="gap-2">
          <Flex className="items-center gap-2">
            <Keyboard className="text-gray-300" />
            <h2 className="font-semibold tracking-widest uppercase">
              Keyboard Shortcuts
            </h2>
          </Flex>
          <p className="text-muted-foreground">
            Some lazy sh*t for navigating and editing your CV.
          </p>
        </FlexColumn>
        <Flex className="items-center gap-2">
          <Button
            variant="ghost"
            className="size-6 rounded-full"
            onClick={closeModal}
          >
            <X />
          </Button>
          <Kbd>Esc</Kbd>
        </Flex>
      </Flex>

      <Grid className="gap-6 sm:grid-cols-2">
        {mappedShortcuts.map((shortcut) => {
          return (
            <FlexColumn className="gap-3" key={shortcut.label}>
              <Flex className="font-semibold tracking-wider uppercase">
                {shortcut.label}
              </Flex>

              <ul className="space-y-1">
                {shortcut.actions?.map((act) => {
                  if (act?.type === 'separator' || !act) return;
                  return (
                    <li key={act?.key}>
                      <Flex className="items-center justify-between gap-2 border-b py-1.5">
                        <span className="text-gray-300">{act?.label}</span>
                        {act?.cmd && (
                          <Flex className="gap-1">
                            {act?.cmd?.split('+')?.map((cmdKey) => {
                              return (
                                <Kbd key={`${act.key}_${cmdKey}`}>{cmdKey}</Kbd>
                              );
                            })}
                          </Flex>
                        )}
                      </Flex>
                    </li>
                  );
                })}
              </ul>
            </FlexColumn>
          );
        })}
      </Grid>
    </FlexColumn>
  );
}

export default KeyboardShortcuts;
