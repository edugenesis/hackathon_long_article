import { onMount } from 'solid-js';
import { initPbJS } from '~/components/ad_helpers';

export function LoadAdsScript() {
  onMount(() => {
    console.log('[component] initing pbjs');
    initPbJS();
    console.log('[component] pbjs inited');
  });

  return <div />;
}
