// FUNCTIONS
import { getCountriesName } from "../../scripts/fetchData";

const getListOfCountriesName = (input) => {
    // Создает несортированный список в который будут помещаться название стран
    const listOfCountries = document.createElement('ul');
    listOfCountries.classList.add('form__search_dropdown_block');
    // При вводе, начиная со 2-го символа, добавляет ссылки на страны в несортированный список
    input.addEventListener('input', async function() {
        if (input.value.length >= 2) {
            // Каждое изменение поиска очищает несортированный список
            listOfCountries.innerHTML = '';
            // Запрашивает список из названий стран, включающие набранные символы
            const data = await getCountriesName(input.value);
            // Проходит циклом по списку названий стран 
            data.forEach(country => {
                // Создает ссылку на каждую страну и добавляет в очищенный несортированный список
                const countryListItem = document.createElement('a');
                countryListItem.href = country;
                countryListItem.innerHTML = `<li class="form__search_dropdown_block-item">${country}</li>`
                listOfCountries.append(countryListItem);
            })
            document.querySelector('.form__search').append(listOfCountries);
        }
    })

}

export default getListOfCountriesName