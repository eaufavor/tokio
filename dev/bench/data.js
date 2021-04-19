window.BENCHMARK_DATA = {
  "lastUpdate": 1618871439201,
  "repoUrl": "https://github.com/eaufavor/tokio",
  "entries": {
    "sync_rwlock": [
      {
        "commit": {
          "author": {
            "email": "eliza@buoyant.io",
            "name": "Eliza Weisman",
            "username": "hawkw"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d6da67b2e612455e16c11967c762ae802c2ac428",
          "message": "sync: add `mpsc::Sender::{reserve_owned, try_reserve_owned}` (#3704)\n\n* sync: add `mpsc::Sender::{reserve_owned, try_reserve_owned}`\r\n\r\n## Motivation\r\n\r\nThe `mpsc::Sender::reserve` method currently returns a permit that borrows\r\nfrom the `Sender`. It would be nice to have a version of it that returns\r\nan owned permit.\r\n\r\n## Solution\r\n\r\nThis branch adds an `OwnedPermit` type and `Sender::{reserve_owned,\r\ntry_reserve_owned}` methods. Unlike the comparable methods on\r\n`Semaphore`, these methods do *not* require an `Arc<Sender>` as the\r\nreceiver; this is because the sender internally reference counts the\r\nchannel and is already cheap to clone. Requiring an `Arc` would simply\r\nadd an unnecessary second layer of reference counting, which is not\r\nideal; instead, the documentation encourages the user to clone the\r\nsender prior to calling `reserve_owned` when necessary.\r\n\r\nSince these methods take the `Sender` by value, they also have the ability\r\nto _return_ the `Sender` from a successful `OwnedPermit::send`. This\r\nallows them to be used without additional clones. Essentially, this is a\r\nvery simple type-level encoding of the sender's state, with the\r\ntransitions\r\n```\r\n      ┌──────┐\r\n ┌───►│Sender├───┐\r\n │    └──────┘   │\r\nsend          reserve\r\n │ ┌───────────┐ │\r\n └─┤OwnedPermit│◄┘\r\n   └───────────┘\r\n```\r\n\r\nAdditionally, I added an `OwnedPermit::release`, which returns the\r\n`Sender` and releases the permit *without* sending a message.\r\n\r\nCloses #3688 \r\n\r\nSigned-off-by: Eliza Weisman <eliza@buoyant.io>",
          "timestamp": "2021-04-15T12:55:57-07:00",
          "tree_id": "bf29d9dc513a8d80cadd15021e58c979e5f6d691",
          "url": "https://github.com/eaufavor/tokio/commit/d6da67b2e612455e16c11967c762ae802c2ac428"
        },
        "date": 1618871421667,
        "tool": "cargo",
        "benches": [
          {
            "name": "read_concurrent_contended",
            "value": 864,
            "range": "± 93",
            "unit": "ns/iter"
          },
          {
            "name": "read_concurrent_contended_multi",
            "value": 13116,
            "range": "± 5031",
            "unit": "ns/iter"
          },
          {
            "name": "read_concurrent_uncontended",
            "value": 898,
            "range": "± 155",
            "unit": "ns/iter"
          },
          {
            "name": "read_concurrent_uncontended_multi",
            "value": 13349,
            "range": "± 3902",
            "unit": "ns/iter"
          },
          {
            "name": "read_uncontended",
            "value": 515,
            "range": "± 59",
            "unit": "ns/iter"
          }
        ]
      }
    ],
    "rt_multi_threaded": [
      {
        "commit": {
          "author": {
            "email": "eliza@buoyant.io",
            "name": "Eliza Weisman",
            "username": "hawkw"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d6da67b2e612455e16c11967c762ae802c2ac428",
          "message": "sync: add `mpsc::Sender::{reserve_owned, try_reserve_owned}` (#3704)\n\n* sync: add `mpsc::Sender::{reserve_owned, try_reserve_owned}`\r\n\r\n## Motivation\r\n\r\nThe `mpsc::Sender::reserve` method currently returns a permit that borrows\r\nfrom the `Sender`. It would be nice to have a version of it that returns\r\nan owned permit.\r\n\r\n## Solution\r\n\r\nThis branch adds an `OwnedPermit` type and `Sender::{reserve_owned,\r\ntry_reserve_owned}` methods. Unlike the comparable methods on\r\n`Semaphore`, these methods do *not* require an `Arc<Sender>` as the\r\nreceiver; this is because the sender internally reference counts the\r\nchannel and is already cheap to clone. Requiring an `Arc` would simply\r\nadd an unnecessary second layer of reference counting, which is not\r\nideal; instead, the documentation encourages the user to clone the\r\nsender prior to calling `reserve_owned` when necessary.\r\n\r\nSince these methods take the `Sender` by value, they also have the ability\r\nto _return_ the `Sender` from a successful `OwnedPermit::send`. This\r\nallows them to be used without additional clones. Essentially, this is a\r\nvery simple type-level encoding of the sender's state, with the\r\ntransitions\r\n```\r\n      ┌──────┐\r\n ┌───►│Sender├───┐\r\n │    └──────┘   │\r\nsend          reserve\r\n │ ┌───────────┐ │\r\n └─┤OwnedPermit│◄┘\r\n   └───────────┘\r\n```\r\n\r\nAdditionally, I added an `OwnedPermit::release`, which returns the\r\n`Sender` and releases the permit *without* sending a message.\r\n\r\nCloses #3688 \r\n\r\nSigned-off-by: Eliza Weisman <eliza@buoyant.io>",
          "timestamp": "2021-04-15T12:55:57-07:00",
          "tree_id": "bf29d9dc513a8d80cadd15021e58c979e5f6d691",
          "url": "https://github.com/eaufavor/tokio/commit/d6da67b2e612455e16c11967c762ae802c2ac428"
        },
        "date": 1618871423742,
        "tool": "cargo",
        "benches": [
          {
            "name": "chained_spawn",
            "value": 186449,
            "range": "± 35423",
            "unit": "ns/iter"
          },
          {
            "name": "ping_pong",
            "value": 683593,
            "range": "± 121348",
            "unit": "ns/iter"
          },
          {
            "name": "spawn_many",
            "value": 4535537,
            "range": "± 805587",
            "unit": "ns/iter"
          },
          {
            "name": "yield_many",
            "value": 20192019,
            "range": "± 2665293",
            "unit": "ns/iter"
          }
        ]
      }
    ],
    "sync_semaphore": [
      {
        "commit": {
          "author": {
            "email": "eliza@buoyant.io",
            "name": "Eliza Weisman",
            "username": "hawkw"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d6da67b2e612455e16c11967c762ae802c2ac428",
          "message": "sync: add `mpsc::Sender::{reserve_owned, try_reserve_owned}` (#3704)\n\n* sync: add `mpsc::Sender::{reserve_owned, try_reserve_owned}`\r\n\r\n## Motivation\r\n\r\nThe `mpsc::Sender::reserve` method currently returns a permit that borrows\r\nfrom the `Sender`. It would be nice to have a version of it that returns\r\nan owned permit.\r\n\r\n## Solution\r\n\r\nThis branch adds an `OwnedPermit` type and `Sender::{reserve_owned,\r\ntry_reserve_owned}` methods. Unlike the comparable methods on\r\n`Semaphore`, these methods do *not* require an `Arc<Sender>` as the\r\nreceiver; this is because the sender internally reference counts the\r\nchannel and is already cheap to clone. Requiring an `Arc` would simply\r\nadd an unnecessary second layer of reference counting, which is not\r\nideal; instead, the documentation encourages the user to clone the\r\nsender prior to calling `reserve_owned` when necessary.\r\n\r\nSince these methods take the `Sender` by value, they also have the ability\r\nto _return_ the `Sender` from a successful `OwnedPermit::send`. This\r\nallows them to be used without additional clones. Essentially, this is a\r\nvery simple type-level encoding of the sender's state, with the\r\ntransitions\r\n```\r\n      ┌──────┐\r\n ┌───►│Sender├───┐\r\n │    └──────┘   │\r\nsend          reserve\r\n │ ┌───────────┐ │\r\n └─┤OwnedPermit│◄┘\r\n   └───────────┘\r\n```\r\n\r\nAdditionally, I added an `OwnedPermit::release`, which returns the\r\n`Sender` and releases the permit *without* sending a message.\r\n\r\nCloses #3688 \r\n\r\nSigned-off-by: Eliza Weisman <eliza@buoyant.io>",
          "timestamp": "2021-04-15T12:55:57-07:00",
          "tree_id": "bf29d9dc513a8d80cadd15021e58c979e5f6d691",
          "url": "https://github.com/eaufavor/tokio/commit/d6da67b2e612455e16c11967c762ae802c2ac428"
        },
        "date": 1618871423587,
        "tool": "cargo",
        "benches": [
          {
            "name": "contended_concurrent_multi",
            "value": 15516,
            "range": "± 4994",
            "unit": "ns/iter"
          },
          {
            "name": "contended_concurrent_single",
            "value": 1087,
            "range": "± 484",
            "unit": "ns/iter"
          },
          {
            "name": "uncontended",
            "value": 630,
            "range": "± 319",
            "unit": "ns/iter"
          },
          {
            "name": "uncontended_concurrent_multi",
            "value": 15607,
            "range": "± 10805",
            "unit": "ns/iter"
          },
          {
            "name": "uncontended_concurrent_single",
            "value": 1128,
            "range": "± 206",
            "unit": "ns/iter"
          }
        ]
      }
    ],
    "sync_mpsc": [
      {
        "commit": {
          "author": {
            "email": "eliza@buoyant.io",
            "name": "Eliza Weisman",
            "username": "hawkw"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "d6da67b2e612455e16c11967c762ae802c2ac428",
          "message": "sync: add `mpsc::Sender::{reserve_owned, try_reserve_owned}` (#3704)\n\n* sync: add `mpsc::Sender::{reserve_owned, try_reserve_owned}`\r\n\r\n## Motivation\r\n\r\nThe `mpsc::Sender::reserve` method currently returns a permit that borrows\r\nfrom the `Sender`. It would be nice to have a version of it that returns\r\nan owned permit.\r\n\r\n## Solution\r\n\r\nThis branch adds an `OwnedPermit` type and `Sender::{reserve_owned,\r\ntry_reserve_owned}` methods. Unlike the comparable methods on\r\n`Semaphore`, these methods do *not* require an `Arc<Sender>` as the\r\nreceiver; this is because the sender internally reference counts the\r\nchannel and is already cheap to clone. Requiring an `Arc` would simply\r\nadd an unnecessary second layer of reference counting, which is not\r\nideal; instead, the documentation encourages the user to clone the\r\nsender prior to calling `reserve_owned` when necessary.\r\n\r\nSince these methods take the `Sender` by value, they also have the ability\r\nto _return_ the `Sender` from a successful `OwnedPermit::send`. This\r\nallows them to be used without additional clones. Essentially, this is a\r\nvery simple type-level encoding of the sender's state, with the\r\ntransitions\r\n```\r\n      ┌──────┐\r\n ┌───►│Sender├───┐\r\n │    └──────┘   │\r\nsend          reserve\r\n │ ┌───────────┐ │\r\n └─┤OwnedPermit│◄┘\r\n   └───────────┘\r\n```\r\n\r\nAdditionally, I added an `OwnedPermit::release`, which returns the\r\n`Sender` and releases the permit *without* sending a message.\r\n\r\nCloses #3688 \r\n\r\nSigned-off-by: Eliza Weisman <eliza@buoyant.io>",
          "timestamp": "2021-04-15T12:55:57-07:00",
          "tree_id": "bf29d9dc513a8d80cadd15021e58c979e5f6d691",
          "url": "https://github.com/eaufavor/tokio/commit/d6da67b2e612455e16c11967c762ae802c2ac428"
        },
        "date": 1618871437925,
        "tool": "cargo",
        "benches": [
          {
            "name": "contention_bounded",
            "value": 6183154,
            "range": "± 2713560",
            "unit": "ns/iter"
          },
          {
            "name": "contention_bounded_full",
            "value": 5744764,
            "range": "± 2043034",
            "unit": "ns/iter"
          },
          {
            "name": "contention_unbounded",
            "value": 5675832,
            "range": "± 2506739",
            "unit": "ns/iter"
          },
          {
            "name": "create_100_000_medium",
            "value": 687,
            "range": "± 209",
            "unit": "ns/iter"
          },
          {
            "name": "create_100_medium",
            "value": 695,
            "range": "± 42",
            "unit": "ns/iter"
          },
          {
            "name": "create_1_medium",
            "value": 691,
            "range": "± 226",
            "unit": "ns/iter"
          },
          {
            "name": "send_large",
            "value": 122727,
            "range": "± 11703",
            "unit": "ns/iter"
          },
          {
            "name": "send_medium",
            "value": 1508,
            "range": "± 728",
            "unit": "ns/iter"
          },
          {
            "name": "uncontented_bounded",
            "value": 994099,
            "range": "± 75280",
            "unit": "ns/iter"
          },
          {
            "name": "uncontented_unbounded",
            "value": 693172,
            "range": "± 125721",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}