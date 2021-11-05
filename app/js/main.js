const $form = $('.login')

$form.on('click', () => {
    const $f = $('.navbar__form')
    $f.toggleClass('visible')
})

const swiper = new Swiper('.main__info_swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 700,

    // If we need pagination
    pagination: {
        el: '.main__info_slides',
        bulletElement: 'p',
        clickable: "true"
    },

    // Navigation arrows
    navigation: {
        nextEl: '.main__info_button_right',
        prevEl: '.main__info_button_left',
    }
});

const $pag_bullets = $('.swiper-pagination-bullet');

$.each($pag_bullets, (key, val) => {
    if (key < 10) {
        val.innerHTML = '0' + (key + 1);
    } else {
        val.innerHTML = (key + 1);
    }
})


const $navbar__form_section = $('.navbar__form_section'),
    $navbar__form_field = $('.navbar__form_field'),
    $waiting_lists = $('.body__study').find('.list');
$('.navbar__form_register').hide();

$navbar__form_section.on('click', function (evt) {
    evt.preventDefault();

    $navbar__form_field.hide();
    $('.navbar__form_section_current').removeClass('navbar__form_section_current');
    $(this).addClass('navbar__form_section_current');
    $(`.${$(this).data('field')}`).show();

})

$waiting_lists.on('click', function (evt) {
    evt.preventDefault();
    if (!$(this).closest('.wrapper').find('.body__form2').length) {
        const $waiting_list = $(this);
        $body__form2 = $('.body__form2').clone();

        $(this).closest('.wrapper').append($body__form2);
        $body__form2.addClass('open');

        $body__form2.find('input').on('input', function () {
            validation($(this));
        });

        $(document).on('click', docClickHandler);

        function docClickHandler(evt) {
            evt.preventDefault();

            if (!$body__form2.find(evt.target).length && !(evt.target == $waiting_list[0] || $waiting_list.find(evt.target).length)) {
                $body__form2.remove();
                $('document').off('click', docClickHandler);
            }
        }
    }
})

$('.navbar__form_elem').find('input').on('input', function () {
    validation($(this));
});


function validation($input) {
    const name_attr = $input.attr("name");

    $input.closest('.navbar__form_elem').next('.navbar__form_dropdown').remove();
    $input.next('img').remove();
    $input.removeClass('error');

    switch (name_attr) {
        case "name": {
            if ($input.val() == "") {
                appendDropdown($input, 'Извините, но это поле обязательно к заполнению');
                return false;
            }

            if ($input.val().match(/[A-Za-z0-9]+/)) {
                appendDropdown($input, 'Пожалуйста, введите корректное имя');
                return false;
            }

            $('<img src="svg/true.svg" alt="OK">').insertAfter($input);
            return true;
        }
        case "surname": {
            if ($input.val() == "") {
                appendDropdown($input, 'Извините, но это поле обязательно к заполнению');
                return false;
            }

            if ($input.val().match(/[A-Za-z0-9]+/)) {
                appendDropdown($input, 'Пожалуйста, введите корректную фамилию');
                return false;
            }

            $('<img src="svg/true.svg" alt="OK">').insertAfter($input);
            return true;
        }
        case "patronymic": {
            if ($input.val() == "") {
                appendDropdown($input, 'Извините, но это поле обязательно к заполнению');
                return false;
            }

            if ($input.val().match(/[A-Za-z0-9]+/)) {
                appendDropdown($input, 'Пожалуйста, введите корректное отчество');
                return false;
            }

            $('<img src="svg/true.svg" alt="OK">').insertAfter($input);
            return true;
        }
        case "email": {
            if ($input.val() == "") {
                appendDropdown($input, 'Извините, но это поле обязательно к заполнению');
                return false;
            }

            if (!$input.val().match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
                appendDropdown($input, 'Пожалуйста, введите корректную почту');
                return false;
            }

            $('<img src="svg/true.svg" alt="OK">').insertAfter($input);
            return true;
        }
        case "tel": {
            if ($input.val() == "") {
                appendDropdown($input, 'Извините, но это поле обязательно к заполнению');
                return false;
            }

            if (!$input.val().match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/)) {
                appendDropdown($input, 'Пожалуйста, введите корректный номер');
                return false;
            }

            $('<img src="svg/true.svg" alt="OK">').insertAfter($input);
            return true;
        }
        case "login": {
            if ($input.val() == "") {
                appendDropdown($input, 'Извините, но это поле обязательно к заполнению');
                return false;
            }

            if (!$input.val().match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/) && !$input.val().match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)) {
                appendDropdown($input, 'Пожалуйста, введите корректный номер или почту');
                return false;
            }

            $('<img src="svg/true.svg" alt="OK">').insertAfter($input);
            return true;
        }
    }

    function appendDropdown($input, text) {
        const $dropdown = $(' <div class="navbar__form_dropdown"> <p>Извините, но это поле обязательно к заполнению</p> <div class="drop"></div></div>'),
            $text = $dropdown.find('p');

        $text.html(text);
        $('<img src="svg/false.svg" alt="ERR">').insertAfter($input);
        $input.addClass('error');
        $dropdown.insertAfter($input.closest('.navbar__form_elem'));
    }
}

const bm = document.querySelector('.body__menu')

console.log(bm.childNodes)

bm.childNodes[1].addEventListener('click', () => {
    bm.childNodes[1].classList.add("current")
    bm.childNodes[3].classList.remove("current")
    bm.childNodes[5].classList.remove("current")
})

bm.childNodes[3].addEventListener('click', () => {
    bm.childNodes[1].classList.remove("current")
    bm.childNodes[3].classList.add("current")
    bm.childNodes[5].classList.remove("current")
})

bm.childNodes[5].addEventListener('click', () => {
    bm.childNodes[1].classList.remove("current")
    bm.childNodes[3].classList.remove("current")
    bm.childNodes[5].classList.add("current")
})
