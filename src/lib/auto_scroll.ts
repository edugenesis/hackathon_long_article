const scrollOffsetPX = 3;
export const scrollFunctionTriggerInterval = 70;

export function shouldntScroll() {
  const searchParams = new URLSearchParams(window.location.href.split('?')[1]);
  return searchParams.get(`noScroll`) === 'true';
}

export function scrollHandler() {
  const newOffset = window.scrollY + scrollOffsetPX;
  scrollTo({
    top: newOffset
  });
}
