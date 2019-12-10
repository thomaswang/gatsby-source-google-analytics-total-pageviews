# Gatsby Source Plugin for Google Analytics Total Page Views

## Install

```
npm i gatsby-source-google-analytics-total-pageviews
```

## Configure

In `gatsby-config.js`:

```js
    {
      resolve: `gatsby-source-google-analytics-total-pageviews`,
      options: {
        email: process.env.CLIENT_EMAIL,
        key: [googleApiKey],
        viewId: [googleAnalyticsViewId],
        startDate: '30daysAgo',
      }
    },
```

## Usage

```graphql
    pageViews(path: {eq: $slug}) {
      totalCount
    }
```

## License

MIT
