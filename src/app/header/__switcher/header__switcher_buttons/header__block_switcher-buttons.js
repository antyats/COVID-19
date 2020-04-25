import { doBackgroundUsual } from '../../../common_blocks/scripts/backgroundOpacityChange';

// Устанавливает тему, в окне, передающемся в аргументе, которая будет появляться 1-ой 
const setDefultThemeButtons = (modal) => {
    const btn_light = document.querySelector('.button__form-light'),
          btn_dark = document.querySelector('.button__form-dark');
    // Устанавливает тему в LocalStorage через строку, данную в аргументе
    const setThemeToMemory = (theme) => {
        localStorage.setItem('theme', theme);
        // Удаляет окно настройки темы
        modal.remove();
        // Удаляет засветление других div
        doBackgroundUsual();
        // Меняет тему на выбранную, как дефотную
        document.documentElement.setAttribute('data-theme', theme);
    }

    btn_light.addEventListener('click', () => setThemeToMemory('light'));
    btn_dark.addEventListener('click', () => setThemeToMemory('dark'));

}

export default setDefultThemeButtons;