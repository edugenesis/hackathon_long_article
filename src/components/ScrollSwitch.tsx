import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from '~/components/ui/switch';
import { scrollableStore, setScrollableStore } from '~/stores/scrollStore';
import { createEffect } from 'solid-js';

const scrollOffsetPX = 15;
const scrollFunctionTriggerInterval = 350;

export function ScrollSwitch() {
  function scrollHandler() {
    if (!scrollableStore.enabled) return;
    const newOffset = window.scrollY + scrollOffsetPX;
    scrollTo({
      top: newOffset,
      behavior: 'smooth'
    });
  }

  createEffect(() => {
    const scrollInterval = setInterval(() => {
      requestAnimationFrame(() => {});
      scrollHandler();
    }, scrollFunctionTriggerInterval);

    return () => clearInterval(scrollInterval);
  });

  return (
    <Switch
      class="flex items-center space-x-2 fixed bottom-6 right-6"
      onChange={() => {
        setScrollableStore((prev) => ({
          ...prev,
          enabled: !prev.enabled
        }));
      }}>
      <SwitchLabel>Scrollable</SwitchLabel>
      <SwitchControl checked={scrollableStore.enabled}>
        <SwitchThumb />
      </SwitchControl>
    </Switch>
  );
}
