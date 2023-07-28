require('dotenv').config();
const { dbConnect, Country, Station } = require('./db');
const { getCountryStations, getStationData } = require('./utils');

let totalDone = 0;

const reset = async () => {
  await Country.updateMany({}, { completed: false });
  await Station.deleteMany({});
  process.exit(0);
};
const main = async () => {
  const country = await Country.findOne({ completed: false });
  const countryName = country.name;
  const stations = await getCountryStations(countryName);
  const stationsAlias = stations.map((station) => {
    return {
      title: station.title,
      alias: station.alias,
    };
  });
  const singleStation = stationsAlias.map(async (station) => {
    const alias = station.alias;
    const countryName = country.name;
    const singleStation = await getStationData(countryName, alias);

    const stationData = {
      id: singleStation?.id,
      version: singleStation?.version,
      cityId: singleStation?.cityId,
      cityName: singleStation?.cityName,
      alias: singleStation?.alias,
      title: singleStation?.title,
      frequency: singleStation?.frequency,
      rank: singleStation?.rank,
      radioListeners: singleStation?.listeners,
      country: singleStation?.country,
      status: singleStation?.status,
      genres: singleStation?.genres,
      genreIds: singleStation?.genreIds,
      catIds: singleStation?.catIds,
      description: singleStation?.description,
    };
    await Station.create(stationData);
  });
  await Country.findByIdAndUpdate(country._id, { completed: true });
  await Promise.all(singleStation);
  totalDone += country.total;
  console.log(
    'Done =  ' +
      countryName +
      ' Total = ' +
      country.total +
      ' Total Done = ' +
      totalDone,
  );
  await main();
};
dbConnect().then(main);
