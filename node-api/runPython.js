const axios = require('axios');

module.exports = async function runPython(input) {
  const response = await axios.post('http://inference:6000/predict', input);
  return response.data.output;
};
