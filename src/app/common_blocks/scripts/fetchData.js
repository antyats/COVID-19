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

// Получает все данные по всем странам в неотсортированном виде
const getData = async() => {
    const data = await fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "94223174a6msh7c4d84170319392p11a87fjsn892ad82fdb05"
        }
    })
    const res = await data.json();
    return res.response
}


// Класс, в котором представлены все сортировки данных
class getStatisticData {

    constructor() {
        return (async() => {
            this.data = await getData();
            return this
        })();
    }

    byTotalAll = async() => {
        this.data.sort((a, b) => {
            return b.cases.total - a.cases.total
        })
        return this.data
    }

    byTotalCases = async() => {
        this.data.sort((a, b) => {
            return b.cases.total - a.cases.total
        });

        const sortedData = this.data.filter(({ country }) => country != 'All' && country != 'Asia' && country != 'Europe' && country != 'North-America' && country != 'South-America');
        return sortedData
    }

    byNewCases = async() => {
        this.data.sort((a, b) => {
            return b.cases.new - a.cases.new
        })

        const sortedData = this.data.filter(({ country }) => country != 'All' && country != 'Asia' && country != 'Europe' && country != 'North-America');

        return sortedData
    }

    byDeaths = async() => {
        this.data.sort((a, b) => {
            return b.deaths.total - a.deaths.total
        })

        const sortedData = this.data.filter(({ country }) => country != 'All' && country != 'Asia' && country != 'Europe' && country != 'North-America');

        return sortedData
    }

    byChanses = async() => {
        const all = await this.byTotalAll();
        return Number(100 - (all[0].deaths.total / all[0].cases.recovered) * 100);
    }
}


export { getCountriesName, getStatisticData }
