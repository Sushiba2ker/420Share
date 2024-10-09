import { isChrome } from "./utils";

const TRACKERS = [
  "wss://tracker.btorrent.xyz",
  "wss://tracker.openwebtorrent.com",
  "wss://tracker.webtorrent.dev",
];

const ICE_SERVERS = [
  isChrome()
    ? { url: "stun:stun.l.google.com:19302" }
    : { urls: "stun:stun1.l.google.com:19302" },
  {
    urls: "turn:global.relay.metered.ca:80",
    username: "bd82f25dcaa5a0ee819c1561",
    credential: "1hSvjsZqjDsguoJH",
  },
];

export const WEBTORRENT_CONFIG = {
  tracker: {
    announce: TRACKERS,
    rtcConfig: {
      iceServers: ICE_SERVERS,
    },
  },
};
