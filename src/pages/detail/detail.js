import "./detail.scss"
import {
    $,
    $all
} from "../../utils/utils.js"
let data = JSON.parse(localStorage.getItem("index"))
console.log(data)
$("h1").innerHTML = data.title;
$("img").src = data.img