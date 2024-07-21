import { LazyOffloading } from '../LazyOffloading';

export let isBannerSet: boolean = false;

export function Image(props: { src: string; optimize: boolean, isBanner: boolean }) {
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
  
  if (props.isBanner && !isBannerSet) isBannerSet = true;
  
  return (
    <LazyOffloading init={init} destroy={destroy} optimize={props.optimize}>
      <img src={props.src} alt="" class={`h-auto rounded-lg ${props.isBanner ? 'w-full h-80 object-cover' : 'w-[75%]'} mx-auto`} loading="lazy" ref={img}/>
    </LazyOffloading>
  );
}
