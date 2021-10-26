const $form = $('.login')

$form.on('click', ()=>{
    const $f = $('.navbar__form')
    $f.toggleClass('visible')
})

const swiper = new Swiper('.main__info_swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
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
        val.innerHTML =  (key + 1);
    }
})
  

const $navbar__form_section = $('.navbar__form_section');
const $navbar__form_field = $('.navbar__form_field');
$('.navbar__form_register').hide();

$navbar__form_section.on('click', function(evt){
    evt.preventDefault();

    $navbar__form_field.hide();
    $('.navbar__form_section_current').removeClass('navbar__form_section_current');
    $(this).addClass('navbar__form_section_current');
    $(`.${$(this).data('field')}`).show();

})

