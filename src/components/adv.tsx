import { onMount } from 'solid-js';

export function Advert(props: { id: string }) {
    onMount(async () => {
        await new Promise((r) => setTimeout(r, 1000));
        console.log('loading ad', props.id);

        window.pbjs.que.push(function () {
            window.pbjs.requestBids({
                timeout: 1000,
                adUnitCodes: [props.id],
                bidsBackHandler: function () {
                    window.pbjs.setTargetingForGPTAsync([props.id]);

                    const target = window.googletag
                        .pubads()
                        .getSlots()
                        .find((slot) => slot.getSlotElementId() === props.id);

                    target && window.googletag.pubads().refresh([target]);
                }
            });
        });
    });
    return <div id={props.id} style="min-height: 280px" data-slot-type="1"></div>;
}
