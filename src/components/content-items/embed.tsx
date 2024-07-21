import Embedo from 'embedo';
import { LazyOffloading } from '../LazyOffloading';

export function Embed(props: { url: string; optimize: boolean }) {
  let wrapper: HTMLDivElement | undefined;

  async function init(isInitedOnce: boolean) {
    if (!wrapper) throw Error('embed div not found');
    let embedo = new Embedo({
      twitter: true,
      instagram: true,
      pinterest: true
    });

    embedo.load(wrapper, props.url, {});
    embedo = null;
  }

  function destroy() {
    if (!wrapper) throw Error('embed div not found');

    const height = wrapper.offsetHeight;
    wrapper.style.height = `${height}px`;

    while (wrapper.firstChild) {
      wrapper.removeChild(wrapper.firstChild);
    }
  }

  return (
    <LazyOffloading init={init} destroy={destroy} optimize={props.optimize}>
      <div ref={wrapper}></div>
    </LazyOffloading>
  );
}
