export function getCoords($el) {
	const rect = $el.getBoundingClientRect()

	return {
		left: pageXOffset + rect.left,
		top: pageYOffset + rect.top,
	}
}

export function throttle(fn, wait) {
  let time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}