window.addEventListener("DOMContentLoaded", function() {
  // формы поика
  document.querySelector(".search__btn--open").addEventListener("click", function() {
    document.querySelector(".search__form").classList.add("search__form--active");
    this.classList.add("active");
  });

  document.addEventListener("click", function(e) {
    let target = e.target;
    let form = document.querySelector(".search__form");
    if (!target.closest(".header__search")) {
    form.classList.remove("search__form--active");
      form.querySelector("input").value = "";
      document.querySelector(".search__btn--open").classList.remove("active")
    }
    if (!target.closest(".header-bottom__list")) {
      document.querySelectorAll(".dropdown").forEach(el => {
          el.classList.remove("active-dropdown");
      })
      document.querySelectorAll(".header-bottom__btn").forEach(el => {
          el.classList.remove("dropdown__btn--active");
      });
    }
  });

  // выпадающий список
  document.querySelectorAll(".header-bottom__btn").forEach(item => {
    item.addEventListener("click", function() {
      let btn = this;
      let dropdown = this.parentElement.querySelector(".dropdown");

      document.querySelectorAll(".header-bottom__btn").forEach(el => {
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
})
