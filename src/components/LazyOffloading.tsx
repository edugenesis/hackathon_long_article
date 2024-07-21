import { createSignal, onCleanup, onMount } from 'solid-js';

export function LazyOffloading(props: {
  init: (isInitedOnce: boolean) => void;
  destroy: () => void;
  optimize: boolean;
  children: any | undefined;
}) {
  let div: HTMLDivElement | undefined;

  const [inited, setInited] = createSignal(false);
  const [initedOnce, setInitedOnce] = createSignal(false);

  async function init() {
    setInited(true);

    props.init(initedOnce());

    setInitedOnce(true);
  }

  function destroy() {
    setInited(false);
    props.destroy();
  }

  let observer: IntersectionObserver;
  onMount(async () => {
    if (!div) return;

    if (!props.optimize) {
      props.init(false);
      return;
    }

    const viewportMargin = window.innerHeight * 0.2;

    observer = new IntersectionObserver(
      (el) => {
        const isIntersecting = el[0].isIntersecting;
        if (isIntersecting && !inited()) {
          init();
        }
        if (!isIntersecting && inited()) {
          destroy();
        }
      },
      {
        rootMargin: `${viewportMargin}px 0px ${viewportMargin}px 0px`,
        threshold: 0.001
      }
    );
    observer.observe(div);
  });

  onCleanup(() => {
    if (!div || !observer) return;
    observer.unobserve(div);
  });

  return <div ref={div}>{props.children}</div>;
}
