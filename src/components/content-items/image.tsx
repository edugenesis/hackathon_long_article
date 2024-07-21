import { createSignal, Show } from 'solid-js';
import { LazyOffloading } from '../LazyOffloading';

export let isBannerSet: boolean = false;

export function Image(props: { src: string; optimize: boolean; isBanner: boolean; lazy: boolean }) {
  const [showImg, setShowImg] = createSignal(false);

  function init(isInitedOnce: boolean) {
    setShowImg(true);
  }

  function destroy() {
    setShowImg(false);
  }

  if (props.isBanner) isBannerSet = true;

  return (
    <LazyOffloading init={init} destroy={destroy} optimize={props.optimize}>
      <Show when={showImg()}>
        <img
          src={props.src}
          alt=""
          class={`h-auto rounded-lg ${props.isBanner ? 'w-full object-cover h-[320px] ' : 'w-[75%]'} mx-auto`}
          loading={props.lazy ? 'lazy' : 'eager'}
        />
      </Show>
    </LazyOffloading>
  );
}
