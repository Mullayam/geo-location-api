import { Request as ExpressRequest } from 'express';
import { Controller, Get, Params, Query, Request } from 'src/modules/app'
import { DataProvider } from 'src/services';
import {Throttler} from '@/modules/app/core/rate-limitors'

@Controller('/',[Throttler.forRoute('Api Controller', { max: 100,limit: 5,windowMs: 60  * 1000 })])
export default class BaseController {
  constructor(private dataProvider: DataProvider) { }

  @Get('/', [])
  index(@Request() req: ExpressRequest) {

    return this.dataProvider.data(req);
  }
  @Get('/only-countries',)
  getOnlyCountries() {
    return this.dataProvider.onlyCountries();
  }
  @Get('/country-codes',)
  getOnlyCountriesCodes() {
    return this.dataProvider.onlyRequiredWithName("country-codes");
  }
  @Get('/country-with-codes',)
  getOnlyCountriesWithCodes(@Query() query: { showStates?: string, limit?: string | number, skip?: string | number } = { limit: 10, skip: 0 }) {

    if (!query.limit || !query.skip) {
      query.limit = query.limit || 10
      query.skip = query.skip || 0
    }

    const fetchCountries = this.dataProvider.onlyRequiredWithName("country").slice(Number(query.skip), Number(query.limit))
    if (!query.showStates) {
      return { ...query, total: fetchCountries.length, countries: fetchCountries };
    }
    const modifiedData = fetchCountries.map((country: any) => {
      return {
        ...country,
        states: this.dataProvider.onlyRequiredWithName("/countries/" + (country.filename)?.replace(/[\s_-]+/g, ""))
      }
    })
    return { ...query, total: modifiedData.length, countries: modifiedData };
  }
  @Get('/country-with-info',)
  getOnlyCountriesWithInfo() {
    return this.dataProvider.onlyRequiredWithName("country2");
  }

  @Get('/country-with-proper-details',)
  getOnlyCountriesWithProperDetails() {
    return this.dataProvider.onlyRequiredWithName("country3");
  }
  @Get('/country-with-local-and-language',)
  getCountriesWithLocalAndLanguage() {
    return this.dataProvider.onlyRequiredWithName("country4");
  }
  @Get('/indian-cities-with-lat-long',)
  getIndianCitiesWithLatLong() {
    const data = this.dataProvider.onlyRequiredWithName("indian-cities-with-lat-long")
    return { total: data.length, data };
  }
  @Get('/get-country-territories-details/:countryName?',)
  getCountryStates(@Params("countryName") countryName: string) {
    if (!countryName) {
      return this.dataProvider.onlyRequiredWithNames()
    }
    const data = this.dataProvider.onlyRequiredWithNames()
    if (data.includes(countryName)) {
      return this.dataProvider.onlyRequiredWithName("/countries/" + countryName);
    }
    return { info: "The Country you looking for is Not Found, please select from list", countries: data }
  }
   
  @Get('/get-all-countries-cities/:countryName?',)
  getAllCountriesCities(@Params("countryName") countryName: string, @Query() query: { limit?: string | number, skip?: string | number } = { limit: 10, skip: 0 }) {

    if (!query.limit || !query.skip) {
      query.limit = query.limit || 5
      query.skip = query.skip || 0
    }
    let totalAvailable = this.dataProvider.onlyRequiredWithName("/countries-states-cities-database/cities")
    const data = totalAvailable.slice(Number(query.skip), Number(query.limit))
    if (countryName) {
      totalAvailable = data.map((item: { country_name: string; country_code: string; }): any => {
        if ((item.country_name) === countryName || (item.country_code)?.toLowerCase() === countryName.toLowerCase()) {
          return item
        }
      })
      return {
        totalAvailable: totalAvailable.length, ...query,
        data
      }
    }

    return {
       totalAvailable: totalAvailable.length, ...query,
      data
    }
  }
  @Get('/get-all-countries/:countryName?')
  getAllCountries(@Params("countryName") countryName: string, @Query() query: { limit?: string | number, skip?: string | number } = { limit: 10, skip: 0 }) {

    if (!query.limit || !query.skip) {
      query.limit = query.limit || 10
      query.skip = query.skip || 0
    }
    let totalAvailable = this.dataProvider.onlyRequiredWithName("/countries-states-cities-database/countries")
    const data = totalAvailable.slice(Number(query.skip), Number(query.limit))
    if (countryName) {
      totalAvailable = totalAvailable.map((item: { name: string; iso2: string; }): any => {
        if ((item.name) === countryName || (item.iso2)?.toLowerCase() === countryName.toLowerCase()) {
          return item
        }
      })
      return {
        totalAvailable: totalAvailable.length, ...query,
        data
      }
    }

    return {
      totalAvailable: totalAvailable.length, ...query,
      data
    }
  }
  @Get('/get-countries-cities')
  getAllCountryCities(@Params("countryName") countryName: string, @Query() query: { limit?: string | number, skip?: string | number } = { limit: 5, skip: 0 }) {

    if (!query.limit || !query.skip) {
      query.limit = query.limit || 2
      query.skip = query.skip || 0
    }
    let totalAvailable = this.dataProvider.onlyRequiredWithName("/countries-states-cities-database/countries+cities")
    const data = totalAvailable.slice(Number(query.skip), Number(query.limit))
    if (countryName) {
      totalAvailable = totalAvailable.map((item: { name: string; iso2: string; }): any => {
        if ((item.name) === countryName || (item.iso2)?.toLowerCase() === countryName.toLowerCase()) {
          return item
        }
      })
      return {
        totalAvailable: totalAvailable.length, ...query,
        data
      }
    }

    return {
       totalAvailable: totalAvailable.length, ...query,
      data
    }
  }
  @Get('/get-countries-territories-cities/:countryName?')
  getAllCountriesTerritoriesCites(@Params("countryName") countryName: string, @Query() query: { limit?: string | number, skip?: string | number } = { limit: 10, skip: 0 }) {

    if (!query.limit || !query.skip) {
      query.limit = query.limit || 2
      query.skip = query.skip || 0
    }
    let totalAvailable = this.dataProvider.onlyRequiredWithName("/countries-states-cities-database/countries+states+cities")
    const data = totalAvailable.slice(Number(query.skip), Number(query.limit))
    if (countryName) {
      totalAvailable = data.map((item: { name: string; iso2: string; }): any => {
        if ((item.name) === countryName || (item.iso2)?.toLowerCase() === countryName.toLowerCase()) {
          return item
        }
      })
      return {
        totalAvailable: totalAvailable.length, ...query,
        data:data
      }
    }

    return {
       totalAvailable: totalAvailable.length, ...query,
       data:data
       }
  }
  @Get('/get-countries-territories/:countryName?')
  getAllCountryTerritories(@Params("countryName") countryName: string, @Query() query: { limit?: string | number, skip?: string | number } = { limit: 10, skip: 0 }) {

    if (!query.limit || !query.skip) {
      query.limit = query.limit || 5
      query.skip = query.skip || 0
    }
    let totalAvailable = this.dataProvider.onlyRequiredWithName("/countries-states-cities-database/countries+states")
    const data = totalAvailable.slice(Number(query.skip), Number(query.limit))
    if (countryName) {
      totalAvailable = data.map((item: { name: string; iso2: string; }): any => {
        if ((item.name) === countryName || (item.iso2)?.toLowerCase() === countryName.toLowerCase()) {
          return item
        }
      })
      return {
        totalAvailable: totalAvailable.length, ...query,
        data:data
      }
    }

    return {
      totalAvailable: totalAvailable.length, ...query,
      data:data
    }
  }
  
  @Get('/get-all-territories/:countryName?')
  getAllStates(@Params("countryName") countryName: string, @Query() query: { limit?: string | number, skip?: string | number } = { limit: 10, skip: 0 }) {

    if (!query.limit || !query.skip) {
      query.limit = query.limit || 10
      query.skip = query.skip || 0
    }
    let totalAvailable = this.dataProvider.onlyRequiredWithName("/countries-states-cities-database/states")
    const data = totalAvailable.slice(Number(query.skip), Number(query.limit))
    if (countryName) {
      totalAvailable = totalAvailable.map((item: { name: string; iso2: string; }): any => {
        if ((item.name) === countryName || (item.iso2)?.toLowerCase() === countryName.toLowerCase()) {
          return item
        }
      })
      return {
        totalAvailable: totalAvailable.length, ...query,
        data
      }
    }

    return {
      info: "The Country you looking for is Not Found, please select from list", totalAvailable: totalAvailable.length, ...query,
      data
    }
  }
  @Get('/get-all-territories-cities/:countryName?')
  getAllStatesAndCities(@Params("countryName") countryName: string, @Query() query: { limit?: string | number, skip?: string | number } = { limit: 10, skip: 0 }) {

    if (!query.limit || !query.skip) {
      query.limit = query.limit || 10
      query.skip = query.skip || 0
    }
    let totalAvailable = this.dataProvider.onlyRequiredWithName("/countries-states-cities-database/states+cities")
    const data = totalAvailable.slice(Number(query.skip), Number(query.limit))
    if (countryName) {
      totalAvailable = data.map((item: { name: string; iso2: string; }): any => {
        if ((item.name) === countryName || (item.iso2)?.toLowerCase() === countryName.toLowerCase()) {
          return item
        }
      })
      return {
        totalAvailable: totalAvailable.length, ...query,
        data
      }
    }

    return {
      info: "The Country you looking for is Not Found, please select from list", totalAvailable: totalAvailable.length, ...query,
      data
    }
  }
  @Get('/get-all-regions')
  getAllRegions() {

    
    let totalAvailable = this.dataProvider.onlyRequiredWithName("/countries-states-cities-database/regions")
     
    return {
      totalAvailable: totalAvailable.length,  
      data:totalAvailable
    }
  }
  @Get('/get-subregions',)
  getAllSubregions() {
    
    let totalAvailable = this.dataProvider.onlyRequiredWithName("/countries-states-cities-database/subregions")
     
    return {
      totalAvailable: totalAvailable.length,
      data:totalAvailable
    }
  }
}
