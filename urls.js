const urls = {
  auth: {
    url: 'https://share2.dexcom.com/ShareWebServices/Services/General/LoginPublisherAccountByName',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'Dexcom Share/3.0.2.11 CFNetwork/711.2.23 Darwin/14.0.0',
    },
    bodyBase: {
      applicationId: 'd8665ade-9673-4e27-9ff6-92db4ce13d13',
    },
  },
  data: {
    url: 'https://share2.dexcom.com/ShareWebServices/Services/Publisher/ReadPublisherLatestGlucoseValues',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'Dexcom Share/3.0.2.11 CFNetwork/711.2.23 Darwin/14.0.0',
    },
    bodyBase: null,
  },
};

exports.urls = urls;
