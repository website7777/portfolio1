const p1 = document.getElementById('p1');
p1.onclick = function () {
    window.location.href = '#second'
};
const p2  = document.getElementById('p2');
p2.onclick = function (){
    window.location.href = '#third'
};
const p3 = document.getElementById('p3');
p3.onclick = function (){
    window.location.href = '#fourth'
};
const p4 = document.getElementById('p4');
p4.onclick = function(){
    window.location.href = '#fivth'
};
const btn1 = document.getElementById('btn1');
btn1.onclick = function(){
    window.location.href = '#sixth'
};
const btn2 = document.getElementById('btn2');
btn2.onclick = function (){
    window.location.href = '#fourth'
};
const btn3 = document.getElementById('btn3');
btn3.onclick = function(){
    window.location.href = '#sixth'
};
const btn4 = document.getElementById('btn4');
btn4.onclick = function(){
    alert('Ваша заявка была отправлена!')
};
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

const scrollKey = 'scrollPos';
const restoreScrollKey = 'restoreScroll';

function getScrollTop() {
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function setScrollTop(scrollTop) {
    window.scrollTo({
        top: scrollTop,
        left: 0,
        behavior: 'instant'
    });

    document.documentElement.scrollTop = scrollTop;
    document.body.scrollTop = scrollTop;
}

function saveScrollTop() {
    sessionStorage.setItem(scrollKey, String(getScrollTop()));
}

window.addEventListener('scroll', saveScrollTop, { passive: true });

// pagehide срабатывает и при обычной перезагрузке, и при перезагрузке через Live Server.
window.addEventListener('pagehide', () => {
    saveScrollTop();
    sessionStorage.setItem(restoreScrollKey, 'true');
});

let isRestoringScroll = false;

function restoreScrollTop() {
    if (isRestoringScroll || sessionStorage.getItem(restoreScrollKey) !== 'true') {
        return;
    }

    const savedScrollTop = Number.parseInt(sessionStorage.getItem(scrollKey), 10);

    if (Number.isNaN(savedScrollTop)) {
        sessionStorage.removeItem(restoreScrollKey);
        return;
    }

    isRestoringScroll = true;
    let attempts = 0;
    const maxAttempts = 20;

    const restore = () => {
        setScrollTop(savedScrollTop);
        attempts += 1;

        if (attempts < maxAttempts) {
            window.setTimeout(restore, 50);
        } else {
            sessionStorage.removeItem(restoreScrollKey);
            isRestoringScroll = false;
        }
    };

    restore();
}

window.addEventListener('DOMContentLoaded', restoreScrollTop);
window.addEventListener('load', restoreScrollTop);
window.addEventListener('pageshow', restoreScrollTop);
