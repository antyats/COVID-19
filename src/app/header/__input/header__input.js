import { doBackgroundUsual } from "../../common_blocks/scripts/backgroundOpacityChange";
import getListOfCountries from "../../common_blocks/form/__search/form__search";

const openSearchForm = (selector) => {
    const inputSearch = document.querySelector(`.${selector}`);
    inputSearch.addEventListener('click', function(e) {
        e.stopPropagation();
        const searchForm = document.createElement('div');
        searchForm.classList.add('form');
        searchForm.innerHTML = `
            <div class="form__search">
                <input type="text" class="form__search_input" />
            </div>
        `;

        document.querySelectorAll('div').forEach(item => item.style.opacity = '0.5');
        searchForm.style.opacity = '1';
        document.body.append(searchForm);
        document.querySelector('.form__search_input').focus();

        getListOfCountries(document.querySelector('.form__search_input'));
        
        window.addEventListener('click', function(e) {
            if (!e.target.classList.contains('form') && !e.target.classList.contains('form__search_input')) {
                doBackgroundUsual();
                searchForm.remove();
            }
        })
    })

}

openSearchForm('header__input');