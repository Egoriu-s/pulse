const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    close = menu.querySelector('.menu__close'),
    overlay = menu.querySelector('.menu__close')

hamburger.addEventListener('click', () => {
    menu.classList.add('active')
})

close.addEventListener('click', () => {
    menu.classList.remove('active')
})
overlay.addEventListener('click', () => {
    menu.classList.remove('active')
})

const counters = document.querySelectorAll('.skills__progress-counter'),
    lines = document.querySelectorAll('.skills__progress-line span')

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML
})