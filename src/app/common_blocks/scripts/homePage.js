const toHomePage = () => {
    document.querySelector('.title').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.country').style.display = 'none';
        document.querySelector('.main').style.display = 'flex';
    })
}