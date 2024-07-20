import Embedo from 'embedo';

const embedo = new Embedo({
  twitter: true,
  instagram: true,
  pinterest: true
});

import { createSignal, onCleanup, onMount, createEffect } from 'solid-js';

export function Embed(props: { url: string, optimize: boolean}) {
  let wrapper: HTMLDivElement | undefined;

  const [inited, setInited] = createSignal(false);

  async function initEmbed() {
    setInited(true);
    if (!wrapper) throw Error('embed div not found');

    embedo.load(wrapper, props.url, {});
  }

  function destroyEmbed() {
    setInited(false);

    const height = wrapper!.offsetHeight;
    wrapper!.style.height = `${height}px`;
  }

  let observer: IntersectionObserver;
  onMount(async () => {
    if (!wrapper) return;

    if (window.location.href.includes('?regular') || !props.optimize) {
      console.log('regular embed view');
      initEmbed();

      return;
    }

    const viewportHeight = window.innerHeight;

    observer = new IntersectionObserver(
      (el) => {
        const isIntersecting = el[0].isIntersecting;

        console.log('intersercting', isIntersecting);
        if (isIntersecting && !inited()) {
          initEmbed();
        }
        if (!isIntersecting && inited()) {
          destroyEmbed();
        }
      },
      {
        rootMargin: `${viewportHeight}px 0px ${viewportHeight}px 0px`,
        threshold: 0.01
      }
    );
    observer.observe(wrapper);
  });

  onCleanup(() => {
    if (!wrapper || !observer) return;
    observer.unobserve(wrapper);
  });

  return (
    <>
      <div ref={wrapper}></div>
    </>
  );
}
