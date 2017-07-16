// eslint-disable-next-line import/prefer-default-export
export const join = (lookupTable, mainTable, lookupKey, mainKey, callback) => {
  const l = lookupTable.length;
  const m = mainTable.length;
  let lookupIndex = [];
  let result = [];
  for (let i = 0; i < l; i++) {
    let row = lookupTable[i];
    lookupIndex[row[lookupKey]] = row;
  }
  for (let n = 0; n < m; n++) {
    let y = mainTable[n];
    let x = lookupIndex[y[mainKey]];
    result.push(callback(y, x));
  }
  return result;
};
