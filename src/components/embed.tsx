﻿import Embedo from 'embedo';
import { onMount } from 'solid-js';

const embedo = new Embedo({
    twitter: true,
    instagram: true,
    pinterest: true
});

export function Embed(props: { url: string }) {
    let div: HTMLDivElement | undefined;

    onMount(async () => {
        if (!div) throw Error('div not found');

        const load = embedo.load(div, props.url, {});
    });

    return <div ref={div}/>;
}
