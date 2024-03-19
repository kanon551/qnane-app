# Order Book

# API
API Reference: https://binance-docs.github.io/apidocs/spot/en/#exchange-information
SYMBOLS: https://api.binance.com/api/v3/exchangeInfo
PRICES: https://api.binance.com/api/v3/trades?symbol=BNBBTC


You task is to make a OrderBook page by using Binance APIs.

Create a React project with the following requirements:

App will have two pages:

## 1. Login page
  - Application start with a Login button.
  - Clicking on login button should go to order book page.
  - Reloading the page after login button is clicked should directly to order book page.
  - OrderBook page will have a logout button.
  - Once logged out reloading the page will show login button again.

## 2. Order Book page
Get the symbols list from SYMBOLS API.
  1. Use the `symbols` property to render a select input.
  2. Use the `symbol` property to show select input's options label.
  3. On selecting a symbol from the select input. Render a table below select input with its prices. To get prices of a symbol use PRICES api.
    - Important: Tables header columns should not be hardcoded and must be derive from the prices data object itself.
  4. Changing selected symbol from select input will show current selected symbols price table.

# Bonus point:
 - Use of Typescript is prefered.
 - Follow all the best practices of React.
