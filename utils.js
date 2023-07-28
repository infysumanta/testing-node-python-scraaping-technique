const axios = require('axios');
const { Failed } = require('./db');

const getCountryData = async (country) => {
  try {
    const response = await axios.get(`https://onlineradiobox.com/json/`);
    return response.data.countries;
  } catch (err) {
    console.log(err);
  }
};

const getTotalLengthCountry = async (country) => {
  try {
    const response = await axios.get(
      `https://onlineradiobox.com/json/${country}`,
    );
    return response.data.stations.length;
  } catch (err) {
    console.log(err);
  }
};

const getCountryStations = async (country) => {
  try {
    const response = await axios.get(
      `https://onlineradiobox.com/json/${country}`,
    );
    return response.data.stations;
  } catch (err) {
    console.log(err);
  }
};

const getStationData = async (country, alias) => {
  const url = `https://onlineradiobox.com/json/${country}/${alias}`;
  try {
    const response = await axios.get(url);
    return response.data.station;
  } catch (err) {
    await Failed.create({
      country,
      alias,
      url,
      error: err.message,
    });
    console.log(url);
  }
};

module.exports = {
  getCountryData,
  getTotalLengthCountry,
  getCountryStations,
  getStationData,
};
