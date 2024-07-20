import { createResource, For, Match, Suspense, Switch } from 'solid-js';

enum ContentType {
  PARAGRAPH = 'paragraph',
  ADV = 'adv',
  IMAGE = 'image',
  EMBED = 'embed'
}

interface ContentBlock {
  type: ContentType;
  value: string;
}

async function fetchContentBlocks(): Promise<ContentBlock[]> {
  const response = await fetch('https://cdn.amomama.de/hackathon/article.json');
  return await response.json();
}

export function ContentBlocks() {
  const [contentBlocks] = createResource(fetchContentBlocks);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Match when={contentBlocks.error}>
            <span>Error: {contentBlocks.error()}</span>
          </Match>
          <Match when={contentBlocks()}>
            <For each={contentBlocks()}>{(task) => getElementForBlock(task)}</For>
          </Match>
        </Switch>
      </Suspense>
    </div>
  );
}

function getElementForBlock(content: ContentBlock) {
  switch (content.type) {
    case ContentType.PARAGRAPH:
      return <p>{content.value}</p>;
    case ContentType.ADV:
      return <div>{content.value}</div>;
    case ContentType.IMAGE:
      return <img src={content.value} alt="" />;
    case ContentType.EMBED:
      return <iframe src={content.value} title="" />;
  }
}
