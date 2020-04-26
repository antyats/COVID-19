// FUNCTIONS
import { getStatisticData } from "../../../../common_blocks/scripts/fetchData"

// Устанавливает полученные данные на сайт 
const getSortData = async() => {
    // Создает объект со всеми доступными способами сортировки
    const data = await new getStatisticData();
    setTopCasesByCountry(data.byTotalAll(), '', 'stats__row-total', 'total');
    setTopCasesByCountry(data.byTotalCases(), 'stats__row-name-active_cases', 'stats__row-active_cases', 'total');
    setTopCasesByCountry(data.byNewCases(), 'stats__row-name-new_cases', 'stats__row-new_cases', 'new');
    setTopByDeaths(data.byDeaths(), 'stats__row-name-deaths_cases', 'stats__row-deaths');
    setChansesToRecover(data.byChanses(), 'stats__row-chanses');
}

// Устанавливает данные, доступные в cases по параметру genre
const setTopCasesByCountry = async(data, selectorCountryName, selectorNumber, genre) => {
    // Получает отсортированный список из всех стран и выберает первую страну
    const info = await data,
          countryName = info[0].country;
    // Если параметр genre не указан, значит берется значение не из cases
    const countryCases = genre ? info[0].cases[genre] : info[0];
    // Если указан селектор для названия страны, указывает название страны и тип сортировки
    if (selectorCountryName) {
        document.querySelector(`.${selectorCountryName}`).textContent = `${countryName} - ${genre.charAt(0).toUpperCase() + genre.slice(1)} Cases`;

    }
    // Если указан селектор для числа случаев, то вставляет число случаев с пробелами между разрядами в селектор
    if (selectorNumber) {
        document.querySelector(`.${selectorNumber}`).textContent = countryCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
}

// Устанавливает страну по большему числу смертрей
const setTopByDeaths = async(data, selectorCountryName, selectorNumber) => {
    const info = await data,
          countryName = info[0].country,
          countryCases = info[0].deaths.total;
    
    document.querySelector(`.${selectorCountryName}`).textContent = `${countryName} - Deaths`;
    document.querySelector(`.${selectorNumber}`).textContent = countryCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Устанавливает кол-во умерших людей на кол-во выздоровивших
const setChansesToRecover = async(data, selectorNumber) => {
    const info = await data;
    document.querySelector(`.${selectorNumber}`).textContent = `${Math.floor(info)}%`;
}


getSortData();