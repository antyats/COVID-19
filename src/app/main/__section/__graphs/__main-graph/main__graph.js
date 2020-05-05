import {
    getHistoryCountry
} from "../../../../common_blocks/scripts/fetchData";
import Chart from 'chart.js';

// Переделать, очень тупо
const getTotalHistoryCases = async() => {
    const data = await getHistoryCountry('usa');
    const data2 = await getHistoryCountry('russia');
    const data3 = await getHistoryCountry('italy');
    const data4 = await getHistoryCountry('germany');
    const data5 = await getHistoryCountry('sweden');
    
    const dates = [], usaStats = [], russiaStats = [], italyStats = [], germanyStats = [], swedenStats = [];

    for (let i = 0; i < data.length-1; i++) {
        if (data[i].day.slice(-2) !== data[i+1].day.slice(-2)) {
            dates.push(data[i].day.slice(-2));
            usaStats.push(data[i].cases.total);
        }
    }

    for (let i = 0; i < data2.length-1; i++) {
        if (data2[i].day.slice(-2) !== data2[i+1].day.slice(-2)) {
            russiaStats.push(data2[i].cases.total);
        }   
    }

    for (let i = 0; i < data3.length-1; i++) {
        if (data3[i].day.slice(-2) !== data3[i+1].day.slice(-2)) {
            italyStats.push(data3[i].cases.total);
        }   
    }

    for (let i = 0; i < data4.length-1; i++) {
        if (data4[i].day.slice(-2) !== data4[i+1].day.slice(-2)) {
            germanyStats.push(data4[i].cases.total);
        }
    }

    for (let i = 0; i < data5.length-1; i++) {
        if (data5[i].day.slice(-2) !== data5[i+1].day.slice(-2)) {
            swedenStats.push(data5[i].cases.total);
        }
    }
    
    const chart = new Chart(ctx, {
        type: 'line',
        backgroundColor: 'black',
        data: {
            labels: dates.reverse(),
            datasets: [{
                label: 'USA',
                fill: 'red',
                backgroundColor: 'red',
                borderColor: 'red',
                data: usaStats.reverse()
            }, {
                label: 'Russia',
                fill: 'white',
                backgroundColor: 'white',
                borderColor: 'white',
                data: russiaStats.reverse()
            }, {
                label: 'Italy',
                fill: 'yellowgreen',
                backgroundColor: 'yellowgreen',
                borderColor: 'yellowgreen',
                data: italyStats.reverse()
            }, {
                label: 'Germany',
                fill: 'orange',
                backgroundColor: 'orange',
                borderColor: 'orange',
                data: germanyStats.reverse()
            }, {
                label: 'Sweden',
                fill: 'yellow',
                backgroundColor: 'yellow',
                borderColor: 'yellow',
                data: swedenStats.reverse()
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

getTotalHistoryCases();

var ctx = document.getElementById('myChart');

const getTotalNewCases = async() => {
    const data = await getHistoryCountry('usa');
    const data2 = await getHistoryCountry('russia');
    const data3 = await getHistoryCountry('italy');
    const data4 = await getHistoryCountry('germany');
    const data5 = await getHistoryCountry('sweden');
    
    const dates = [], usaStats = [], russiaStats = [], italyStats = [], germanyStats = [], swedenStats = [];



    for (let i = 0; i < data.length-1; i++) {
        if (data[i].day.slice(-2) !== data[i+1].day.slice(-2)) {
            dates.push(data[i].day.slice(-2));
            usaStats.push(data[i].cases.new);
        }
    }

    for (let i = 0; i < data2.length-1; i++) {
        if (data2[i].day.slice(-2) !== data2[i+1].day.slice(-2)) {
            russiaStats.push(data2[i].cases.new);
        }   
    }

    for (let i = 0; i < data3.length-1; i++) {
        if (data3[i].day.slice(-2) !== data3[i+1].day.slice(-2)) {
            italyStats.push(data3[i].cases.new);
        }   
    }

    for (let i = 0; i < data4.length-1; i++) {
        if (data4[i].day.slice(-2) !== data4[i+1].day.slice(-2)) {
            germanyStats.push(data4[i].cases.new);
        }
    }

    for (let i = 0; i < data5.length-1; i++) {
        if (data5[i].day.slice(-2) !== data5[i+1].day.slice(-2)) {
            swedenStats.push(data5[i].cases.new);
        }
    }
    
    const chart = new Chart(ctx2, {
        type: 'line',
        backgroundColor: 'black',
        data: {
            labels: dates.reverse(),
            datasets: [{
                label: 'USA',
                fill: 'red',
                backgroundColor: 'red',
                borderColor: 'red',
                data: usaStats.reverse()
            }, {
                label: 'Russia',
                fill: 'white',
                backgroundColor: 'white',
                borderColor: 'white',
                data: russiaStats.reverse()
            }, {
                label: 'Italy',
                fill: 'yellowgreen',
                backgroundColor: 'yellowgreen',
                borderColor: 'yellowgreen',
                data: italyStats.reverse()
            }, {
                label: 'Germany',
                fill: 'orange',
                backgroundColor: 'orange',
                borderColor: 'orange',
                data: germanyStats.reverse()
            }, {
                label: 'Sweden',
                fill: 'yellow',
                backgroundColor: 'yellow',
                borderColor: 'yellow',
                data: swedenStats.reverse()
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

getTotalNewCases();

var ctx2 = document.getElementById('myChart2');

const getTotalDeathCases = async() => {
    const data = await getHistoryCountry('usa');
    const data2 = await getHistoryCountry('russia');
    const data3 = await getHistoryCountry('italy');
    const data4 = await getHistoryCountry('germany');
    const data5 = await getHistoryCountry('sweden');
    
    const dates = [], usaStats = [], russiaStats = [], italyStats = [], germanyStats = [], swedenStats = [];



    for (let i = 0; i < data.length-1; i++) {
        if (data[i].day.slice(-2) !== data[i+1].day.slice(-2)) {
            dates.push(data[i].day.slice(-2));
            usaStats.push(data[i].deaths.total);
        }
    }

    for (let i = 0; i < data2.length-1; i++) {
        if (data2[i].day.slice(-2) !== data2[i+1].day.slice(-2)) {
            russiaStats.push(data2[i].deaths.total);
        }   
    }

    for (let i = 0; i < data3.length-1; i++) {
        if (data3[i].day.slice(-2) !== data3[i+1].day.slice(-2)) {
            italyStats.push(data3[i].deaths.total);
        }   
    }

    for (let i = 0; i < data4.length-1; i++) {
        if (data4[i].day.slice(-2) !== data4[i+1].day.slice(-2)) {
            germanyStats.push(data4[i].deaths.total);
        }
    }

    for (let i = 0; i < data5.length-1; i++) {
        if (data5[i].day.slice(-2) !== data5[i+1].day.slice(-2)) {
            swedenStats.push(data5[i].deaths.total);
        }
    }
    
    const chart = new Chart(ctx3, {
        type: 'line',
        backgroundColor: 'black',
        data: {
            labels: dates.reverse(),
            datasets: [{
                label: 'USA',
                fill: 'red',
                backgroundColor: 'red',
                borderColor: 'red',
                data: usaStats.reverse()
            }, {
                label: 'Russia',
                fill: 'white',
                backgroundColor: 'white',
                borderColor: 'white',
                data: russiaStats.reverse()
            }, {
                label: 'Italy',
                fill: 'yellowgreen',
                backgroundColor: 'yellowgreen',
                borderColor: 'yellowgreen',
                data: italyStats.reverse()
            }, {
                label: 'Germany',
                fill: 'orange',
                backgroundColor: 'orange',
                borderColor: 'orange',
                data: germanyStats.reverse()
            }, {
                label: 'Sweden',
                fill: 'yellow',
                backgroundColor: 'yellow',
                borderColor: 'yellow',
                data: swedenStats.reverse()
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

getTotalDeathCases();

var ctx3 = document.getElementById('myChart3');

const getTotalTests = async() => {
    const data = await getHistoryCountry('usa');
    const data2 = await getHistoryCountry('russia');
    const data3 = await getHistoryCountry('italy');
    const data4 = await getHistoryCountry('germany');
    const data5 = await getHistoryCountry('sweden');

    const usaStats = [], russiaStats = [], italyStats = [], germanyStats = [], swedenStats = [];


    usaStats.push(data[0].tests.total);
    russiaStats.push(data2[0].tests.total);
    italyStats.push(data3[0].tests.total);
    germanyStats.push(data4[0].tests.total);
    swedenStats.push(data5[0].tests.total);

    
    const chart = new Chart(ctx4, {
        type: 'bar',
        backgroundColor: 'black',
        data: {
            labels: ['USA', 'Russia', 'Italy', 'Germany', 'Sweden'],
            datasets: [{
                label: 'Tests',
                data: [usaStats[0], russiaStats[0], italyStats[0], germanyStats[0], swedenStats[0]],
                backgroundColor: ['red', 'white', 'yellowgreen', 'orange', 'yellow']
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

getTotalTests();

var ctx4 = document.getElementById('myChart4');
