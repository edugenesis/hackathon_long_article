import { LazyOffloading } from '../LazyOffloading';
import { isPbJSInited, requestBids, runAdUnit } from '../../lib/ad_helpers';

export function Advert(props: { id: string; optimize: boolean }) {
  let div: HTMLDivElement | undefined;

  async function init(isInitedOnce: boolean) {
    while (!isPbJSInited()) {
      await new Promise((r) => setTimeout(r, 100));
    }

    if (isInitedOnce) {
      requestBids(props.id);
    } else {
      runAdUnit(props.id);
    }
  }

  function destroy() {
    const height = div!.offsetHeight;
    div!.style.height = `${height}px`;

    while (div!.firstChild) {
      div!.removeChild(div!.firstChild);
    }
  }

  return (
    <LazyOffloading init={init} destroy={destroy} optimize={props.optimize}>
      <div id={props.id} class="p-4 border border-gray-200 rounded-lg" style="min-height: 220px" ref={div}></div>
    </LazyOffloading>
  );
}
