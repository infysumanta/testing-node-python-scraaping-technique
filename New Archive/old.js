const saveCountryData = async () => {
  const countryData = await getCountryData();
  countryData.sort();

  const promise = countryData.map(async (country) => {
    const countryName = country;
    const countryTotal = await getTotalLengthCountry(country);
    const countryObj = {
      name: countryName,
      total: countryTotal,
    };
    await Country.create(countryObj);
  });

  await Promise.all(promise);
};
