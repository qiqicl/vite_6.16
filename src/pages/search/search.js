import "./search.scss"
import {
    $,
    $all
} from "../../utils/utils.js"
import axios from "axios"
document.addEventListener("keyup",(e)=>{
    let con = $(".search").value
    console.log(con)
    render(con)
})
async function render(con) {
    const res = await axios.get("/api/zh")
    // console.log(res)
    let data = res.data.items
    // console.log(data)
    data = data.filter((item)=>{
        return item.title.includes(con)
    })
    console.log(data)
    $("ul").innerHTML = data.map((item)=>{
        return `<li>${item.title}</li>`
    }).join("")
}