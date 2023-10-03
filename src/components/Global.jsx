import $ from 'jquery';


// Скопировать текст
export function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
}


// Получить переменные из ссылки
export function getUrlParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search))
}


// Отключение кнопки на время
export function setButtonDisabled(selector) {
    $(selector).attr("disabled", "disabled")
    setTimeout(() => {$(selector).removeAttr("disabled")}, 2000)
}


// Ошибка инпута
export function setInputError(selector) {
    // Если у инпута нету класса ошибки - добавляем и через 2 секунды удаляем
    if (!$(selector).hasClass("error")) {
        $(selector).addClass("error")
        setTimeout(() => {$(selector).removeClass("error")}, 2000)
    }
}