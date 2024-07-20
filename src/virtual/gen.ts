interface Box {
  n: number;
  height: number;
  color: string;
}

function getRandomHeight(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor(): string {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red},${green},${blue})`;
}

export function generateBoxes(numBoxes: number): Box[] {
  const boxes: Box[] = [];
  for (let i = 0; i < numBoxes; i++) {
    const height = getRandomHeight(100, 400);
    const color = getRandomColor();
    boxes.push({ n: i, height, color });
  }
  return boxes;
}
