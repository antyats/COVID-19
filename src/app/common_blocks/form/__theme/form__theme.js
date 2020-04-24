// FUNCTIONS
import setDefultThemeButtons from '../../../header/__switcher/header__switcher_buttons/header__block_switcher-buttons';

// При 1-ом открытии проверяет наличии дефолтной темы в LocalStorage,
// если не находит, то создает окно выбора темы и запускает функцию установки дефолтной темы.
// И запускает установку дефолтной темы, если в параметр функции передано истиное значение change.
const setThemeForm = (change=false) => {
    // В LocalStorage отстутсвует дефолтная тема
    if (!localStorage.getItem('theme') || change) {
        const form_block = document.createElement('div');
        form_block.innerHTML = `
            <div class="form">
                <div class="form form__theme">
                    <div class="form__theme_light">
                        <div class="form__theme_colors-pallet form__theme_colors-pallet-light">
                            <span class="form__theme_colors-pallet-light-row form__theme_colors-pallet-light-row-1">YELLOW</span>
                            <span class="form__theme_colors-pallet-light-row form__theme_colors-pallet-light-row-2">RED</span>
                            <span class="form__theme_colors-pallet-light-row form__theme_colors-pallet-light-row-3">BLUE</span>
                        </div>
                        <button class="button button__form button__form-light">LIGHT</button>
                    </div>
                    <div class="form__theme_dark">
                        <div class="form__theme_colors-pallet form__theme_colors-pallet-dark">
                            <span class="form__theme_colors-pallet-dark-row form__theme_colors-pallet-dark-row-1">YELLOW</span>
                            <span class="form__theme_colors-pallet-dark-row form__theme_colors-pallet-dark-row-2">RED</span>
                            <span class="form__theme_colors-pallet-dark-row form__theme_colors-pallet-dark-row-3">BLUE</span>
                        </div>
                        <button class="button button__form button__form-dark">DARK</button>
                    </div>
                </div>
            </div>
        `
        document.body.append(form_block);
        // Установление дефолтной темы через кнопки
        setDefultThemeButtons(form_block);
    }
}

setThemeForm();

export default setThemeForm;