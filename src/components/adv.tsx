﻿import { onMount } from 'solid-js';
import { runAdUnit } from './ad_helpers';

export function Advert(props: { id: string }) {
  onMount(async () => {
    // if (Math.random() > 0.1) return;
    await new Promise((r) => setTimeout(r, 2000));
    runAdUnit(props.id);
    console.log('loading ad', props.id);
  });

  return (
    <div id={props.id} class="p-4 border border-gray-200 rounded-lg" style="min-height: 280px"></div>
  );
}
