window.addEventListener("DOMContentLoaded", function() {
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
  const gallerySlider = new Swiper(".slides-container", {
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

    a11y: false,
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

    // on: {
    //   /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
    //   beforeResize: function () {
    //     this.slides.forEach((el) => {
    //       el.style.marginTop = "";
    //     });
    //   }
    // }
  });

  // events
  const eventsSlider = new Swiper(".event-swiper", {
    pagination: {
      el: ".events-pagination",
      type: 'bullets',
    },
    navigation: {
      nextEl: ".events-swiper__next",
      prevEl: ".events-swiper__prev",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
      },
      // when window width is >= 480px
      576: {
        slidesPerView: 2,
        spaceBetween: 34
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 3,
        spaceBetween: 27
      },
      1200: {
        slidesPerView: 3,
        spaceBetween:50
      }
    }
  });

  // Project
  const partnerSlider = new Swiper(".partner-swiper", {
    navigation: {
      nextEl: ".partner-swiper__next",
      prevEl: ".partner-swiper__prev",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
      },
      // when window width is >= 480px
      576: {
        slidesPerView: 2,
        spaceBetween: 34
      },
      // when window width is >= 992px
      992: {
        slidesPerView: 2,
        spaceBetween: 50
      },
      1200: {
        slidesPerView: 3,
        spaceBetween:50
      }
    }
  });

  // Фильтер галереи
  const selectGalery = document.querySelector(".galery__filter");
  const galeryFilter = new Choices(selectGalery, {
    searchEnabled: false,
    position: 'center',
    shouldSort: false,
  });

  // Accordion
  $(".catalog-accordion").accordion({
    heightStyle: "content",
    icons: false,
  });

  // Tooltips
  tippy('.js-tooltip', {
    theme: 'blanchard',
    maxWidth: 264,
  });
})
