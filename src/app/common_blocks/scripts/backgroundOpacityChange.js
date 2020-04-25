const doBackgroundLighter = (block) => {
    document.querySelectorAll('div').forEach(item => item.style.opacity = '0.5');
    block.style.opacity = '1';
}

const doBackgroundUsual = () => {
    document.querySelectorAll('div').forEach(item => item.style.opacity = '1');
}

export {doBackgroundLighter, doBackgroundUsual};