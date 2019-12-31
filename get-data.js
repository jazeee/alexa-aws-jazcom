const fetch = require('node-fetch');
const { urls } = require('./urls');
// const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const getKey = async (keyName) => new Promise((resolve, reject) => {
  const { [keyName]: key } = process.env;
  return key ? resolve(key) : reject(new Error(`No environment variable found. Expect "${keyName}"`));
});

exports.getData = async () => {
  // event is an argument.
  let authKey = null;
  const { auth: authReq, data: dataReq } = urls;
  if (!authKey) {
    const postResult = await fetch(authReq.url, {
      method: authReq.method || 'POST',
      mode: 'cors',
      headers: authReq.headers,
      body: authReq.method !== 'GET' ? JSON.stringify({
        ...authReq.bodyBase,
        accountName: await getKey('JAZ_COM_USER'),
        password: await getKey('JAZ_COM_KEY'),
      }) : undefined,
    });
    const { status } = postResult;
    if (status !== 200) {
      throw new Error('Unable to Post Username');
    }
    authKey = await postResult.json();
  }

  const postResult = await fetch(`${dataReq.url}?sessionId=${authKey}&minutes=1440&maxCount=1`, {
    method: dataReq.method || 'POST',
    mode: 'cors',
    headers: dataReq.headers,
    body: dataReq.method !== 'GET' ? '' : undefined,
  });
  const { status } = postResult;
  if (status !== 200) {
    throw new Error(await postResult.text());
  }
  const readings = await postResult.json();
  const [firstReading] = readings;
  console.log(firstReading);
  return { firstReading };
};
