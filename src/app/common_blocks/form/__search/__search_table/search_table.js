// Отбирает фильтром страны, в названии которых содержатся введенные буквы
const sortTable = () => {
    const search = document.querySelector('.search__table');
    search.addEventListener('input', function(e) {
        // Делает первую букву большой
        const inputValue = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        // При удалении буквы восстанавливает таблицу
        [...document.querySelectorAll('.main__table_body-row')].forEach(item => item.style.display = 'table-row');
        // Удаляет все страны в которых нет введеных букв
        const searchData = [...document.querySelectorAll('.main__table_body-row')].filter(item => !item.className.includes(inputValue));
        searchData.forEach(item => item.style.display = 'none');
    })
}

sortTable();