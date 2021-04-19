window.BENCHMARK_DATA = {
  "lastUpdate": 1618871422865,
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
    ]
  }
}