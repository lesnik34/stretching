const sliderButtons = document.querySelector('.slider__buttons');
const sliderButtonsInfo = document.querySelectorAll('.slider__button--info');
const sliderButtonsClose = document.querySelectorAll('.slider__button--close');
const commentsControl = document.querySelector('.slider-com__controls');
const logo = document.querySelector('.logo__link');

window.util.animatePreload();
window.options.timelineAnim.play();
window.options.timer = setTimeout(window.util.autoSlide, 6000);
window.onload = window.dialog.preload;
logo.addEventListener('click', window.dialog.onLogoClick)
sliderButtons.addEventListener('click', window.dialog.onControlClick);
commentsControl.addEventListener('click', window.dialog.onCommentControlClick);
sliderButtonsInfo.forEach(elem => elem.addEventListener('click', window.dialog.onInfoClick));
sliderButtonsClose.forEach(elem => elem.addEventListener('click', window.dialog.onCloseClick));
