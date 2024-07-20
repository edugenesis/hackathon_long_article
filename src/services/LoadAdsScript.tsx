import { onMount } from "solid-js";

export function LoadAdsScript() {
  let div: HTMLDivElement | undefined;

  onMount(() => {
    if (!div) throw Error('script div not found');

    const script = document.createElement('script');
    script.src = 'https://cdn.amomama.de/hackathon/scripts/adv.min.js';
    div.appendChild(script);
  });

  return <div ref={div} />;
}
