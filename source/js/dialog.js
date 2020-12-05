(function () {
    window.dialog = {
        preload: function () {
            setTimeout(function () {
                document.querySelector('.header').classList.remove('header--preload');
                window.util.animateLoad();
            }, 6300);
        },
        onControlClick: function (evt) {
            const sliderItem = document.querySelector('.slider__item');
            const controlLeft = document.querySelector('.slider__control--left');
            const controlRight = document.querySelector('.slider__control--right');
            const sliderStyle = parseInt(sliderItem.style.marginLeft, 10);

            if (evt.target === controlRight) {
                window.util.nextClickAnim(sliderStyle);
                sliderItem.style.marginLeft = sliderStyle - 100 + '%';
                controlLeft.disabled = false;

                if (sliderItem.style.marginLeft === '-200%') {
                    controlRight.disabled = true;
                }
            } else if (evt.target === controlLeft) {
                window.util.prevClickAnim(sliderStyle);
                sliderItem.style.marginLeft = sliderStyle + 100 + '%';
                controlRight.disabled = false;

                if (sliderItem.style.marginLeft === '0%') {
                    controlLeft.disabled = true;
                }
            }

            window.clearTimeout(window.options.timer);
            window.util.debounce(window.util.autoSlide, 20000);
        },
        onInfoClick: function (evt) {
            evt.target
                .parentNode
                .classList.toggle('slider__wrapper--active');

            evt.target
                .parentNode
                .parentNode
                .classList.toggle('slider__item--filtered');

            window.clearTimeout(window.options.timer);
        },
        onCloseClick: function (evt) {
            evt.target
                .parentNode
                .parentNode
                .querySelector('.slider__wrapper--left')
                .classList.toggle('slider__wrapper--active');

            evt.target
                .parentNode
                .parentNode
                .classList.toggle('slider__item--filtered');
        },
        onCommentControlClick: function (evt) {
            const sliderItem = document.querySelector('.slider-com__item');
            const controlLeft = document.querySelector('.slider-com__button--left');
            const controlRight = document.querySelector('.slider-com__button--right');
            const slideMargin = parseInt(sliderItem.style.marginLeft, 10);

            if (evt.target === controlLeft) {
                slideMargin === 0 ? sliderItem.style.marginLeft = '-400%' : sliderItem.style.marginLeft = slideMargin + 100 + '%';
            } else if (evt.target === controlRight) {
                slideMargin === -400 ? sliderItem.style.marginLeft = '0' : sliderItem.style.marginLeft = slideMargin - 100 + '%';
            }
        },
        onLogoClick: function (evt) {
            evt.preventDefault();

            if (!document.querySelector('.header').classList.contains('header--preload')) {
                window.util.animateAnchor();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }
})();
