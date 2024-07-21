import { LazyOffloading } from '../LazyOffloading';

export function Image(props: { src: string; optimize: boolean }) {
  let img: HTMLImageElement | undefined;

  function init(isInitedOnce: boolean) {
    if (!img) return;
    img.setAttribute('src', props.src);
  }

  function destroy() {
    if (!img) return;

    const height = img!.offsetHeight;
    if (height != 0) img.style.height = `${height}px`;

    img.removeAttribute('src');
  }

  return (
    <LazyOffloading init={init} destroy={destroy} optimize={props.optimize}>
      <img alt="" class="h-auto rounded-lg" loading="lazy" ref={img} />
    </LazyOffloading>
  );
}
