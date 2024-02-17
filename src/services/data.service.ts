import { Request } from "express";
import { Injectable } from "src/modules/common";
import { join } from 'path'
const FETCH_FILE_PATH = (...args: string[]) => join(process.cwd(), "utils", "json", ...args)


@Injectable()
export class DataProvider {
  data(req: Request) {
    const url = req.headers.host
    return {
      info: "All info is stored in Disk/DB and not in memory, will take some time to read it",
      params: "Use 'limit' and 'skip' as query parameter to display limited number of data with pagination",
      routes: {
        [`${url}${req.originalUrl}`]: "Description of Routes",
        [`${url}/collection`]: "Give List of Countries with its states and cities, and addional info",
        [`${url}/only-countries`]: "Give List of Countries Only",
        [`${url}/country-codes`]: "Give List of Country with Mobile Country Code",
        [`${url}/country-with-codes`]: "Give List of Country with Continent and its state. Use 'showStates=true' as query parameter to display all states. Use 'limit' and 'skip' as query parameter to display limited number of country withs states",
        [`${url}/country-with-info`]: "Give List of Country with language and main city",
        [`${url}/country-with-proper-details`]: "Give List of Country with All Proper Details With Flag, major cities and states. Use 'showStates=true' as query parameter to display all states. Use 'limit' and 'skip' as query parameter to display limited number of country withs states and its cities with lat and long",
        [`${url}/country-with-local-and-language`]: "Give List of Country with currency, phoneCode,locale,country code ,language and timezone",
        [`${url}/indian-cities-with-lat-long`]: "Give List of Indian Major Cities with lat and long",
        [`${url}/get-country-territories-details/(countryName)`]: "Give List of Country States with its cities. Use 'limit' and 'skip' as query parameter to display limited number of country withs states and its cities with lat and long",
        [`${url}/get-all-countries-cities/(countryName)`]: "Give List of All Country States with its cities",
        [`${url}/get-all-countries/(countryName)`]: "Give List of All Country with proper informations",
        [`${url}/get-countries-cities/(countryName)`]: "Give List of All Country and its major cites with proper informations",
        [`${url}/get-countries-territories-cities/(countryName)`]: "Give List of All Country and its states and cities or each states with proper details",
        [`${url}/get-countries-territories/(countryName)`]: "Give List of All Country + States in the world",
        [`${url}/get-all-territories/(countryName)`]: "Give List of All States in the world",
        [`${url}/get-all-territories-cities/(countryName)`]: "Give List of All Major Cities in the world",
        [`${url}/get-all-regions`]: "Give List of All continents",
        [`${url}/get-subregions`]: "Give List of All Sub Regions",
      }
    };
  }
  onlyCountries() {
    return this.requireFile("country-names")
  }
  onlyRequiredWithName(filePathWithName: string) {

    return this.requireFile(filePathWithName)
  }
  onlyRequiredWithNames() {
    return this.filterCountry()
  }
  private requireFile(filePath: string) {
    try {
      return require(`../utils/json/${filePath}.json`);
    } catch (e) {
      // @ts-ignore
      if (e.code !== "MODULE_NOT_FOUND") throw e;
      return null;
    }
  }
  private filterCountry() {
    return this.requireFile("country").map((country: any) => (country.filename)?.replace(/[\s_-]+/g, ""))
  } 
}