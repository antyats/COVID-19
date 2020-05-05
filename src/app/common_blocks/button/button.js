const btnUp = document.querySelector('.btn-up'),
      btnUpCountry = document.querySelector('.btn-up-country');

window.addEventListener('scroll', function() {

    if (document.documentElement.scrollTop > 300) {
        btnUpCountry.style.display = 'block';
    } else {
        btnUpCountry.style.display = 'none';
    }

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

btnUpCountry.addEventListener('click', function(e) {
    const tl = gsap.timeline();
    tl.to(window, { duration: 1, scrollTo: '#header' })
})