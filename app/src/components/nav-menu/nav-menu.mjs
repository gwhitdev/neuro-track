/**
* This file sets up navigation automation
**/
import logger from '/assets/js/logger.mjs';

const NAVIGATION = {
    navMenu: document.getElementById("nav-menu"),
    navButton: document.getElementById("nav-button"),
    init: function() {
        Object.values(this).forEach(property => {
            if (property instanceof HTMLElement) {
                property.addEventListener('click', () => {
                    this.toggleMenu(property.id);
                });
            }
        })
    },
    toggleMenu: function(action) {
        logger('Navigation',action,"clicked");
        this.navMenu.classList.toggle('nav-menu-show');
        this.navMenu.classList.toggle('nav-menu-hide');
    }
};
document.addEventListener('DOMContentLoaded', () => {
    NAVIGATION.init();
});

