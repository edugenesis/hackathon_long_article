import { createSignal, onCleanup, onMount } from 'solid-js';
import { destroyAdUnit, isPbJSInited, requestBids, runAdUnit } from './ad_helpers';

export function Advert(props: { id: string }) {
  let div: HTMLDivElement | undefined;

  const [inited, setInited] = createSignal(false);
  const [initedOnce, setInitedOnce] = createSignal(false);

  async function initAd() {
    setInited(true);

    while (!isPbJSInited()) {
      await new Promise((r) => setTimeout(r, 100));
    }

    if (initedOnce()) {
      requestBids(props.id);
    } else {
      runAdUnit(props.id);
    }

    setInitedOnce(true);
  }

  function destroyAd() {
    setInited(false);

    while (div!.firstChild) {
      div!.removeChild(div!.firstChild);
    }
  }

  let observer: IntersectionObserver;
  onMount(async () => {
    if (!div) return;

    const viewportHeight = window.innerHeight;

    observer = new IntersectionObserver(
      (el) => {
        const isIntersecting = el[0].isIntersecting;
        if (isIntersecting && !inited()) {
          initAd();
        }
        if (!isIntersecting && inited()) {
          destroyAd();
        }
      },
      {
        rootMargin: `${viewportHeight}px 0px ${viewportHeight}px 0px`,
        threshold: 0.01
      }
    );
    observer.observe(div);
  });

  onCleanup(() => {
    if (!div || !observer) return;
    observer.unobserve(div);
  });

  return (
    <div id={props.id} class="p-4 border border-gray-200 rounded-lg" style="min-height: 280px" ref={div}>
      {inited()}
    </div>
  );
}
