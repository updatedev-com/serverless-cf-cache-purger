'use strict';
var axios = require('axios');

module.exports.purgeCloudFlare = async () => {
  const url = `https://api.cloudflare.com/client/v4/zones/${process.env.CF_ZONE_ID}/purge_cache`;
  const headers = {
    "Authorization": `Bearer ${process.env.CF_API_TOKEN}`,
    'Content-Type': 'application/json'
  };
  const data = { purge_everything: true};

  const response = await axios.post(url, data, { headers });

  return {
    statusCode: response.status,
    body: JSON.stringify(
      {
        message: response.statusText
      },
      null,
      2
    ),
  };
};
