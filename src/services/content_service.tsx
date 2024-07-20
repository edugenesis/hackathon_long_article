import { createResource, For, Match, Suspense, Switch } from 'solid-js';
import { Paragraph } from '~/components/paragraph';
import { Advert } from '~/components/adv';
import { Image } from '~/components/image';
import { Embed } from '~/components/embed';
import { Title } from '~/components/title';
import { Video } from '~/components/video';
import { LoadAdsScript } from './LoadAdsScript';
import {data} from '../../article';

// interface ContentBlock {
//   type: "title" | "paragraph" | "adv" | "image" | "embed" | "video";
//   content?: string;
//   id?: string;
//   src?: string;
//   url?: string;
// }

// async function fetchContentBlocks(): Promise<ContentBlock[]>{
//     const response = await fetch('https://cdn.amomama.de/hackathon/article.json');
//     const data = await response.json();
//     console.log('Fetched data:', data);
//     return data.data;
// }

export function ContentBlocks() {
  // const [contentBlocks] = createResource(fetchContentBlocks);
  // console.log('Content blocks:', contentBlocks());

  LoadAdsScript();
  return (
    <>
      <div class="max-w-[90%] md:max-w-[75%] lg:max-w-[60%] mt-24 mx-auto flex flex-col space-y-6 my-10">
          {data.data.map((block: (typeof data)['data'][number]) => getElementForBlock(block))}
        {/*<Suspense fallback={<div>Loading...</div>}>*/}
        {/*    <Switch>*/}
        {/*        <Match when={contentBlocks.error}>*/}
        {/*            <span>Error: {contentBlocks.error()?.message}</span>*/}
        {/*        </Match>*/}
        {/*        <Match when={contentBlocks()}>*/}
        {/*            <For each={contentBlocks()}>*/}
        {/*                {block => getElementForBlock(block)}*/}
        {/*            </For>*/}
        {/*        </Match>*/}
        {/*    </Switch>*/}
        {/*</Suspense>*/}
      </div>
    </>
  );
}

function getElementForBlock(content: (typeof data)['data'][number]) {
  switch (content.type) {
    case 'title':
      return <Title content={content.content!} />;
    case 'paragraph':
      return <Paragraph content={content.content!} />;
    case 'adv':
      return <Advert id={content.id!} />;
    case 'image':
      return <Image src={content.src!} />;
    case 'embed':
      return <Embed url={content.url!} />;
    case 'video':
      return <Video id={content.id!} />;
  }
}
