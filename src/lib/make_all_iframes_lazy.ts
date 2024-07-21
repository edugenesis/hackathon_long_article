function makeAllIframesLazy() {
  document.querySelectorAll('iframe').forEach((iframe) => {
    iframe.loading = 'lazy';
  });
}

export function runMakeAllIframesLazy() {
  makeAllIframesLazy();

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        makeAllIframesLazy();
      }
    });
  });

  const config = { childList: true, subtree: true };

  observer.observe(document.body, config);
}
