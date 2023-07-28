import requests

BASE_URL = "https://onlineradiobox.com/json/"

baseData = requests.get(BASE_URL)   

countries = baseData.json()['countries']
countries.sort()
totalStations = 0
for country in countries:
    countryUrl = BASE_URL + country

    countryData = requests.get(countryUrl)
    stations = countryData.json()['stations']
    totalStations += len(stations)
    print(country, " : ", len(stations), " = ",totalStations)
    

print("Total stations: ", totalStations)