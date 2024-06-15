export const $ = (el, parent = document) => parent.querySelector(el)
export const $all = (el, parent = document) => [...parent.querySelectorAll(el)]