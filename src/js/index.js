import SwiperCore, { Navigation } from 'swiper/core';
import WOW from 'wow.js';
import {createFilters, createMasks, createMenu, createPopups, smoothScroll} from './functions';
import {getCoords, throttle} from './utils';
import simpleParallax from 'simple-parallax-js';

SwiperCore.use([Navigation]);

document.addEventListener('DOMContentLoaded', function() {

  const fontSize = parseInt(window.getComputedStyle(document.body).fontSize)

  const $gainsSlider = document.querySelector('.gains__slider');
  if ($gainsSlider) {
    new SwiperCore($gainsSlider, {
      slidesPerView: 1,
      loop: true,
      spaceBetween: fontSize * 1.5,
      autoHeight: true,
      navigation: {
        prevEl: '.gains__slider-arrow--prev',
        nextEl: '.gains__slider-arrow--next'
      },
      breakpoints: {
        992: {
          slidesPerView: +$gainsSlider.dataset.slidesPerView,
          spaceBetween: fontSize * 4.5,
          autoHeight: false,
          loop: $gainsSlider.dataset.loop === 'false' ? false : true,
        }
      }
    });
  }

  new SwiperCore('.production__slider', {
    slidesPerView: 1,
    loop: true,
    autoHeight: true,
    navigation: {
      prevEl: '.production__slider-arrow--prev',
      nextEl: '.production__slider-arrow--next'
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        autoHeight: false
      }
    }
  });

  new SwiperCore('.recipes__slider', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: fontSize * 1.25,
    autoHeight: true,
    navigation: {
      prevEl: '.recipes__slider-arrow--prev',
      nextEl: '.recipes__slider-arrow--next'
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        autoHeight: false,
      }
    }
  });

  const $buyContainer = document.querySelector('.buy__container');
  const buySlider = new SwiperCore('.buy__slider', {
    slidesPerView: 'auto',
    freeMode: true,
    spaceBetween: fontSize * 1.375,
    navigation: {
      prevEl: '.buy__slider-arrow--prev',
      nextEl: '.buy__slider-arrow--next'
    },
    breakpoints: {
      992: {
        spaceBetween: fontSize * 3.5625
      }
    }
  });
  if ($buyContainer) {
    $buyContainer.addEventListener('filterBuyItems', () => {
      buySlider.updateSlides();
      buySlider.slideTo(0);
    });
  }

  new SwiperCore('.production-list__slider', {
    slidesPerView: 1,
    loop: true,
    spaceBetween: fontSize * 0.625,
    autoHeight: true,
    navigation: {
      prevEl: '.production-list__slider-arrow--prev',
      nextEl: '.production-list__slider-arrow--next'
    },
    breakpoints: {
      992: {
        slidesPerView: 3,
        spaceBetween: fontSize * 1.25,
        autoHeight: false
      }
    }
  });

  let factsSlider = null;
  const factsSliderOptions = {
    autoHeight: true,
    loop: true,
    navigation: {
      prevEl: '.facts__slider-arrow--prev',
      nextEl: '.facts__slider-arrow--next'
    }
  };

  if (window.matchMedia('(max-width: 991.98px)').matches) {
    factsSlider = new SwiperCore('.facts__slider', factsSliderOptions);
  }

  window.addEventListener('resize', () => {
    if (window.matchMedia('(max-width: 991.98px)').matches) {
      if (!factsSlider || factsSlider.destroyed) {
        factsSlider = new SwiperCore('.facts__slider', factsSliderOptions);
      }
    } else {
      if (factsSlider && !factsSlider.destroyed) {
        factsSlider.destroy();
      }
    }
  });

  createFilters();

  const {openPopup, closePopup} = createPopups();
  const toggleMenu = createMenu();
  const $header = document.querySelector('.header');

  document.addEventListener('click', (e) => {
    const $target = e.target;

    if ($target.dataset.popupBtn) {
      openPopup($target.dataset.popupBtn);
    } else if ($target.dataset.popupClose) {
      closePopup();
    } else if ($target.dataset.menuBtn) {
      toggleMenu();
    } else if($target.closest('[data-href]')) {
      e.preventDefault();
      const $t = document.getElementById($target.closest('[data-href]').dataset.href);

      smoothScroll($t, 0);
    }
  });

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 1) {
      $header.classList.add('fixed');
    } else {
      $header.classList.remove('fixed');
    }
  });

  const parallaxImgs = document.querySelectorAll('.parallax');
  if (window.matchMedia('(min-width: 992px)').matches) {
    new simpleParallax(parallaxImgs, {
        delay: 0,
        orientation: 'down',
        scale: 1.5,
        overflow: true,
    });

    new WOW().init();
  } else {
    const $btns = document.querySelectorAll('.btn');
    const coords = Array.prototype.map.call($btns, ($btn) => {
      const {top} = getCoords($btn)
      return {top, $btn};
    });
    console.log(coords)

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      coords.forEach(obj => {
        if (scrollTop + window.innerHeight >= obj.top) {
          obj.$btn.classList.add('active');
        }
      });
    });
  }

  createMasks()
});
