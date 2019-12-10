const crypto = require("crypto");
const { google } = require("googleapis");

exports.sourceNodes = async ({ actions }, configOptions) => {
  const { createNode } = actions;
  const { email, key, viewId, startDate } = configOptions;
  const scopes = "https://www.googleapis.com/auth/analytics.readonly";

  const jwt = new google.auth.JWT(email, null, key, scopes);
  await jwt.authorize();
  const result = await google.analytics("v3").data.ga.get({
    auth: jwt,
    ids: "ga:" + viewId,
    "start-date": startDate || "2009-01-01",
    "end-date": "today",
    metrics: "ga:pageviews",
    sort: "-ga:pageviews"
  });

  createNode({
    id: "total-count",
    totalCount: Number(result),
    internal: {
      type: `PageViews`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify({ totalCount }))
        .digest(`hex`),
      mediaType: `text/plain`,
      description: `Total page views`
    }
  });
};
