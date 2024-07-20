import {createResource, For, Match, Suspense, Switch} from 'solid-js';
import {data} from '../../article';
import {Paragraph} from "~/components/paragraph";
import {Advert} from "~/components/adv";
import {Image} from "~/components/image";
import {Embed} from "~/components/embed";
import {Header} from "@kobalte/core/accordion";
import {Title} from "~/components/title";
import {Video} from "~/components/video";

// enum ContentType{
//     PARAGRAPH = 'paragraph',
//     ADV = 'adv',
//     IMAGE = 'image',
//     EMBED = 'embed'
// }
//
// export interface ContentBlock {
//     type: ContentType;
//     value: string;
// }

// async function fetchContentBlocks(): Promise<ContentBlock[]>{
//     const response = await fetch('https://cdn.amomama.de/hackathon/article.json');
//     const data = await response.json();
//     console.log('Fetched data:', data);
//     return data;
// }

// function fetchContentBlocksFromFile(): ContentBlock[]{
//     const data = contentBlocksData.data;
//     // console.log('Fetched data:', data);
//     return data;
// }

export function ContentBlocks() {
    // const [contentBlocks] = createResource(fetchContentBlocksFromFile);
    // console.log('Content blocks:', contentBlocks());

    return (
        <div>
            {data.data.map((block) => getElementForBlock(block))}
            {/*<For each={contentBlocks()}>*/}
            {/*    {task => getElementForBlock(task)}*/}
            {/*</For>*/}
            {/*<Suspense fallback={<div>Loading...</div>}>*/}
            {/*    <Switch>*/}
            {/*        <Match when={contentBlocks.error}>*/}
            {/*            <span>Error: {contentBlocks.error()?.message}</span>*/}
            {/*        </Match>*/}
            {/*        <Match when={contentBlocks()}>*/}
            {/*            <For each={contentBlocks()}>*/}
            {/*                {task => getElementForBlock(task)}*/}
            {/*            </For>*/}
            {/*        </Match>*/}
            {/*    </Switch>*/}
            {/*</Suspense>*/}
        </div>
    );
}

function getElementForBlock(content: (typeof data)['data'][number]) {
    // console.log('Content:', content);
    switch (content.type) {
        case 'title':
            return <Title content={content.content!}/>;
        case 'paragraph':
            return <Paragraph content={content.content!}/>;
        case 'adv':
            return <Advert id={content.id!}/>;
        case 'image':
            return <Image src={content.src!}/>;
        case 'embed':
            return <Embed url={content.url!}/>;
        case 'video':
            return <Video id={content.id!}/>;
    }
}


