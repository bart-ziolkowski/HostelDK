const NodeGeocoder = require("node-geocoder");

//import fetch from "node-fetch";

const options = {
  fetch: async () => (await import("node-fetch")).default,
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geoCoder = NodeGeocoder(options);

export default geoCoder;
