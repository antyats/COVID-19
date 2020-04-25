// Получает название стран по введенным символам
const getCountriesName = async(country) => {
    const data = await fetch(`https://covid-193.p.rapidapi.com/countries?search=${country}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "94223174a6msh7c4d84170319392p11a87fjsn892ad82fdb05"
        }
    });
    const countries = await data.json();
    return countries.response
}

export { getCountriesName }