(function () {
    const pathMainLeft = document.querySelectorAll('.path__main-left');
    const pathMainRight = document.querySelectorAll('.path__main-right');
    const pathSub = document.querySelectorAll('.path__sub');
    const pathLineLeft = document.querySelector('.path__line-left');
    const pathLineRight = document.querySelector('.path__line-right');
    const firstLine = document.querySelector('.slider__line--first');
    const secondLine = document.querySelector('.slider__line--second');
    const thirdLine = document.querySelector('.slider__line--third');

    const mainLeftAnim = anime({
        targets: pathMainLeft,
        loop: true,
        direction: 'alternate',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 900,
        delay: (el, i) => {return i * 700},
        endDelay: (el, i) => {return i === 4 ? 2800 : 0},
        autoplay: false
    });

    const mainRightAnim = anime({
        targets: Array.from(pathMainRight).reverse(),
        loop: true,
        direction: 'alternate',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 900,
        delay: (el, i) => {return i * 700},
        endDelay: (el, i) => {return i === 4 ? 2800 : 0},
        autoplay: false
    });

    const subAnim = anime({
        targets: pathSub,
        loop: true,
        direction: 'alternate',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 900,
        delay: (el, i) => { return 3500 + i * 700 },
        autoplay: false
    });

    const leftLineAnim = anime({
        targets: pathLineLeft,
        loop: true,
        direction: 'alternate',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 3700,
        endDelay: 2800,
        autoplay: false
    });

    const rightLineAnim = anime({
        targets: pathLineRight,
        loop: true,
        direction: 'alternate',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 3700,
        endDelay: 2800,
        autoplay: false
    });

    const firstLineFill = anime({
        targets: firstLine,
        loop: false,
        autoplay: false,
        width: {
            value: '100%',
            duration: 6000,
            direction: 'normal',
            easing: 'linear',
        }
    });

    const secondLineFill = anime({
        targets: secondLine,
        loop: false,
        autoplay: false,
        width: {
            value: '100%',
            duration: 6000,
            direction: 'normal',
            easing: 'linear'
        }
    });

    const thirdLineFill = anime({
        targets: thirdLine,
        loop: false,
        autoplay: false,
        width: {
            value: '100%',
            duration: 6000,
            direction: 'normal',
            easing: 'linear'
        }
    });

    const timelineAnim = anime.timeline({
        direction: 'normal',
        easing: 'linear',
        autoplay: false
    }).add({
        targets: [thirdLine, secondLine, firstLine],
        width: {
            value: '0',
            duration: 300,
            delay: (el, i) => { return i * 300 },
        }
    }).add({
        targets: firstLine,
        width: {
            value: '100%',
            duration: 5100
        }
    });

    let timer = null;
    let timeout = null;

    window.options = {
        mainLeftAnim: mainLeftAnim,
        mainRightAnim: mainRightAnim,
        subAnim: subAnim,
        leftLineAnim: leftLineAnim,
        rightLineAnim: rightLineAnim,
        firstLineFill: firstLineFill,
        secondLineFill: secondLineFill,
        thirdLineFill: thirdLineFill,
        timelineAnim: timelineAnim,
        timer: timer,
        timeout: timeout
    }
})();
