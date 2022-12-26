const axios = require('axios').default

const EXCHANGE_ENNPOINT = 'https://min-api.cryptocompare.com/data/price'

// portfolio = Array<{ token: amount }>
exports.exchangeCrypto = async (portfolio, currency = 'USD') => {
  console.time('Exchange Rate in')
  const tokens = Object.keys(portfolio);
  const tokenStr = Object.keys(portfolio).join(',');
  const res = await axios.get(`${EXCHANGE_ENNPOINT}?fsym=${currency}&tsyms=${tokenStr}`)
  if (res.status === 200) {
    tokens.forEach(key => {
      portfolio[key] = {
        amount: portfolio[key],
        [currency]: portfolio[key] / res.data[key]
      }
    })
  } // else => handle error
  console.timeEnd('Exchange Rate in')
  return portfolio;
}
