import { onMount } from 'solid-js';

export function Video(props: { id: string }) {
    let div: HTMLDivElement | undefined;

    onMount(() => {
        if (!div) throw Error('video div not found');
        const vidazoo = document.createElement('script');
        vidazoo.async = true;
        vidazoo.src = 'https://static.vidazoo.com/basev/vwpt.js';
        vidazoo.setAttribute('data-widget-id', '5f7c82bd819a8b00049dd9d6');
        div.appendChild(vidazoo);
    });

    return <div id={props.id} ref={div}></div>;
}
