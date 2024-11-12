const axios = require("axios");
const exchangeRateModel = require("../models/exchangeRateModel");
const {models} = require("mongoose");
const currencySymbols = {
    AED: "د.إ",      // UAE Dirham
    AFN: "؋",       // Afghan Afghani
    ALL: "L",       // Albanian Lek
    AMD: "֏",       // Armenian Dram
    ANG: "ƒ",       // Netherlands Antillean Guilder
    AOA: "Kz",      // Angolan Kwanza
    ARS: "$",       // Argentine Peso
    AUD: "A$",      // Australian Dollar
    AWG: "ƒ",       // Aruban Florin
    AZN: "₼",       // Azerbaijani Manat
    BAM: "KM",      // Bosnia-Herzegovina Convertible Mark
    BBD: "$",       // Barbadian Dollar
    BDT: "৳",       // Bangladeshi Taka
    BGN: "лв",      // Bulgarian Lev
    BHD: ".د.ب",    // Bahraini Dinar
    BIF: "FBu",     // Burundian Franc
    BMD: "$",       // Bermudian Dollar
    BND: "$",       // Brunei Dollar
    BOB: "Bs.",     // Bolivian Boliviano
    BRL: "R$",      // Brazilian Real
    BSD: "$",       // Bahamian Dollar
    BTN: "Nu.",     // Bhutanese Ngultrum
    BWP: "P",       // Botswana Pula
    BYN: "Br",      // Belarusian Ruble
    BZD: "$",       // Belize Dollar
    CAD: "$",       // Canadian Dollar
    CDF: "FC",      // Congolese Franc
    CHF: "CHF",     // Swiss Franc
    CLP: "$",       // Chilean Peso
    CNY: "¥",       // Chinese Yuan
    COP: "$",       // Colombian Peso
    CRC: "₡",       // Costa Rican Colón
    CUP: "$",       // Cuban Peso
    CVE: "$",       // Cape Verdean Escudo
    CZK: "Kč",      // Czech Koruna
    DJF: "Fdj",     // Djiboutian Franc
    DKK: "kr",      // Danish Krone
    DOP: "$",       // Dominican Peso
    DZD: "دج",      // Algerian Dinar
    EGP: "£",       // Egyptian Pound
    ERN: "Nfk",     // Eritrean Nakfa
    ESP: "€",       //Spanish Euro
    ETB: "Br",      // Ethiopian Birr
    EUR: "€",       // Euro
    FJD: "$",       // Fijian Dollar
    FKP: "£",       // Falkland Islands Pound
    FIM: "mk",      // Finnish Markka (obsolete)
    GBP: "£",       // British Pound
    GEL: "₾",       // Georgian Lari
    GGP: "£",       // Guernsey Pound
    GHS: "₵",       // Ghanaian Cedi
    GIP: "£",       // Gibraltar Pound
    GMD: "D",       // Gambian Dalasi
    GNF: "FG",      // Guinean Franc
    GTQ: "Q",       // Guatemalan Quetzal
    GYD: "$",       // Guyanese Dollar
    HKD: "HK$",     // Hong Kong Dollar
    HNL: "L",       // Honduran Lempira
    HRK: "kn",      // Croatian Kuna
    HTG: "G",       // Haitian Gourde
    HUF: "Ft",      // Hungarian Forint
    IDR: "Rp",      // Indonesian Rupiah
    ILS: "₪",       // Israeli New Shekel
    IMP: "£",       // Isle of Man Pound
    INR: "₹",       // Indian Rupee
    IQD: "ع.د",    // Iraqi Dinar
    IRR: "﷼",      // Iranian Rial
    ISK: "kr",      // Icelandic Krona
    JEP: "£",       // Jersey Pound
    JMD: "$",       // Jamaican Dollar
    JOD: "د.ا",     // Jordanian Dinar
    JPY: "¥",       // Japanese Yen
    KES: "KSh",     // Kenyan Shilling
    KGS: "с",       // Kyrgyzstani Som
    KHR: "៛",       // Cambodian Riel
    KMF: "CF",      // Comorian Franc
    KPW: "₩",       // North Korean Won
    KRW: "₩",       // South Korean Won
    KWD: "د.ك",    // Kuwaiti Dinar
    KYD: "$",       // Cayman Islands Dollar
    KZT: "₸",       // Kazakhstani Tenge
    LAK: "₭",       // Lao Kip
    LBP: "ل.ل",    // Lebanese Pound
    LKR: "රු",      // Sri Lankan Rupee
    LRD: "$",       // Liberian Dollar
    LSL: "L",       // Lesotho Loti
    LTL: "Lt",      // Lithuanian Litas (obsolete)
    LVL: "Ls",      // Latvian Lats (obsolete)
    LYD: "ل.د",    // Libyan Dinar
    MAD: "د.م.",   // Moroccan Dirham
    MDL: "L",       // Moldovan Leu
    MGA: "Ar",      // Malagasy Ariary
    MKD: "ден",     // Macedonian Denar
    MMK: "Ks",      // Myanmar Kyat
    MNT: "₮",       // Mongolian Tugrik
    MOP: "MOP$",    // Macanese Pataca
    MRO: "UM",      // Mauritanian Ouguiya
    MRU: "UM",      // Mauritanian Ouguiya (new)
    MUR: "₨",       // Mauritian Rupee
    MVR: "Rf",      // Maldivian Rufiyaa
    MWK: "MK",      // Malawian Kwacha
    MXN: "$",       // Mexican Peso
    MYR: "RM",      // Malaysian Ringgit
    MZN: "MT",      // Mozambican Metical
    NAD: "$",       // Namibian Dollar
    NGN: "₦",       // Nigerian Naira
    NIO: "C$",      // Nicaraguan Córdoba
    NOK: "kr",      // Norwegian Krone
    NPR: "₨",       // Nepalese Rupee
    NZD: "NZ$",     // New Zealand Dollar
    OMR: "﷼",      // Omani Rial
    PAB: "B/.",     // Panamanian Balboa
    PEN: "S/.",     // Peruvian Sol
    PGK: "K",       // Papua New Guinean Kina
    PHP: "₱",       // Philippine Peso
    PKR: "₨",       // Pakistani Rupee
    PLN: "zł",      // Polish Zloty
    PYG: "₲",       // Paraguayan Guarani
    QAR: "﷼",      // Qatari Riyal
    RON: "lei",     // Romanian Leu
    RSD: "дин.",   // Serbian Dinar
    RUB: "₽",       // Russian Ruble
    RWF: "FRw",     // Rwandan Franc
    SAR: "﷼",      // Saudi Riyal
    SBD: "$",       // Solomon Islands Dollar
    SCR: "₨",       // Seychellois Rupee
    SDG: "ج.س.",    // Sudanese Pound
    SEK: "kr",      // Swedish Krona
    SGD: "S$",      // Singapore Dollar
    SHP: "£",       // Saint Helena Pound
    SLL: "Le",      // Sierra Leonean Leone
    SOS: "S",       // Somali Shilling
    SRD: "$",       // Surinamese Dollar
    SSP: "£",       // South Sudanese Pound
    STD: "Db",      // São Tomé and Príncipe Dobra
    SYP: "£",       // Syrian Pound
    SZL: "L",       // Swazi Lilangeni
    THB: "฿",       // Thai Baht
    TJS: "ЅМ",      // Tajikistani Somoni
    TMT: "m",       // Turkmenistani Manat
    TND: "د.ت",     // Tunisian Dinar
    TOP: "T$",      // Tongan Paʻanga
    TRY: "₺",       // Turkish Lira
    TTD: "$",       // Trinidad and Tobago Dollar
    TWD: "NT$",     // New Taiwan Dollar
    TZS: "Sh",      // Tanzanian Shilling
    UAH: "₴",       // Ukrainian Hryvnia
    UGX: "USh",     // Ugandan Shilling
    USD: "$",       // United States Dollar
    UYU: "$U",      // Uruguayan Peso
    UZS: "сўм",     // Uzbekistani Som
    VEF: "Bs",      // Venezuelan Bolívar
    VES: "Bs.S",    // Venezuelan Bolívar Soberano
    VND: "₫",       // Vietnamese Dong
    VUV: "VT",      // Vanuatu Vatu
    WST: "T",       // Samoan Tala
    XAF: "FCFA",    // Central African CFA Franc
    XCD: "$",       // East Caribbean Dollar
    XOF: "CFA",     // West African CFA Franc
    XPF: "₣",       // CFP Franc
    YER: "﷼",      // Yemeni Rial
    ZAR: "R",       // South African Rand
    ZMW: "ZK",      // Zambian Kwacha
    ZWL: "$",       // Zimbabwean Dollar
};

const fetchAndUpdateExchangeRates = async () => {
    try {
        const response = await axios.get("https://api.currencybeacon.com/v1/latest", {
            params: {
                api_key: process.env.CURRENCY_BEACON_API_KEY,
                base: "USD"
            }
        });

        const rates = response.data.response.rates;
        const currentTimestamp = new Date();

        for (const [currency, rate] of Object.entries(rates)) {
            const symbol = currencySymbols[currency] || currency;

            await exchangeRateModel.findOneAndUpdate(
                { currency },
                { currency, rate, symbol, lastUpdated: currentTimestamp },
                { upsert: true, new: true }
            );
        }
        console.log('------------------FETCHED-EXCHANGE-RATES------------');
    } catch (error) {
        console.error("Error fetching or updating exchange rates:", error);
    }
};

module.exports=fetchAndUpdateExchangeRates