import $ from 'jquery';

export const CONSTS = {
    loginMin: 4,
    loginMax: 32,
    passwordMin: 8,
    passwordMax: 32,

    userNameMin: 1,
    userNameMax: 64,
    userBioMax: 1000,
    userPhotoMax: 1000,

    countryTitleMin: 1,
    countryTitleMax: 128,
    countryBioMax: 5000,
    countryPhotoMax: 1000,
}

// Получить переменные из ссылки
export function getUrlParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search))
}

// Получить переменные из ссылки
export function setPageLoading(show=true) {
    if (!show) {
        $("#page-loading").remove()
        return
    }

    $("#root").append(`<div id="page-loading"></div>`)
}

export function openLink(url)  {
    window.open(url, "_blank", "noreferrer");
}