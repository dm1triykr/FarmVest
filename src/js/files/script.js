// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Theme

'use strict'

window.addEventListener('load', windowLoad);
 
function windowLoad() {
    const htmlBlock = document.documentElement;

    const saveUserTheme = localStorage.getItem('user-theme');

    let userTheme;
    if(window.matchMedia) {
        userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        !saveUserTheme ? changeTheme() : null;
    });

    const themeButton = document.querySelector('.theme__change');
    const resetButton = document.querySelector('.theme__reset');
    if(themeButton) {
        themeButton.addEventListener('click', function(e) {
            resetButton.classList.add('active');
            changeTheme(true);
        });
    }
    if(resetButton) {
        resetButton.addEventListener('click', function(e) {
            resetButton.classList.remove('active');
            localStorage.setItem('user-theme', '');
        })
    }

    function setThemeClass() {
        if(saveUserTheme){
            htmlBlock.classList.add(saveUserTheme);
            resetButton.classList.add('active');
        } else {
            htmlBlock.classList.add(userTheme);
        }
    }

    setThemeClass();

    function changeTheme(saveTheme = false) {
        let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
        let newTheme;

        if(currentTheme === 'light') {
            newTheme = 'dark';
        } else if (currentTheme === 'dark') {
            newTheme = 'light';
        }
        htmlBlock.classList.remove(currentTheme);
        htmlBlock.classList.add(newTheme);
        saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
    }
}

// Ripple effect

document.addEventListener('click', function(e) {
    const targetItem = e.target;
    if(targetItem.closest('[data-ripple]')) {
        const button = targetItem.closest('[data-ripple]');
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.pageX - (button.getBoundingClientRect().left + scrollX) - radius}px`;
        ripple.style.top = `${e.pageY - (button.getBoundingClientRect().top + scrollY) - radius}px`;
        ripple.classList.add('ripple');

        button.dataset.ripple === 'once' && button.querySelector('.ripple') ?
            button.querySelector('.ripple').remove() : null;

        button.appendChild(ripple);

        const timeOut = getAnimationDuration(ripple);

        setTimeout(() => {
            ripple ? ripple.remove() : null;
        }, timeOut);

        function getAnimationDuration() {
            const aDuration = window.getComputedStyle(ripple).animationDuration;
            return aDuration.includes('ms') ?
                aDuration.replace('ms', '') : aDuration.replace('s', '') * 1000;
        }
    }
})