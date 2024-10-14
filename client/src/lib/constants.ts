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
    urls: "turn:relay1.expressturn.com:3478",
    username: "efSIBKT5O2HI8UWT9S",
    credential: "wrMwtRjxCK5NRGqo",
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
