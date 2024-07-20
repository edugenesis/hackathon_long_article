import { createWindowVirtualizer } from '@tanstack/solid-virtual';
import { generateBoxes } from './gen';
import { For } from 'solid-js';

export function Virtual() {
  const boxes = generateBoxes(1000);
  console.log(boxes);

  const virt = createWindowVirtualizer({
    count: boxes.length,
    estimateSize: (i) => boxes[i].height,
    overscan: 0
  });

  return (
    <div style={{ height: `${virt.getTotalSize()}px`, position: 'relative' }}>
      <For each={virt.getVirtualItems()}>
        {(row, index) => {
          const box = boxes[row.index];
          const virtualRowStart = row.start;
          const virtualRowSize = row.size;

          // const translateY = virtualRowStart - index() * virtualRowSize;
          const translateY = virtualRowStart;

          return (
            <div
              style={{
                height: `${row.size}px`,
                background: box.color,
                transform: `translateY(${translateY}px)`,
                position: 'absolute',
                width: '100%'
              }}>
              n={box.n} size={virtualRowSize} index={index()} translateY={translateY}
            </div>
          );
        }}
      </For>
    </div>
  );
}
