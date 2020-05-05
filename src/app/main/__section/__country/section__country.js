import { getCountryData, getHistoryCountry } from "../../../common_blocks/scripts/fetchData"

// Устанавливает данные в статистику
const setInfoCountry = async(country) => {
    const data = await getCountryData(country);
    const resData = data[0];
    document.querySelector('.stats__row-total-country').textContent = resData.cases.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    document.querySelector('.stats__row-active_cases-country').textContent = resData.cases.active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    document.querySelector('.stats__row-new_cases-country').textContent = resData.cases.new.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    document.querySelector('.stats__row-deaths-country').textContent = resData.deaths.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    document.querySelector('.stats__row-chanses-country').textContent = resData.tests.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");    
}
// Устанавливает графики 
const setGraphsCountry = async(country) => {
    const data = await getHistoryCountry(country),
          dates = [], 
          countryStatsTotal = [],
          countryStatsNew = [],
          countryStatsDeaths = [],
          countryStatsRecovers = [];

    for (let i = 0; i < data.length-1; i++) {
        if (data[i].day.slice(-2) !== data[i+1].day.slice(-2)) {
            dates.push(data[i].day.slice(-2));
            countryStatsTotal.push(data[i].cases.total);
            countryStatsNew.push(data[i].cases.new);
            countryStatsDeaths.push(data[i].deaths.total);
            countryStatsRecovers.push(data[i].cases.recovered);
        }
    }

    var ctx = document.getElementById('myChartCountry1');

    const chart = new Chart(ctx, {
        type: 'line',
        backgroundColor: 'black',
        data: {
            labels: dates.reverse(),
            datasets: [{
                label: `${country}`,
                fill: 'orange',
                backgroundColor: 'orange',
                borderColor: 'orange',
                data: countryStatsTotal.reverse()
            }]
        },
        options: {
            backgroundColor: 'black',
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                        drawBorder: true,
                    },
                    ticks: {
                        fontSize: 14,
                        fontColor: 'white'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                        drawBorder: true,
                    },
                    ticks: {
                        fontSize: 14,
                        fontColor: 'white'
                    }
                }]
            },
            legend: {
                labels: {
                    fontSize: 14,
                    fontColor: 'white'
                }
            }
        }
    })

    var ctx2 = document.getElementById('myChartCountry2');

    const chart2 = new Chart(ctx2, {
        type: 'line',
        backgroundColor: 'black',
        data: {
            labels: dates.reverse(),
            datasets: [{
                label: `${country}`,
                fill: 'orange',
                backgroundColor: 'orange',
                borderColor: 'orange',
                data: countryStatsNew.reverse()
            }]
        },
        options: {
            backgroundColor: 'black',
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                        drawBorder: true,
                    },
                    ticks: {
                        fontSize: 14,
                        fontColor: 'white'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                        drawBorder: true,
                    },
                    ticks: {
                        fontSize: 14,
                        fontColor: 'white'
                    }
                }]
            },
            legend: {
                labels: {
                    fontSize: 14,
                    fontColor: 'white'
                }
            }
        }
    })

    var ctx3 = document.getElementById('myChartCountry3');

    const chart3 = new Chart(ctx3, {
        type: 'line',
        backgroundColor: 'black',
        data: {
            labels: dates.reverse(),
            datasets: [{
                label: `Deaths`,
                fill: 'orange',
                backgroundColor: 'orange',
                borderColor: 'orange',
                data: countryStatsDeaths.reverse()
            }, {
                label: 'Recovers',
                fill: 'yellowgreen',
                backgroundColor: 'yellowgreen',
                borderColor: 'yellowgreen',
                data: countryStatsRecovers.reverse()
            }]
        },
        options: {
            backgroundColor: 'black',
            scales: {
                xAxes: [{
                    gridLines: {
                        display: true,
                        drawBorder: true,
                    },
                    ticks: {
                        fontSize: 14,
                        fontColor: 'white'
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: true,
                        drawBorder: true,
                    },
                    ticks: {
                        fontSize: 14,
                        fontColor: 'white'
                    }
                }]
            },
            legend: {
                labels: {
                    fontSize: 14,
                    fontColor: 'white'
                }
            }
        }
    })
}


export { setInfoCountry, setGraphsCountry }