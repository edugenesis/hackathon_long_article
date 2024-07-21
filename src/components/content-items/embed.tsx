import Embedo from 'embedo';
import { LazyOffloading } from '../LazyOffloading';

export function Embed(props: { url: string; optimize: boolean }) {
  let div: HTMLDivElement | undefined;

  async function init(isInitedOnce: boolean) {
    if (!div) throw Error('embed div not found');
    let embedo = new Embedo({
      twitter: true,
      instagram: true,
      pinterest: true
    });

    embedo.load(div, props.url, {});
    embedo = null;
  }

  function destroy() {
    if (!div) throw Error('embed div not found');

    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  }

  return (
    <LazyOffloading init={init} destroy={destroy} optimize={props.optimize}>
      <div ref={div}></div>
    </LazyOffloading>
  );
}
