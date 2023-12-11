import $ from "jquery";

export const CONSTS = {
    loginMin: 4,
    loginMax: 32,
    passwordMin: 8,
    passwordMax: 32,

    userNameMin: 1,
    userNameMax: 64,
    userBioMax: 850,
    userPhotoMax: 256,

    countryTitleMin: 1,
    countryTitleMax: 128,
    countryTagMax: 32,
    countryBioMainMax: 850,
    countryBioMoreMax: 850,
    countryPhotoMax: 256,
    countryPhotoPxMin: 40,
    countryPhotoPxMax: 1920,

    postTitleMin: 1,
    postTitleMax: 128,
    postTextMax: 850,
    attachmentsMax: 256,
    attachmentsCountMax: 10,
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