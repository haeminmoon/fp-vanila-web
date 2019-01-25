const nav = document.querySelectorAll('.nav_gnb > li');

for (let i = 0; i < nav.length; i++) {
    nav[i].addEventListener('click', function (e) {
        nav[i].classList.remove("nav_on");
        e.target.classList.add("nav_on");
    });
}