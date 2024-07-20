import Embedo from 'embedo';
import { onMount } from 'solid-js';
import url from 'node:url';

const embedo = new Embedo({
  twitter: true,
  instagram: true,
  pinterest: true
});

export function Embed(props: { url: string, optimize: boolean }) {
  // let div: HTMLDivElement | undefined;
  //
  // onMount(async () => {
  //   if (!div) throw Error('embed div not found');
  //
  //   embedo.load(div, props.url);
  //
  //   const iframe = div.getElementsByTagName('iframe')[0];
  //
  //   iframe.attributes.setNamedItem('loading=lazy');
  // });

  return <iframe src={`https://twitframe.com/show?url=${props.url}`} height={700} loading="lazy" />;
}
// return <iframe height={700} width={400} loading="lazy" src={`https://twitframe.com/show?url=${url}`} />;
