(() => {
  // Меню
  function setBurger(params) {
    const btn = document.querySelector(`.${params.btnClass}`);
    const menu = document.querySelector(`.${params.menuClass}`);

    btn.setAttribute('aria-expanded', false);

    menu.addEventListener("animationend", function () {
      if (this.classList.contains(params.hiddenClass)) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
      }
    });

    btn.addEventListener("click", function () {
      this.classList.toggle(params.activeClass);

      if (
        !menu.classList.contains(params.activeClass) &&
        !menu.classList.contains(params.hiddenClass)
      ) {
        menu.classList.add(params.activeClass);
        document.body.style.overflow = 'hidden';
        btn.setAttribute('aria-expanded', true);
      } else {
        menu.classList.add(params.hiddenClass);
        document.body.removeAttribute('style');
        btn.setAttribute('aria-expanded', false);
      }
    });
  }

  // Слайдеры
  function setSliders() {
    const sliderParams = {
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
          spaceBetween: 42
        },

        1200: {
          slidesPerView: 3,
          slidesPerGroup: 3,
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

    const heroSlider = new Swiper('.js-hero-swiper', {
      allowTouchMove: false,
      loop: true,
      effect: 'fade',
      speed: 10000,
      autoplay: {
        delay: 10000
      }
    });

    const gallerySlider = new Swiper(".slides-container", sliderParams);

    sliderParams.pagination = {
      el: ".events .events-swiper__pagination",
      type: 'bullets',
    }

    sliderParams.navigation = {
      nextEl: ".events-swiper__next",
      prevEl: ".events-swiper__prev",
    }

    sliderParams.breakpoints = {
      441: {
        slidesPerView: 2,
        spaceBetween: 34,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 27
      },
      1200: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      },
    }

    const eventsSlider = new Swiper(".event-swiper", sliderParams);

    delete sliderParams.pagination;

    sliderParams.navigation = {
      nextEl: ".partner-swiper__next",
      prevEl: ".partner-swiper__prev",
    }

    sliderParams.breakpoints = {
      441: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50
      },
    }

    const partnerSlider = new Swiper(".partner-swiper", sliderParams);
  }

  function setSearch(params) {
    const openBtn = document.querySelector(`.${params.openBtnClass}`);
    const search = document.querySelector(`.${params.searchClass}`);
    const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

    search.addEventListener("animationend", function (evt) {
      if (this._isOpened) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
        this._isOpened = false;
      } else {
        this._isOpened = true;
      }
    });

    search.addEventListener('click', function(evt) {
      evt._isSearch = true;
    });

    openBtn.addEventListener("click", function (evt) {
      this.disabled = true;
      this.classList.add(params.activeOpenBtnClass);

      if (
        !search.classList.contains(params.activeClass) &&
        !search.classList.contains(params.hiddenClass)
      ) {
        search.classList.add(params.activeClass);
      }
    });

    closeBtn.addEventListener('click', function () {
      openBtn.disabled = false;
      openBtn.classList.remove(params.activeOpenBtnClass);
      search.classList.remove(params.activeClass);
      search.classList.add(params.hiddenClass);
    });

    document.body.addEventListener('click', function (evt) {
      if (!evt._isSearch && search._isOpened) {
        openBtn.disabled = false;
        search.classList.remove(params.activeClass);
        search.classList.add(params.hiddenClass);
      }
    });
  }

  // выпадающий список
  const params = {
    btnClassName: "js-header-dropdown-btn",
    dropClassName: "js-header-drop",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  }

  function onDisable(e) {
    if (e.target.classList.contains(params.disabledClassName)) {
      e.target.classList.remove(params.disabledClassName, params.activeClassName);
      e.target.removeEventListener("animationend", onDisable);
    }
  }

  function setMenuListener() {
    document.body.addEventListener("click", (e) => {
      const activeElements = document.querySelectorAll(`.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`);

      if (activeElements.length && !e.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (e.target.closest(`.${params.btnClassName}`)) {
        const btn = e.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`.${params.dropClassName}[data-target="${path}"]`);

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  }

  // Валидация формы
  function setValidation() {
    const phone = document.querySelector("input[type='tel']");
    const im = new Inputmask("+7(999) 999-99-99")

    const validation = new JustValidate(".contact-form", {
      focusInvalidField: true,
      errorFieldCssClass: 'is-invalid',
      errorLabelStyle: {
        position: "absolute",
        top: "-22px",
        left: "23px",
        fontSize: '12px',
        color: '#D11616',
      },
      successFieldCssClass: 'is-valid',
      lockForm: true,
    });

    im.mask(phone);

    validation
      .addField('#name', [
        {
          rule: 'required',
          errorMessage: 'Введите имя',
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
          errorMessage: 'Введите телефон',
        },
        {
          validator: (value) => {
            const tel = phone.inputmask.unmaskedvalue();
            return !!(Number(tel) && tel.length === 10);
          },
          errorMessage: 'Телефон слишком короткий',
        }
      ])
      .onSuccess((ev) => {
        ev?.preventDefault();
      });;
  }

  // Яндекс карта
  function setMap() {
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
  }

  new Accordion(".js-accordion-container", {
    openOnInit: [0]
  });

  tippy('.js-tooltip', {
    theme: 'blanchard',
    maxWidth: 264,
  });

  setSliders();
  setBurger({
    btnClass: "burger", // класс бургера
    menuClass: "header-menu__wrap", // класс меню
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
  });
  setSearch({
    openBtnClass: "js-open-search", // класс кнопки открытия
    activeOpenBtnClass: "search-opened", // класс кнопки при открытой форме
    closeBtnClass: "js-close", // класс кнопки закрытия
    searchClass: "js-form", // класс формы поиска
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
  });
  setMenuListener();
  setValidation();
  setMap();

  const selectGalery = document.querySelector(".galery__filter");
  const galeryFilter = new Choices(selectGalery, {
    searchEnabled: false,
    position: 'center',
    shouldSort: false,
  });
})();
