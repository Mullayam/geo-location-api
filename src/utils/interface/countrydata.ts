export interface Root {
    id: string
    iso: string
    alpha_2: string
    country_name: string
    cover_image: string
    flag_url: string
    short_description: string
    known_for: KnownFor[]
    capital: string
    major_cities: string[]
    official_language: string[]
    currency: Currency
    major_religions: string
    national_day: NationalDay
    phone: Phone
    plug_types: string[]
    transport: Transport
    health: Health
    money: Money
    weather: Weather
    emergency: Emergency[]
  }
  
  export interface KnownFor {
    title: string
    color: string
  }
  
  export interface Currency {
    title: string
    symbol: string
  }
  
  export interface NationalDay {
    title: string
    date: string
  }
  
  export interface Phone {
    digital_code: string
    phone_operators: string[]
  }
  
  export interface Transport {
    driving_side: string
    taxi: Taxi[]
    metro: Metro[]
  }
  
  export interface Taxi {
    title: string
    url: string
  }
  
  export interface Metro {
    title: string
    url: string
  }
  
  export interface Health {
    tap_water_safety: string
    alcohol_consumption_age: string
    alcohol_parchase_age: string
    alcohol_info: string[]
  }
  
  export interface Money {
    tipping: Tipping
  }
  
  export interface Tipping {
    hotels: string
    guides: string
    restaurants: string
    taxis: string
  }
  
  export interface Weather {
    title: string
    when_to_visit: WhenToVisit[]
    best_time: string
  }
  
  export interface WhenToVisit {
    icon: string
    title: string
    time_period: string
    short_description: string
  }
  
  export interface Emergency {
    title: string
    number: string
  }
  