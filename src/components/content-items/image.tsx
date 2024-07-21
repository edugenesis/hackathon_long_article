import { createSignal, Show } from 'solid-js';
import { LazyOffloading } from '../LazyOffloading';

export let isBannerSet: boolean = false;

export function Image(props: { src: string; optimize: boolean; isBanner: boolean }) {
  let wrapper: HTMLImageElement | undefined;

  const [showImg, setShowImg] = createSignal(false);

  function init(isInitedOnce: boolean) {
    setShowImg(true);
  }

  function destroy() {
    if (!wrapper) return;

    const height = wrapper!.offsetHeight;
    if (height != 0) wrapper.style.height = `${height}px`;

    setShowImg(false);
  }

  if (props.isBanner) isBannerSet = true;

  return (
    <LazyOffloading init={init} destroy={destroy} optimize={props.optimize}>
      <div ref={wrapper}>
        <Show when={showImg()}>
          <img
            src={props.src}
            alt=""
            class={`h-auto rounded-lg ${props.isBanner ? 'w-full object-cover h-[320px] ' : 'w-[75%]'} mx-auto`}
            loading="lazy"
          />
        </Show>
      </div>
    </LazyOffloading>
  );
}
