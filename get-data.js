const fetch = require('node-fetch');
const S3 = require('aws-sdk/clients/s3');
const { urls } = require('./urls');

const getKeys = async () => new Promise((resolve, reject) => {
  new S3().getObject({ Bucket: 'jazcom-data', Key: 'dx-2/data.json' }, (error, data) => {
    if (error) {
      return reject(error);
    }
    return resolve(JSON.parse(data.Body.toString()));
  });
});

exports.getData = async () => {
  // event is an argument.
  let authKey = null;
  const { auth: authReq, data: dataReq } = urls;
  if (!authKey) {
    const keys = await getKeys();
    const postResult = await fetch(authReq.url, {
      method: authReq.method || 'POST',
      mode: 'cors',
      headers: authReq.headers,
      body: authReq.method !== 'GET' ? JSON.stringify({
        ...authReq.bodyBase,
        accountName: keys.JAZ_COM_USER,
        password: `jaz${keys.JAZ_COM_KEY}`,
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
