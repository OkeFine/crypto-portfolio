const fs = require('fs')
const csv = require('csv-parser')
const { exchangeCrypto } = require('./services/exchangeRate')

const DEPOSIT_TYPE = 'DEPOSIT'
const WITHDRAWAL_TYPE = 'WITHDRAWAL'
const CSV_PATH = './data/transactions.csv'

const isValid = ({ timestamp, transaction_type, token, amount }) => {
  // validate the transaction here
  return timestamp && transaction_type && token && amount && [DEPOSIT_TYPE, WITHDRAWAL_TYPE].indexOf(transaction_type) > -1
};

const handleCSV = async (csvPath) => {
  const streamPromise = new Promise(function(resolve, reject) {
    console.log('--- Processing...')
    console.time('HandleCSV in')
    const data = {};
    fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (item) => {
      if (isValid(item)) {
        const amount = item.transaction_type === DEPOSIT_TYPE ? Number(item.amount) : Number(item.amount) * -1
        if (data[item.token]) {
          data[item.token] = data[item.token] + amount
        } else {
          data[item.token] = amount
        }
      }
    })
    .on('end', () => {
      console.timeEnd('HandleCSV in')
      resolve(data)
    })
  });

  return await streamPromise;
}

const main = async () => {
  const data = await handleCSV(CSV_PATH)
  const exhangedData = await exchangeCrypto(data)
  const structDatas = Object.keys(exhangedData).map(token => {
    return { token, ...exhangedData[token] }
  });
  console.table(structDatas);
}

main()