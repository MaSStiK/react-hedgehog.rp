import $ from 'jquery';

export const CONSTS = {
    loginMin: 4,
    loginMax: 32,
    passwordMin: 8,
    passwordMax: 32,
    nameMin: 1,
    nameMax: 64,
    maxBio: 1000,
}

// Получить переменные из ссылки
export function getUrlParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search))
}

// Получить переменные из ссылки
export function setPageLoading(show=true) {
    if (show) {
        $("#root").append(`<div id="page-loading"></div>`)
        return
    }

    $("#page-loading").remove()
}