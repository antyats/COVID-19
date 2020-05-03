// FUNCTIONS
import { getStatisticData } from "../../../common_blocks/scripts/fetchData";

// Создает таблицу из всех возможных стран и их данных
const setMainTable = async() => {
    const data = await new getStatisticData;
    const sortedData = await data.byTotalAll();
    sortedData.map(item => {
        const dataRow = document.createElement('tr');
        dataRow.classList.add('main__table_body-row', `${item.country}`);
        dataRow.innerHTML = `
            <td>${item.country}</td>
            <td>${item.cases.total && item.cases.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
            <td>${item.cases.new && item.cases.new.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
            <td>${item.cases.active && item.cases.active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
            <td>${item.cases.critical && item.cases.critical.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
            <td>${item.deaths.new && item.deaths.new.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
            <td>${item.deaths.total && item.deaths.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
            <td>${item.tests.total && item.tests.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
        `;
        document.querySelector('.main__table_body').appendChild(dataRow);
    })
}

// При скролле после шапки таблицы делает ее фиксированной
const fixHeadTable = () => {
    window.addEventListener('scroll', function() {
        if (document.querySelector('.main__table_head-row').getBoundingClientRect().top < 0) {
            document.querySelector('.main__table_head-row').classList.add('fixed_table');
        } else if (document.querySelector('.main__table_body').getBoundingClientRect().top > 0) {
            document.querySelector('.main__table_head-row').classList.remove('fixed_table');
        }
    }) 
}

setMainTable();
fixHeadTable();