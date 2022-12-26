## Question 1 - Programming

### Install dependencies.

```
npm install

yarn install
```

### Run the program

```
npm start

yarn start
```

### Results

```
--- Processing...
HandleCSV in: 2.275s
Exchange Rate in: 1.547s
┌─────────┬───────┬────────────────────┬────────────────────┐
│ (index) │ token │       amount       │        USD         │
├─────────┼───────┼────────────────────┼────────────────────┤
│    0    │ 'BTC' │ 39851.199060999104 │ 671234614.4685717  │
│    1    │ 'ETH' │ 30572.309748000236 │  37283304.570732   │
│    2    │ 'XRP' │ 29560.412992000474 │ 10350.284661064592 │
└─────────┴───────┴────────────────────┴────────────────────┘
```

### External libraries used

[Axios](https://www.npmjs.com/package/axios): Streaming CSV parser that aims for maximum speed as well as compatibility

[CSV-parser](https://www.npmjs.com/package/csv-parser): Make http requests from node.js

The project has 3 parts:
- Handle the CSV, 
- Check is a valid row
- Call API to handle the exchange to USD
