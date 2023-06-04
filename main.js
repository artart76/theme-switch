const storageKey = 'theme-preference'

const onClick = () => {
    // переворачиваем текущее значение
    theme.value = theme.value === 'light'
        ? 'dark'
        : 'light'

    setPreference()
}

const getColorPreference = () => {
    if (localStorage.getItem(storageKey))
        return localStorage.getItem(storageKey)
    else
        return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
}

const setPreference = () => {
    localStorage.setItem(storageKey, theme.value)
    reflectPreference()
}

const reflectPreference = () => {
    document.firstElementChild
        .setAttribute('data-theme', theme.value)

    document
        .querySelector('#theme-toggle')
        ?.setAttribute('aria-label', theme.value)
}

const theme = {
    value: getColorPreference(),
}

// Убираю мигание страницы отражением
reflectPreference()

window.onload = () => {
    // Добавляю при загрузке тоже, чтобы программы чтения с экрана могли видеть последнее значение на кнопке
    reflectPreference()

    // теперь этот скрипт может находить и прослушивать щелчки по элементу управления
    document
        .querySelector('#theme-toggle')
        .addEventListener('click', onClick)
}

// Ну и нужно все синхронизировать с системными изменениями
window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', ({matches:isDark}) => {
        theme.value = isDark ? 'dark' : 'light'
        setPreference()
    })