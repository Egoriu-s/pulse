$(document).ready(function () {

    $('.slider__inner').slick({
        speed: 400,
        //adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 575,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    })
    // const catalog_content_arr = document.querySelectorAll('.catalog__content')
    // const tabs = document.querySelectorAll('.catalog__tab')
    // const catalog_item_arr = document.querySelectorAll('.catalog-item')
    // let catalog_item_arr_subtitle = []

    // catalog_item_arr.forEach((item, index) => {
    //     catalog_item_arr_subtitle[index] = catalog_item_arr[index].querySelector('.catalog-item__subtitle').innerText
    // })


    // tabs.forEach((tab, index) => {
    //     tab.addEventListener('click', (ev) => {
    //         for (let i = 0; i < tabs.length; i++) {
    //             tabs[i].classList.remove("catalog__tab_active")
    //             //catalog_content_arr[i].remove("catalog__content_active")
    //         }
    //         console.log("Hello")
    //         catalog_content_arr[index].classList.add("catalog__content_active")
    //         for (let i = 0; i < catalog_content_arr.length; i++) {
    //             if (i !== index) {
    //                 //debugger
    //                 catalog_content_arr[i].classList.remove("catalog__content_active")
    //             }
    //         }
    //         tab.classList.add("catalog__tab_active")

    //     })
    // })
    // catalog_item_arr.forEach(item => {
    //     const catalog_item_content = item.querySelector('.catalog-item__content')
    //     const catalog_item_click = catalog_item_content.querySelector('.catalog-item__link')
    //     const catalog_item_list = item.querySelector('.catalog-item__list')
    //     const catalog_item_back = catalog_item_list.querySelector('.catalog-item__back')
    //     catalog_item_click.addEventListener('click', (ev) => {
    //         ev.preventDefault()
    //         catalog_item_content.classList.remove('catalog-item__content_active')
    //         catalog_item_list.classList.add('catalog-item__list_active')
    //     })
    //     catalog_item_back.addEventListener('click', (ev) => {

    //         ev.preventDefault()
    //         catalog_item_list.classList.remove('catalog-item__list_active')
    //         catalog_item_content.classList.add('catalog-item__content_active')
    //     })

    // })

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_catalog').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    // const buttons = document.querySelectorAll('.button')
    // const overlay = document.querySelector('.overlay')
    // const consultation = document.querySelector('#consultation')
    // const order = document.querySelector('#order')
    // const thanks = document.querySelector('#thanks')
    // const closeModals = document.querySelectorAll('.modal__close')
    // const buttons_catalog = document.querySelectorAll('.button_catalog')

    // buttons.forEach((button) => {
    //     button.addEventListener('click', (ev) => {
    //         debugger
    //         ev.preventDefault()
    //         if (button.getAttribute("data-modal") === "consultation") {
    //             overlay.classList.remove('overlay_hidden')
    //             consultation.classList.remove('modal_hidden')
    //         }
    //     })
    // })

    // buttons_catalog.forEach((button, index) => {
    //     button.addEventListener('click', (ev) => {
    //         ev.preventDefault()
    //         order.querySelector('.modal__descr').innerText = catalog_item_arr_subtitle[index]
    //         overlay.classList.remove('overlay_hidden')
    //         order.classList.remove('modal_hidden')
    //     })
    // })

    // closeModals.forEach(closeModal => {
    //     closeModal.addEventListener('click', (ev) => {
    //         ev.preventDefault()
    //         thanks.classList.add('modal_hidden')
    //         overlay.classList.add('overlay_hidden')
    //     })
    // })

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    //validateForms('#main-form');
    validateForms('#consultation form');
    validateForms('#order form');


    $('input[name=phone]').mask("+7 (999) 999-99-99")


    $('form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("")
            $('#consultation, #order').fadeOut()
            $('.overlay, #thanks').fadeIn('slow')

            $('form').trigger('reset');
        });
        return false
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn()
        } else {
            $('.pageup').fadeOut()
        }
    })

    $('a[href^="#up"]').click(function () {
        let _href = $(this).attr('href')
        $('html, body').animate({ scrollTop: $(_href).offset().top + "px" }, 800)
        return false
    })

    new WOW().init()
});

