function makeAllIframesLazy(lazy: string) {
  document.querySelectorAll('iframe').forEach((iframe) => {
    iframe.loading = lazy;
  });
}

export function runMakeAllIframesLazy() {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        makeAllIframesLazy('lazy');
      }
    });
  });

  const config = { childList: true, subtree: true };

  observer.observe(document.body, config);
}

export function disableAllIframesLazy() {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes.length) {
        makeAllIframesLazy('eager');
      }
    });
  });

  const config = { childList: true, subtree: true };

  observer.observe(document.body, config);
}
