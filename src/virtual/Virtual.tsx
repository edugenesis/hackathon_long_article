import {
  createVirtualizer,
  VirtualizerOptions,
  Virtualizer,
  PartialKeys,
  createWindowVirtualizer,
} from "@tanstack/solid-virtual";
import { generateBoxes } from "./gen";
import { createMemo, createSignal, For, onCleanup } from "solid-js";

export function Virtual() {
  const boxes = generateBoxes(1000);
  console.log(boxes);

  const virt = createWindowVirtualizer({
    count: boxes.length,
    estimateSize: (i) => boxes[i].height,
    // Specify other configuration options here if needed
  });

  return (
    <div>
      <For each={virt.getVirtualItems()}>
        {(virtualRow, index) => {
          const box = boxes[virtualRow.index];
          const virtualRowStart = Number(virtualRow.start); // Cast to number
          const virtualRowSize = Number(virtualRow.size); // Cast to number
          const translateY =
            virtualRowStart - Number(index as unknown) * virtualRowSize;
          return <div style={`background-color: ${box.color}; height: ${box.height}px;`}>{box.n}</div>;
        }}
      </For>
    </div>
  );
}
