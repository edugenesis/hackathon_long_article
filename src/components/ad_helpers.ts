const div_1_sizes = [
  [300, 250],
  [320, 100],
  [320, 50]
];

export function runAdUnit(name: string) {
  const adUnitObj = getAdUnitObj(name);
  console.log('running ad unit', name);

  const googletag = window.googletag || {};
  googletag.cmd = googletag.cmd || [];

  const pbjs = window.pbjs || {};
  pbjs.que = pbjs.que || [];

  pbjs.que.push(function () {
    pbjs.addAdUnits([adUnitObj]);
  });

  googletag.cmd.push(() => {
    googletag.defineSlot('/21668216007/amomama.de_intext_10', div_1_sizes, name).addService(googletag.pubads());
    googletag.pubads().disableInitialLoad();
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();

    googletag.cmd.push(function () {
      googletag.display(name);
    });
  });

  console.log('requesting bids for', name);
  requestBids(name);
}

export function requestBids(name: string) {
  const pbjs = window.pbjs || {};
  pbjs.que = pbjs.que || [];

  const googletag = window.googletag || {};
  googletag.cmd = googletag.cmd || [];

  pbjs.que.push(function () {
    pbjs.requestBids({
      timeout: 1000,
      adUnitCodes: [name],
      bidsBackHandler: function () {
        pbjs.setTargetingForGPTAsync([name]);

        const target = googletag
          .pubads()
          .getSlots()
          .find((slot) => slot.getSlotElementId() === name);

        target && googletag.pubads().refresh([target]);
      }
    });
  });
}

export async function initPbJS() {
  while (!('pbjs' in window) || !window.pbjs?.setConfig) {
    console.log('pbjs not available, waiting');
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log('pbjs setting config');

  window.pbjs.setConfig({
    bidderTimeout: 3000,
    enableSendAllBids: true,
    deviceAccess: true,
    timeoutBuffer: 400,
    priceGranularity: 'high',
    bidderSequence: 'random',
    userSync: {
      syncEnabled: true,
      filterSettings: {
        iframe: {
          bidders: '*',
          filter: 'include'
        },
        image: {
          bidders: '*',
          filter: 'include'
        }
      },
      syncsPerBidder: 5,
      syncDelay: 5000,
      auctionDelay: 250,
      aliasSyncEnabled: true
    },
    consentManagement: {
      usp: {
        timeout: 100,
        cmpApi: 'iab'
      },
      gdpr: {
        cmpApi: 'iab',
        timeout: 8000,
        defaultGdprScope: true
      }
    }
  });
}

function getAdUnitObj(name: string) {
  return {
    code: name,
    mediaTypes: {
      banner: {
        sizes: div_1_sizes
      }
    },
    bids: [
      {
        bidder: 'appnexus',
        params: {
          placementId: 14049821
        }
      },
      {
        bidder: 'seedtag',
        params: {
          publisherId: '1422-9699-01',
          adUnitId: '31402727',
          placement: 'inArticle'
        }
      },
      {
        bidder: 'vidazoo',
        params: {
          cid: '638f4064ba1056ce9c0324e4',
          pId: '59ac17c192832d0011283fe3'
        }
      },
      {
        bidder: 'medianet',
        params: {
          cid: '8CU1XT34E',
          crid: '928505701'
        }
      },
      {
        bidder: 'amx',
        params: {
          tagId: 'YW1vbWVkaWEtcm9uLmNvbQ'
        }
      },
      {
        bidder: 'triplelift',
        params: {
          inventoryCode: 'Amomama_DE_midarticle'
        }
      },
      {
        bidder: 'triplelift',
        params: {
          inventoryCode: 'Amomama_DE_hdx'
        }
      },
      {
        bidder: 'kueezrtb',
        params: {
          cId: '64d4bb1f226f0c02d40867c9',
          pId: '65lk7c192882r0011813fn9'
        }
      },
      {
        bidder: 'openx',
        params: {
          unit: '559907359',
          delDomain: 'genesis-d.openx.net'
        }
      },
      {
        bidder: 'rubicon',
        params: {
          accountId: 13524,
          siteId: 533320,
          zoneId: 3264228
        }
      },
      {
        bidder: 'grid',
        params: {
          uid: '391046'
        }
      },
      {
        bidder: 'pubmatic',
        params: {
          publisherId: '158654',
          adSlot: 'amomama.de/mweb_rectangle'
        }
      }
    ]
  };
}
