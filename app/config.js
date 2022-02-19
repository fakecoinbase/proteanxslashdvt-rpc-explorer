var fs = require('fs');
var crypto = require('crypto');
var url = require('url');

var coins = require("./coins.js");
var credentials = require("./credentials.js");

var currentCoin = process.env.BTCEXP_COIN || "DVT";

var rpcCred = credentials.rpc;

if (rpcCred.cookie && !rpcCred.username && !rpcCred.password && fs.existsSync(rpcCred.cookie)) {
  console.log(`Loading RPC cookie file: ${rpcCred.cookie}`);

  [ rpcCred.username, rpcCred.password ] = fs.readFileSync(rpcCred.cookie).toString().split(':', 2);

  if (!rpcCred.password) {
    throw new Error(`Cookie file ${rpcCred.cookie} in unexpected format`);
  }
}

var cookieSecret = process.env.BTCEXP_COOKIE_SECRET
 || (rpcCred.password && crypto.createHmac('sha256', JSON.stringify(rpcCred))
                               .update('btc-rpc-explorer-cookie-secret').digest('hex'))
 || "0x000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f";


var electrumXServerUriStrings = (process.env.BTCEXP_ELECTRUMX_SERVERS || "").split(',').filter(Boolean);
var electrumXServers = [];
for (var i = 0; i < electrumXServerUriStrings.length; i++) {
  var uri = url.parse(electrumXServerUriStrings[i]);

  electrumXServers.push({protocol:uri.protocol.substring(0, uri.protocol.length - 1), host:uri.hostname, port:parseInt(uri.port)});
}

["BTCEXP_DEMO", "BTCEXP_PRIVACY_MODE", "BTCEXP_NO_INMEMORY_RPC_CACHE", "BTCEXP_UI_SHOW_RPC"].forEach(function(item) {
  if (process.env[item] === undefined) {
    process.env[item] = "false";
  }
});

["BTCEXP_NO_RATES", "BTCEXP_UI_SHOW_TOOLS_SUBHEADER"].forEach(function(item) {
  if (process.env[item] === undefined) {
    process.env[item] = "true";
  }
});

var siteToolsAux = '[ \
  {"name":"Node Status", "url":"/node-status", "desc":"Summary of this node: version, network, uptime, etc.", "fontawesome":"fas fa-broadcast-tower"}, \
  {"name":"Peers", "url":"/peers", "desc":"Detailed info about the peers connected to this node.", "fontawesome":"fas fa-sitemap"}, \
  {"name":"Browse Blocks", "url":"/blocks", "desc":"Browse all blocks in the blockchain.", "fontawesome":"fas fa-cubes"}, \
  {"name":"Transaction Stats", "url":"/tx-stats", "desc":"See graphs of total transaction volume and transaction rates.", "fontawesome":"fas fa-chart-bar"}, \
  {"name":"Mempool Summary", "url":"/mempool-summary", "desc":"Detailed summary of the current mempool for this node.", "fontawesome":"fas fa-clipboard-list"}, \
  {"name":"Unconfirmed Transactions", "url":"/unconfirmed-tx", "desc":"Browse unconfirmed/pending transactions.", "fontawesome":"fas fa-unlock-alt"}, \
  {"name":"Main Website", "url":"https://itasecoin.com", "desc":"Open in a new window the Itasecoin website.", "fontawesome":"fas fa-website"}, \
  {"name":"Itasecoin History", "url":"/history", "desc":"See interesting historical blockchain data.", "fontawesome":"fas fa-certificate"} \
]'

var siteToolsJSON = JSON.parse(siteToolsAux)

if (process.env.BTCEXP_UI_SHOW_RPC.toLowerCase() === "true") {
  siteToolsJSON.push({"name":"RPC Browser", "url":"/rpc-browser", "desc":"Browse the RPC functionality of this node. See docs and execute commands.", "fontawesome":"fas fa-book"})
  siteToolsJSON.push({"name":"RPC Terminal", "url":"/rpc-terminal", "desc":"Directly execute RPCs against this node.", "fontawesome":"fas fa-terminal"})
}

module.exports = {
  coin: currentCoin,

  cookieSecret: cookieSecret,

  privacyMode: (process.env.BTCEXP_PRIVACY_MODE.toLowerCase() == "true"),
  demoSite: (process.env.BTCEXP_DEMO.toLowerCase() == "true"),
  showRpc: (process.env.BTCEXP_UI_SHOW_RPC.toLowerCase() === "true"),
  queryExchangeRates: (process.env.BTCEXP_NO_RATES.toLowerCase() != "true"),
  noInmemoryRpcCache: (process.env.BTCEXP_NO_INMEMORY_RPC_CACHE.toLowerCase() == "true"),

  rpcConcurrency: (process.env.BTCEXP_RPC_CONCURRENCY || 10),

  rpcBlacklist:
    process.env.BTCEXP_RPC_ALLOWALL  ? []
  : process.env.BTCEXP_RPC_BLACKLIST ? process.env.BTCEXP_RPC_BLACKLIST.split(',').filter(Boolean)
  : [
    "addnode",
    "backupwallet",
    "bumpfee",
    "clearbanned",
    "createmultisig",
    "createwallet",
    "disconnectnode",
    "dumpprivkey",
    "dumpwallet",
    "encryptwallet",
    "generate",
    "generatetoaddress",
    "getaccountaddrss",
    "getaddressesbyaccount",
    "getbalance",
    "getnewaddress",
    "getrawchangeaddress",
    "getreceivedbyaccount",
    "getreceivedbyaddress",
    "gettransaction",
    "getunconfirmedbalance",
    "getwalletinfo",
    "importaddress",
    "importmulti",
    "importprivkey",
    "importprunedfunds",
    "importpubkey",
    "importwallet",
    "invalidateblock",
    "keypoolrefill",
    "listaccounts",
    "listaddressgroupings",
    "listlockunspent",
    "listreceivedbyaccount",
    "listreceivedbyaddress",
    "listsinceblock",
    "listtransactions",
    "listunspent",
    "listwallets",
    "lockunspent",
    "logging",
    "move",
    "preciousblock",
    "pruneblockchain",
    "reconsiderblock",
    "removeprunedfunds",
    "rescanblockchain",
    "savemempool",
    "sendfrom",
    "sendmany",
    "sendtoaddress",
    "sendrawtransaction",
    "setaccount",
    "setban",
    "setmocktime",
    "setnetworkactive",
    "signmessage",
    "signmessagewithprivatekey",
    "signrawtransaction",
    "signrawtransactionwithkey",
    "stop",
    "submitblock",
    "syncwithvalidationinterfacequeue",
    "verifychain",
    "waitforblock",
    "waitforblockheight",
    "waitfornewblock",
    "walletlock",
    "walletpassphrase",
    "walletpassphrasechange",
  ],

  addressApi:process.env.BTCEXP_ADDRESS_API,
  electrumXServers:electrumXServers,

  redisUrl:process.env.BTCEXP_REDIS_URL,

  site: {
    blockTxPageSize:20,
    addressTxPageSize:10,
    txMaxInput:15,
    browseBlocksPageSize:20,
    addressPage:{
      txOutputMaxDefaultDisplay:10
    },
    header:{
      showToolsSubheader:(process.env.BTCEXP_UI_SHOW_TOOLS_SUBHEADER == "true"),
      dropdowns:[
        {
          title:"Related Sites",
          links:[
            {name: "DeVault Main Site", url:"https://devault.cc", imgUrl:"/img/logo/dvt.ico"},
            {name: "DeVault Online", url:"https://devault.online", imgUrl:"/img/logo/dvt.svg"},
            {name: "DeVault Forums", url:"https://devaultchat.cc", imgUrl:"/img/logo/dvt.svg"},
            {name: "DeVault ID", url:"https://devaultid.com", imgUrl:"/img/logo/did.png"},
            {name: "DeVault BitDB", url:"https://bitdb.exploredvt.com", imgUrl:"/img/logo/dvt.svg"},
          ]
        }
      ]
    }
  },
  credentials: credentials,

  siteTools: siteToolsJSON,

  donations:{
    addresses:{
      coins:["DVT"],
      sites:{"DVT":"https://devault.cc"},

      "DVT":{address:"devault:qrt2ysz6hmkcndf6086q5v63lzgkmlf7egyxs8r3y8"}
    }
  }
};
