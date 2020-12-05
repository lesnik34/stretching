(function () {
    window.util = {
        animatePreload: function () {
            window.options.mainLeftAnim.play();
            window.options.mainRightAnim.play();
            window.options.subAnim.play();
            window.options.leftLineAnim.play();
            window.options.rightLineAnim.play();
        },
        animateLoad: function () {
            window.options.mainLeftAnim.seek(3600);
            window.options.mainLeftAnim.pause();

            window.options.mainRightAnim.seek(3600);
            window.options.mainRightAnim.pause();

            window.options.subAnim.seek(6300);
            window.options.subAnim.pause();

            window.options.leftLineAnim.seek(3600);
            window.options.leftLineAnim.pause();

            window.options.rightLineAnim.seek(3600);
            window.options.rightLineAnim.pause();
        },
        animateAnchor: function() {
            const pathMainLeft = document.querySelectorAll('.path__main-left');
            const pathMainRight = document.querySelectorAll('.path__main-right');
            const pathSub = document.querySelectorAll('.path__sub');
            const pathLineLeft = document.querySelector('.path__line-left');
            const pathLineRight = document.querySelector('.path__line-right');

            anime.timeline({
                loop: false,
                easing: 'easeInOutSine'
            }).add({
                targets: Array.from(pathMainLeft).concat(pathMainRight),
                strokeDashoffset: [anime.setDashoffset, 0],
                delay: (el, i) => {return i * 40},
                duration: 200
            }).add({
                targets: pathSub,
                strokeDashoffset: [anime.setDashoffset, 0],
                delay: (el, i) => {return i * 40},
                duration: 200
            }).add({
                targets: [pathLineLeft, pathLineRight],
                strokeDashoffset: [anime.setDashoffset, 0],
                duration: 200
            })
        },
        debounce: function (cb, time = 10000) {
            return function () {
                window.clearTimeout(window.options.timeout);
                window.options.timeout = window.setTimeout(cb, time);
            }()
        },
        autoSlide: function () {
            const sliderItem = document.querySelector('.slider__item');
            const controlLeft = document.querySelector('.slider__control--left');
            const controlRight = document.querySelector('.slider__control--right');

            switch (parseInt(sliderItem.style.marginLeft, 10)) {
                case -200:
                    controlRight.disabled = false;
                    controlLeft.disabled = true;
                    sliderItem.style.marginLeft = '0%';
                    window.options.timelineAnim.play();
                    break;

                case -100:
                    controlRight.disabled = true;
                    controlLeft.disabled = false;
                    sliderItem.style.marginLeft = parseInt(sliderItem.style.marginLeft, 10) - 100 + '%';
                    window.options.thirdLineFill.play();
                    break;

                case 0:
                    controlRight.disabled = false;
                    controlLeft.disabled = false;
                    sliderItem.style.marginLeft = parseInt(sliderItem.style.marginLeft, 10) - 100 + '%';
                    window.options.secondLineFill.play();
                    break;
            }

            window.options.timer = setTimeout(window.util.autoSlide, 6000);
        },
        clearAnim: function(target) {
            anime({
                targets: target,
                loop: false,
                width: {
                    value: '0',
                    duration: 200,
                    direction: 'normal',
                    easing: 'linear'
                }
            });
        },
        fillAnim: function(prevLine, nextLine) {
            anime.timeline({
                direction: 'normal',
                easing: 'linear'
            }).add({
                targets: prevLine,
                width: {
                    value: '100%',
                    duration: 200,
                    direction: 'normal',
                    easing: 'linear'
                }
            }).add({
                targets: nextLine,
                width: {
                    value: '100%',
                    duration: 200,
                    direction: 'normal',
                    easing: 'linear'
                }
            })
        },
        nextClickAnim: function (sliderStyle) {
            const firstLine = document.querySelector('.slider__line--first');
            const secondLine = document.querySelector('.slider__line--second');
            const thirdLine = document.querySelector('.slider__line--third');

            switch (sliderStyle) {
                case -100:
                    window.options.secondLineFill.pause();
                    window.util.fillAnim(secondLine, thirdLine);
                    window.options.secondLineFill.seek(0);
                    break;

                case 0:
                    window.options.timelineAnim.pause();
                    window.util.fillAnim(firstLine, secondLine);
                    window.options.timelineAnim.seek(0);
                    break;
            }
        },
        prevClickAnim: function (sliderStyle) {
            const secondLine = document.querySelector('.slider__line--second');
            const thirdLine = document.querySelector('.slider__line--third');

            switch (sliderStyle) {
                case -200:
                    window.options.thirdLineFill.pause();
                    window.util.clearAnim(thirdLine);
                    window.options.thirdLineFill.seek(0);
                    break;

                case -100:
                    window.options.secondLineFill.pause();
                    window.util.clearAnim(secondLine);
                    window.options.secondLineFill.seek(0);
                    break;
            }
        }
    }
})();
