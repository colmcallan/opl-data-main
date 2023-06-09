// vim: set ts=2 sts=2 sw=2 et:
//
// This file is part of OpenPowerlifting, an open archive of powerlifting data.
// Copyright (C) 2019 The OpenPowerlifting Project.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Automatically converts ISO country codes to our country names.

'use strict';

import { Csv, csvString } from "../csv";


// Map of substitutions.
const COUNTRY_MAP = {
    // International Olympic Committee country codes.
    // Also some common typos of those codes.
    "AFG": "Afghanistan",
    "ALB": "Albania",
    "ALG": "Algeria",
    "AHO": "Netherlands Antilles",
    "AND": "Andorra",
    "ANG": "Angola",
    "ANT": "Antigua and Barbuda",
    "ARG": "Argentina",
    "ARM": "Armenia",
    "ARU": "Aruba",
    "ASA": "American Samoa",
    "AUS": "Australia",
    "AUT": "Austria",
    "AZE": "Azerbaijan",
    "BAH": "Bahamas",
    "BAN": "Bangladesh",
    "BAR": "Barbados",
    "BDI": "Burundi",
    "BEL": "Belgium",
    "BEN": "Benin",
    "BER": "Bermuda",
    "BHU": "Bhutan",
    "BIH": "Bosnia and Herzegovina",
    "BIZ": "Belize",
    "BLR": "Belarus",
    "BOL": "Bolivia",
    "BOT": "Botswana",
    "BRA": "Brazil",
    "BRN": "Bahrain",
    "BRU": "Brunei",
    "BUL": "Bulgaria",
    "BUR": "Burkina Faso",
    "CAF": "Central African Republic",
    "CAM": "Cambodia",
    "CAN": "Canada",
    "CAY": "Cayman Islands",
    "CGO": "Congo",
    "CHA": "Chad",
    "CHI": "Chile",
    "CHN": "China",
    "CIV": "Ivory Coast",
    "IVC": "Ivory Coast",
    "CMR": "Cameroon",
    "COD": "Democratic Republic of the Congo",
    "COK": "Cook Islands",
    "COL": "Colombia",
    "COM": "Comoros",
    "CPV": "Cabo Verde",
    "CRC": "Costa Rica",
    "CRI": "Costa Rica",
    "CRO": "Croatia",
    "CUB": "Cuba",
    "CYP": "Cyprus",
    "CZE": "Czechia",
    "CZR": "Czechia",
    "TCH": "Czechia",
    "DAN": "Denmark",
    "DEN": "Denmark",
    "DNK": "Denmark",
    "DJI": "Djibouti",
    "DMA": "Dominica",
    "DOM": "Dominican Republic",
    "ECU": "Ecuador",
    "EGY": "Egypt",
    "ERI": "Eritrea",
    "ESA": "El Salvador",
    "ESP": "Spain",
    "SPA": "Spain",
    "EST": "Estonia",
    "ETH": "Ethiopia",
    "FIJ": "Fiji",
    "FJ": "Fiji",
    "FIN": "Finland",
    "FRA": "France",
    "FRG": "West Germany",
    "FGR": "West Germany",
    "FSM": "Federated States of Micronesia",
    "GAB": "Gabon",
    "GAM": "The Gambia",
    "GBR": "UK",
    "GBS": "Guinea-Bissau",
    "GEO": "Georgia",
    "ENG": "England",
    "GEQ": "Equatorial Guinea",
    "GER": "Germany",
    "GHA": "Ghana",
    "GRE": "Greece",
    "GRN": "Grenada",
    "GUA": "Guatemala",
    "GUI": "Guinea",
    "GUM": "Guam",
    "GUY": "Guyana",
    "HAI": "Haiti",
    "HKG": "Hong Kong",
    "HK": "Hong Kong",
    "HON": "Honduras",
    "HUN": "Hungary",
    "INA": "Indonesia",
    "IND": "India",
    "IRI": "Iran",
    "IRN": "Iran",
    "IRE": "Ireland",
    "IRL": "Ireland",
    "IRQ": "Iraq",
    "ISL": "Iceland",
    "ICE": "Iceland",
    "ICL": "Iceland",
    "ISR": "Israel",
    "ISV": "US Virgin Islands",
    "USVI": "US Virgin Islands",
    "ITA": "Italy",
    "IVB": "British Virgin Islands",
    "BVI": "British Virgin Islands",
    "JAM": "Jamaica",
    "JOR": "Jordan",
    "JPN": "Japan",
    "JAP": "Japan",
    "KAZ": "Kazakhstan",
    "KEN": "Kenya",
    "KGZ": "Kyrgyzstan",
    "KIR": "Kiribati",
    "KOR": "South Korea",
    "KOS": "Kosovo",
    "KSA": "Saudi Arabia",
    "KUW": "Kuwait",
    "LAO": "Laos",
    "LAT": "Latvia",
    "LBA": "Libya",
    "LYB": "Libya",
    "LBN": "Lebanon",
    "LIB": "Lebanon",
    "LBR": "Liberia",
    "LCA": "Saint Lucia",
    "LES": "Lesotho",
    "LIE": "Liechtenstein",
    "LTU": "Lithuania",
    "LIT": "Lithuania",
    "LTH": "Lithuania",
    "LUX": "Luxembourg",
    "MAD": "Madagascar",
    "MAR": "Morocco",
    "MAS": "Malaysia",
    "MAW": "Malawi",
    "MDA": "Moldova",
    "MDV": "Maldives",
    "MEX": "Mexico",
    "MGL": "Mongolia",
    "MHL": "Marshall Islands",
    "MKD": "North Macedonia",
    "MLI": "Mali",
    "MLT": "Malta",
    "MNE": "Montenegro",
    "MON": "Monaco",
    "MOZ": "Mozambique",
    "MRI": "Mauritius",
    "MTN": "Mauritania",
    "MYA": "Myanmar",
    "NAM": "Namibia",
    "NCA": "Nicaragua",
    "NED": "Netherlands",
    "NET": "Netherlands",
    "NLD": "Netherlands",
    "NTH": "Netherlands",
    "HOL": "Netherlands",
    "NEP": "Nepal",
    "NGR": "Nigeria",
    "NIG": "Niger",
    "NOR": "Norway",
    "NRU": "Nauru",
    "NZL": "New Zealand",
    "NZ": "New Zealand",
    "OMA": "Oman",
    "OMN": "Oman",
    "PAK": "Pakistan",
    "PAN": "Panama",
    "PAR": "Paraguay",
    "PER": "Peru",
    "PHI": "Philippines",
    "PLE": "Palestine",
    "PLW": "Palau",
    "PMR": "Transnistria",
    "PNG": "Papua New Guinea",
    "POL": "Poland",
    "POR": "Portugal",
    "PRK": "North Korea",
    "PUR": "Puerto Rico",
    "QAT": "Qatar",
    "ROU": "Romania",
    "ROM": "Romania",
    "RSA": "South Africa",
    "RUS": "Russia",
    "RWA": "Rwanda",
    "SAM": "Samoa",
    "SEN": "Senegal",
    "SEY": "Seychelles",
    "SGP": "Singapore",
    "SIN": "Singapore",
    "SKN": "Saint Kitts and Nevis  ",
    "SLE": "Sierra Leone",
    "SLO": "Slovenia",
    "SMR": "San Marino",
    "SOL": "Solomon Islands",
    "SOM": "Somalia",
    "SRB": "Serbia",
    "SCG": "Serbia and Montenegro",
    "SRI": "Sri Lanka",
    "SSD": "South Sudan",
    "SOV": "USSR",
    "URS": "USSR",
    "STP": "São Tomé and Príncipe",
    "SUD": "Sudan",
    "SUI": "Switzerland",
    "SUR": "Suriname",
    "SVK": "Slovakia",
    "SWE": "Sweden",
    "SVE": "Sweden",
    "SWZ": "Eswatini",
    "SYR": "Syria",
    "TAH": "Tahiti",
    "TAN": "Tanzania",
    "TGA": "Tonga",
    "THA": "Thailand",
    "TJK": "Tajikistan",
    "TKM": "Turkmenistan",
    "TLS": "East Timor",
    "TOG": "Togo",
    "TPE": "Taiwan",
    "TAI": "Taiwan",
    "TTO": "Trinidad and Tobago",
    "TT": "Trinidad and Tobago",
    "TRI": "Trinidad and Tobago",
    "TUN": "Tunisia",
    "TUR": "Turkey",
    "TUV": "Tuvalu",
    "UGA": "Uganda",
    "UKR": "Ukraine",
    "URU": "Uruguay",
    "USA": "USA",
    "UZB": "Uzbekistan",
    "VAN": "Vanuatu",
    "VEN": "Venezuela",
    "VIE": "Vietnam",
    "VIN": "Saint Vincent and the Grenadines",
    "YEM": "Yemen",
    "YUG": "Yugoslavia",
    "ZAM": "Zambia",
    "ZIM": "Zimbabwe",

    // Common substitutions to match our format.
    "Belorussia": "Belarus",
    "Brasil": "Brazil",
    "Britain": "UK",
    "Can": "Canada",
    "Cape Verde": "Cabo Verde",
    "Chinese Taipei": "Taiwan",
    "C.Taipei": "Taiwan",
    "C. Taipei": "Taiwan",
    "Chinese Tai.": "Taiwan",
    "Chin.Taipei": "Taiwan",
    "Czech Republic": "Czechia",
    "Danmark": "Denmark",
    "Dannmark": "Denmark",
    "Eng": "England",
    "Estoniya": "Estonia",
    "Equador": "Ecuador",
    "FIJI": "Fiji",
    "Fra": "France",
    "Great Britain": "UK",
    "G. Brtain": "UK",
    "G. Britain": "UK",
    "Holland": "Netherlands",
    "Ísland": "Iceland",
    "Island": "Iceland",
    "Jap": "Japan",
    "Kazahkstan": "Kazakhstan",
    "Kazakstan": "Kazakhstan",
    "KIRI": "Kiribati",
    "Luxembg": "Luxembourg",
    "N. Ireland": "N.Ireland",
    "NCAL": "New Caledonia",
    "N Cald": "New Caledonia",
    "N.Cald": "New Caledonia",
    "N. Caledonia": "New Caledonia",
    "New Zeeland": "New Zealand",
    "NIUE": "Niue",
    "Norge": "Norway",
    "Norwegen": "Norway",
    "Perú": "Peru",
    "R.S.Afrika": "South Africa",
    "R.South Africa": "South Africa",
    "Slovak Republic": "Slovakia",
    "South-Africa": "South Africa",
    "South Afrika": "South Africa",
    "Soviet Union": "USSR",
    "Sverige": "Sweden",
    "Trinidad&Tobago": "Trinidad and Tobago",
    "Trinidad & Tobago": "Trinidad and Tobago",
    "Trinidad And Tobago": "Trinidad and Tobago",
    "Ukraina": "Ukraine",
    "Україна": "Ukraine",
    "Украина": "Ukraine",
    "United Arab Emirates": "UAE",
    "Un.Emirates": "UAE",
    "US.America": "USA",
    "U.S..America": "USA",
    "U.S. America": "USA",
    "US. America": "USA",
    "US America": "USA",
    "U.S.America": "USA",
    "United States of America": "USA",
    "United States": "USA",
    "US": "USA",
    "Virgin Is.": "US Virgin Islands",
    "Whiterussia": "Belarus"
};


// Creates a new Csv file with the Country assigned.
//
// On success, returns the new Csv.
export const csvStandardiseCountries = (source: Csv): Csv | string => {
  const csv = source.shallowClone();
  const CountryIndex = csv.index("Country");

  // If there is no country we don't have to do anything.
  if (csv.index("Country") < 0) return csv;


  for (let ii = 0; ii < csv.rows.length; ++ii) {
    let LifterCountry = csv.rows[ii][CountryIndex];
    if (LifterCountry in COUNTRY_MAP) csv.rows[ii][CountryIndex]  = COUNTRY_MAP[LifterCountry]

  }

  return csv;
};
