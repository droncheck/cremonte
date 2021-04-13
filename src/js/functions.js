import {getCoords} from "./utils";
import IMask from 'imask';

const $menu = document.querySelector('.mobile-menu');
const $burger = document.querySelector('.header__burger');

const $popups = document.querySelectorAll('[data-popup-name]');
const $popupOverlay = document.querySelector('.popup__overlay');

export function createPopups() {
  document.querySelectorAll('.popup__wrap').forEach($popup => {
    if ($popup.offsetHeight !== $popup.scrollHeight) {
      $popup.classList.add('scroll')
    }
  });

  return {
    openPopup(name) {
      $popupOverlay.classList.add('active');
      if (!$menu.classList.contains('active')) {
        document.body.classList.add('overflow-hidden');
      }

      $popups.forEach($popup => {

        if (name === $popup.dataset.popupName) {
          $popup.classList.add('active');
        } else {
          $popup.classList.remove('active');
        }

      });
    },
    closePopup() {
      $popupOverlay.classList.remove('active');
      if (!$menu.classList.contains('active')) {
        document.body.classList.remove('overflow-hidden');
      }

      $popups.forEach($popup => {

        $popup.classList.remove('active');

      });
    }
  }

}

export function createMenu() {

  return () => {
    $burger.classList.toggle('active');
    $menu.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden');
  }

}

export function smoothScroll($target, offset = 0) {
  const coords = getCoords($target);

  $burger.classList.remove('active');
  $menu.classList.remove('active');
  document.body.classList.remove('overflow-hidden');

  window.scrollTo({
    top: coords.top - offset,
    behavior: "smooth"
  });
}

export function createFilters() {
  const $roots = document.querySelectorAll('[data-filter-parent]');
  $roots.forEach($root => {
    const $wrapper = $root.querySelector('[data-filter-wrapper]');
    const $btns = $root.querySelectorAll('[data-filter-btn]');
    const $activeBtn = $root.querySelector('[data-filter-btn].active');
    const $items = $root.querySelectorAll('[data-filter-item]');

    $items.forEach($item => {
      if ($item.dataset.filterItem === $activeBtn.dataset.filterBtn) {
        if (!$wrapper.contains($item)) {
          $wrapper.append($item);
        }
      } else {
        if ($wrapper.contains($item)) {
          $item.remove();
        }
      }
    });
    $root.dispatchEvent(new Event('filterBuyItems'));

    $root.addEventListener('click', (e) => {
      const $target = e.target;

      if ($target.closest('[data-filter-btn]')) {
        const $t = $target.closest('[data-filter-btn]');
        $btns.forEach($btn => {
          if ($btn.dataset.filterBtn === $t.dataset.filterBtn) {
            $btn.classList.add('active');
          } else {
            $btn.classList.remove('active');
          }
        });
        $items.forEach($item => {
          if ($item.dataset.filterItem === $t.dataset.filterBtn) {
            if (!$wrapper.contains($item)) {
              $wrapper.append($item);
            }
          } else {
            if ($wrapper.contains($item)) {
              $item.remove();
            }
          }
        });
        $root.dispatchEvent(new Event('filterBuyItems'));
      }
    });
  });
}

export function createMasks() {
  const $tels = document.querySelectorAll('input[type="tel"]');
  $tels.forEach($tel => {
    IMask($tel, {
      mask: '+7 (000) 000 00-00',
      lazy: true
    });
  });
}