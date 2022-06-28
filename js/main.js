(() => {
  const MOBILE_WIDTH = 768;

  new Accordion(".js-accordion-container", {
    openOnInit: [0]
  });

  tippy('.js-tooltip', {
    theme: 'blanchard',
    maxWidth: 264,
    duration: [400, 400],
  });

  // Получение ширины экрана для плавного мобильного скролла
  function getWindowWidth () {
	  return Math.max(
	    document.body.scrollWidth,
	    document.documentElement.scrollWidth,
	    document.body.offsetWidth,
	    document.documentElement.offsetWidth,
	    document.body.clientWidth,
	    document.documentElement.clientWidth
	  );
	}

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

    menu.addEventListener('click', function(evt) {
      const target = evt.target;

      if (target.closest(`.${params.menuLink}`)) {
        btn.classList.toggle(params.activeClass);
        this.classList.add(params.hiddenClass);
        document.body.removeAttribute('style');
        btn.setAttribute('aria-expanded', false);
      }
    })

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

  // Плавный скролл
  function setScroll(linkClass) {
    document.querySelectorAll(linkClass).forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();

        const href = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        const elementPosition = scrollTarget.getBoundingClientRect().top;

        window.scrollBy({
            top: elementPosition,
            behavior: 'smooth'
        });
      });
    });
  }

  // Плавный скролл только для мобильных
  function scrollToPainter (targetId, isMobile) {
		if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
			return;
		}

	  const scrollTarget = document.getElementById(targetId);
	  const elementPosition = scrollTarget.getBoundingClientRect().top;

	  window.scrollBy({
	      top: elementPosition,
	      behavior: 'smooth'
	  });
	}

  // Слайдеры (настройка параметров внутри функции)
  function setSliders() {
    const heroSliderParams = {
      allowTouchMove: false,
      loop: true,
      effect: 'fade',
      speed: 10000,
      autoplay: {
        delay: 10000
      }
    }
    const startSliderParams = {
      slidesPerView: 1,
      grid: {
        rows: 1,
        fill: "row"
      },
      spaceBetween: 20,
      autoHeight: true,
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
    const galerySliderParams = {
      ...startSliderParams,
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
          slidesPerGroup: 2,
          spaceBetween: 37
        },
        1200: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50
        }
      },
    }
    const eventsSliderParams = {
      ...startSliderParams,
      pagination: {
        el: ".events .events-slider__pagination",
        type: 'bullets',
        clickable: true,
      },
      navigation: {
        nextEl: ".events-slider__next",
        prevEl: ".events-slider__prev",
      },
      autoHeight: false,
      breakpoints: {
        576: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 34,
        },
        992: {
          slidesPerView: 3,
          slidesPerGroup: 1,
          spaceBetween: 27
        },
        1200: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 50
        },
      },
      on: {
        init: function () {
          this.slides.forEach((slide) => slide.tabIndex = "-1");
        },
        slideChange: function () {
          this.slides.forEach((slide) => {
            if (!slide.classList.contains("slide-visible")) {
              slide.children[0].children[1].lastElementChild.tabIndex = "-1";
            } else {
              slide.children[0].children[1].lastElementChild.tabIndex = "";
            }
          });
        }
      }
    }
    const partnerSliderParams = {
      ...startSliderParams,
      navigation: {
        nextEl: ".partner-slider__next",
        prevEl: ".partner-slider__prev",
      },
      breakpoints: {
        633: {
          slidesPerView: 2,
          spaceBetween: 35,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 50,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 50
        },
      },
    }

    const heroSlider = new Swiper('.js-hero-swiper', heroSliderParams);
    const gallerySlider = new Swiper(".galery-swiper__container", galerySliderParams);
    const eventsSlider = new Swiper(".event-swiper", eventsSliderParams);
    const partnerSlider = new Swiper(".partner-swiper", partnerSliderParams);
  }

  // Поиск
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

  // Выпадающий список
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
        const menuHeight = btn.parentElement.offsetParent.clientHeight;

        drop.style.transform = `translate(${btn.parentElement.offsetLeft}px, 100%)`;
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

  // Аккордион
  function setCustomSelect(selectLink) {
    const selectGalery = document.querySelector(`.${selectLink}`);
    const galeryFilter = new Choices(selectGalery, {
      searchEnabled: false,
      position: 'center',
      shouldSort: false,
    });
  }

  // Переключение художников
  function setPainter(params) {
    const painterBtnList = document.querySelector(`.${params.btnListClass}`);
    const painterArticles = document.querySelectorAll(`.${params.painterArticleClass}`);

    painterBtnList.addEventListener('click', function (evt) {
      evt.preventDefault();
      const target = evt.target;
      const currentLink = target.closest(`.${params.painterLinkClass}`);
      const currentPainter = currentLink?.dataset.painterBtn || '';

      if (!currentPainter) return;

      if(!currentLink.classList.contains(params.tabActiveClass)) {
        const currentTab = target.closest(`.${params.innerListClass}`);
        const links = currentTab.querySelectorAll(`.${params.painterLinkClass}`);
        links.forEach(link => link.classList.remove(params.tabActiveClass));

        currentLink.classList.add(params.tabActiveClass);
      }
      painterArticles.forEach((el) => {
        if (el.classList.contains(params.activePainter)) {
          el.classList.remove(params.activePainter);
        }
        if (el.dataset.target === currentPainter) {
          el.classList.add(params.activePainter);
        }
      });

      scrollToPainter("painter-article", true);
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
      });
  }

  // Яндекс карта
  function setMap() {
    // Добавление яндекс карты
    ymaps.ready(init);
    function init(){
      const myMap = new ymaps.Map("map", {
          center: [55.758468,37.601088],
          zoom: 14,
          controls: []
        },
        {
          suppressMapOpenBlock: true,
        },
      );

      const geolocationControl = new ymaps.control.GeolocationControl({
        options: {
          size: "large",
          position: { top: 359, right: 18 },
        }
      });

      const zoomControl = new ymaps.control.ZoomControl({
        options: {
            size: "small",
            position: { top: 264, right: 18 }
        }
      });

      if (getWindowWidth() > 1024) {
        myMap.controls.add(geolocationControl);
        myMap.controls.add(zoomControl);
      }

      const myGeoObject = new ymaps.GeoObject();

      myMap.geoObjects.add(myGeoObject);

      const myPlacemark = new ymaps.Placemark([55.758468,37.601088], {}, {
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

  setScroll("js-scroll-link");
  setMenuListener();
  setSliders();
  setBurger({
    btnClass: "header-top__burger", // класс бургера
    menuClass: "top-nav__wrap", // класс меню
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed", // класс закрывающегося состояния (удаляется сразу после закрытия)
    menuLink: "top-nav__link" // класс ссылки меню
  });
  setSearch({
    openBtnClass: "js-open-search", // класс кнопки открытия
    activeOpenBtnClass: "search-opened", // класс кнопки при открытой форме
    closeBtnClass: "js-close", // класс кнопки закрытия
    searchClass: "js-form", // класс формы поиска
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
  });
  setCustomSelect("galery__filter");
  setPainter({
    btnListClass: "js-accordion-container", // класс списка ссылок имен
    painterArticleClass: "catalog-left__artist", // класс статьи с описанием
    painterLinkClass: "js-tab-btn", // класс ссылки с именем
    activePainter: "catalog-left__artist--active", // класс статьи которую нужно показать
    innerListClass: "accordion__inner-list", // класс списка ссылок активной вкладки
    tabActiveClass: "tab-active" // класс активной ссылки
  });
  setValidation();
  setMap();
})();
