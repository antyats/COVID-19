const btnUp = document.querySelector('.btn-up');

window.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop > 500) {
        btnUp.style.display = 'block';
    } else {
        btnUp.style.display = 'none';
    }
})


btnUp.addEventListener('click', function(e) {
    const tl = gsap.timeline();
    tl.to(window, { duration: 1, scrollTo: '#header' })
})