const https = require('https');
const fs = require('fs');

const clientCertFilePath = 'Dab-csrs/dab-axis.p12'; // Path to your client certificate file
const clientCertPassword = '1234'; // Password for your client certificate
const url = 'https://sakshamuat.axisbank.co.in/gateway/api/v2/CRMNext/login'; // URL to which you want to make the HTTPS request

// Load client certificate
const clientCert = fs.readFileSync(clientCertFilePath);

// Set options for the HTTPS request
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-IBM-Client_Id': 'cd7702c6c60795c68f2bd594a5600e1a',
    'X-IBM-Client-Secret': 'ab638c18b5e9d598fd709deee92a2a54'
  },
  cert: clientCert,
  key: clientCert,
  passphrase: clientCertPassword
};

// Make the HTTPS request
const req = https.request(url, options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(data);
  });
});

// Handle errors
req.on('error', (error) => {
  console.error(error);
});

// Send any request body if needed
// req.write(JSON.stringify({}));

// End the request
req.end();
