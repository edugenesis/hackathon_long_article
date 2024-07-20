const scrollOffsetPX = 3;
export const scrollFunctionTriggerInterval = 70;

export function shouldAutoScroll() {
  const searchParams = new URLSearchParams(window.location.href.split('?')[1]);
  return searchParams.get(`withAutoscroll`) === 'true';
}

export function scrollHandler() {
  const newOffset = window.scrollY + scrollOffsetPX;
  scrollTo({
    top: newOffset
  });
}
