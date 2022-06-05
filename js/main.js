window.addEventListener("DOMContentLoaded", function() {
  const sliderParametr = {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".galery .galery-swiper__pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".galery-swiper__next",
      prevEl: ".galery-swiper__prev"
    },
    autoHeight: true,
    breakpoints: {
      441: {
        slidesPerView: 2,
        spaceBetween: 30
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  }
  // формы поиcка
  document.querySelector(".search__btn--open").addEventListener("click", function() {
    document.querySelector(".search__form").classList.add("search__form--active");
    this.classList.add("active");
  });

  document.addEventListener("click", function(e) {
    let target = e.target;
    let form = document.querySelector(".search__form");
    // if (target.closest("button")) {
    //   console.log('target: ', target.closest("input"));
    //   e.preventDefault();
    // }
    if (!target.closest(".header__search") || target.closest(".search__close")) {
    form.classList.remove("search__form--active");
      form.querySelector("input").value = "";
      document.querySelector(".search__btn--open").classList.remove("active");
    }
    if (!target.closest(".header-artists__list")) {
      document.querySelectorAll(".dropdown").forEach(el => {
          el.classList.remove("active-dropdown");
      });
      document.querySelectorAll(".header-artists__btn").forEach(el => {
          el.classList.remove("dropdown__btn--active");
      });
    }
    if(target.closest(".header-main__item")) {
      document.querySelector(".header-main__nav").classList.remove("header-main__nav--active");
      document.body.classList.remove("no-scroll");
    }
  });

  // выпадающий список
  document.querySelectorAll(".header-artists__btn").forEach(item => {
    item.addEventListener("click", function() {
      let btn = this;
      let dropdown = this.parentElement.querySelector(".dropdown");

      document.querySelectorAll(".header-artists__btn").forEach(el => {
        if (el != btn) {
          el.classList.remove("dropdown__btn--active");
        }
      });

      document.querySelectorAll(".dropdown").forEach(el => {
        if (el != dropdown) {
          el.classList.remove("active-dropdown");
        }
      });

      dropdown.classList.toggle("active-dropdown");
      btn.classList.toggle("dropdown__btn--active")
    });
  });

  // мобтльное меню
  document.querySelector(".burger").addEventListener("click", function() {
    document.querySelector(".header-main__nav").classList.add("header-main__nav--active");
    document.body.classList.add("no-scroll");
  });

  // Слайдер
  // hero
  const heroSlider = new Swiper(".swiper", {
    autoplay: {
      delay: 6000,
    },
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
  });

  // galery
  const gallerySlider = new Swiper(".slides-container", sliderParametr);

  sliderParametr.pagination = {
    el: ".events .events-swiper__pagination",
    type: 'bullets',
  }

  sliderParametr.navigation = {
    nextEl: ".events-swiper__next",
    prevEl: ".events-swiper__prev",
  }
  // events
  const eventsSlider = new Swiper(".event-swiper", sliderParametr);

  delete sliderParametr.pagination;

  sliderParametr.navigation = {
    nextEl: ".partner-swiper__next",
    prevEl: ".partner-swiper__prev",
  }

  // Project
  const partnerSlider = new Swiper(".partner-swiper", sliderParametr);

  // Фильтер галереи
  const selectGalery = document.querySelector(".galery__filter");
  const galeryFilter = new Choices(selectGalery, {
    searchEnabled: false,
    position: 'center',
    shouldSort: false,
  });

  // Accordion
  new Accordion(".js-accordion-container", {
    openOnInit: [0]
  });

  // Tooltips
  tippy('.js-tooltip', {
    theme: 'blanchard',
    maxWidth: 264,
  });

  // Добавление яндекс карты
  ymaps.ready(init);
  function init(){
    const myMap = new ymaps.Map("map", {
        center: [55.758468,37.601088],
        zoom: 14,
        controls: ['geolocationControl', 'zoomControl']
        },
        {
          suppressMapOpenBlock: true,
          geolocationControlSize: "large",
          geolocationControlPosition:  { top: "340px", right: "20px" },
          geolocationControlFloat: 'none',
          zoomControlSize: "small",
          zoomControlFloat: "none",
          zoomControlPosition: { top: "265px", right: "20px" }
        },
    );

    const myGeoObject = new ymaps.GeoObject();

    myMap.geoObjects.add(myGeoObject);
    var myPlacemark = new ymaps.Placemark([55.758468,37.601088], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'img/icons/map-icon.svg',
        iconImageSize: [20, 20],
    });

    myMap.geoObjects.add(myPlacemark);

    myMap.behaviors.disable('scrollZoom');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        myMap.behaviors.disable('drag');
    }
  }

  const phone = document.querySelector("input[type='tel']");
  const im = new Inputmask("+7(999) 999-99-99")

  const validation = new JustValidate(".contact-form", {
    focusInvalidField: true,
    errorFieldCssClass: 'is-invalid',
    lockForm: true,
    tooltip: {
      position: 'top',
    },
  });

  im.mask(phone);

  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Вы не ввели имя',
      },
      {
        rule: "string",
        validator: (value) => {
          return /^[a-zа-яё\s]*$/gi.test(value);
        },
        errorMessage: 'Не допустимый формат',
      }
    ])
    .addField('#phone', [
      {
        rule: 'required',
        errorMessage: 'Вы не ввели телефон',
      },
      {
        validator: (value) => {
          const tel = phone.inputmask.unmaskedvalue();
          return !!(Number(tel) && tel.length === 10);
        },
        errorMessage: 'Телефон слишком короткий',
      }
    ]);
})
