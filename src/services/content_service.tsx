import { createResource, For, Match, Suspense, Switch } from 'solid-js';
import { data } from '../../article';

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
  console.log('Content:', content);
  switch (content.type) {
    case 'paragraph':
      return <p>{content.content}</p>;
    case 'adv':
      return <div>{content.id}</div>;
    case 'image':
      return <img src={content.src} alt="" />;
    case 'embed':
      return <iframe src={content.url} title="" />;
  }
}
