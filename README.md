<h1 align="center">
Itasecoin Explorer
<br/><br/>
<img src="https://cdn.discordapp.com/attachments/485464301516095509/942121112706359356/explorer_bandeau.png" alt="Itasecoin" width="700"/>
</h1>

<div align="center">
  
Copyright (c) 2022 Milovan PMS

</div>

This tool is intended to be a simple, self-hosted and database-free explorer for the Itasecoin blockchain, driven by RPC calls to your own Itasecore node. This tool is easy to run but currently lacks features compared to database-backed explorers.<br>

Whatever reasons one might have for running a full node (trustlessness, technical curiosity, supporting the network, etc) it's helpful to appreciate the "fullness" of your node. With this explorer, you can not only explore the blockchain (in the traditional sense of the term "explorer"), but also explore the functional capabilities of your own node.

Live demo available at [explorer.itasecoin.com](https://explorer.itasecoin.com).

## Features

- Browse blocks
- View block details
- View transaction details, with navigation "backward" via spent transaction outputs
- Search by transaction ID, block hash/height, and address
- Optional transaction history for addresses by querying from ElectrumX and blockchair.com
- Mempool summary, with fee, size, and age breakdowns
- RPC command browser and terminal

## Prerequisites

1. Install and run a full node - [Itasecore Releases](https://github.com/milopms/itasecoin/releases). Ensure that your devault node has full transaction indexing enabled (`txindex=1`) and the RPC server enabled (`server=1`).
2. Synchronize your node with the Itasecoin network.
3. "Recent" version of Node.js (8+ recommended).

## Instruction

```bash
npm install -g itasecoinexplorer
itasecoinexplorer
```

If you're running on mainnet with the default datadir and port, this should basically work.
Open [http://127.0.0.1:3002/](http://127.0.0.1:3002/) to view the explorer.

You may set configuration options in a `.env` file or using CLI args.
See [configuration](#configuration) for details.

## Configuration

Configuration options may be passed as environment variables
or by creating an env file at `~/.config/itasecoinexplorer.env`
or at `.env` in the working directory.
See [.env-sample](.env-sample) for a list of the options and details for formatting `.env`.

You may also pass options as CLI arguments, for example:

```bash
itasecoinexplorer --port 8080 --bitcoind-port 29045 --bitcoind-cookie ~/.itasecoin/regtest/.cookie
```

See `itasecoinexplorer --help` for the full list of CLI options.

## Contributing

If you find a bug or experience issues with this software, please report it
using the [issue system](https://github.com/milopms/itasecoin/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5Bbug%5D+).

Please see [the contribution guide](CONTRIBUTING.md) to see how you can
participate in the development of Itasecoin Explorer. There are often
[topics seeking help](https://github.com/milopms/itasecoin/labels/help%20wanted)
where your contributions will have high impact and get very appreciation.

## Communities

You can join the communities on different social media.
To see what's going on, meet people & discuss, find the lastest meme, learn
about Itasecoin, give or ask for help, to share your project.

Here are some places to visit:

* [Discord](https://discord.gg/itasecoin)
* [Itasecoin Twitter](https://twitter.com/itasecoin)

## Frequently Asked Questions 

Do you have a question about Itasecoin Explorer? Your answer may be in the
[FAQ](doc/FAQ.md) or the
[Q&A section](https://github.com/milopms/itasecoinexplorer/discussions/categories/q-a)
of the discussion board!

## License
Itasecoin Explorer is released under the terms of the MIT license. See
[COPYING](COPYING) for more information or see
[opensource.org](https://opensource.org/licenses/MIT)
