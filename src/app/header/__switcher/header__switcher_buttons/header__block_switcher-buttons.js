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
        let background = theme === 'light' ? '#eaeaea' : '#222831';
        const tl = gsap.timeline();
        tl
        .to('body', { duration: 1, backgroundColor: `${background}`, opacity: 0 })
        .to('html', { duration: .1, attr: { 'data-theme': `${theme}` }})
        .to('body', { duration: .5, opacity: 1 })
    }

    btn_light.addEventListener('click', () => setThemeToMemory('light'));
    btn_dark.addEventListener('click', () => setThemeToMemory('dark'));

}

export default setDefultThemeButtons;