import './style.scss'
import BScroll from "better-scroll";
import {
    $,
    $all
} from "../../utils/utils.js"
import axios from "axios"
let flagLight = 1
let flagRender = 1
let flagSort = 0
let now = "zh"
let num = 0
renderSyn()
document.addEventListener("click", (e) => {
    let target = e.target || window.event.srcElement
    if (target.classList.contains("syn")) {
        $(".active") && $(".active").classList.remove("active")
        target.classList.add("active")
        now = "zh"
        renderSyn()
    }
    if (target.classList.contains("sales")) {
        $(".active") && $(".active").classList.remove("active")
        target.classList.add("active")
        now = "xl"
        renderSales()
    }
    if (target.classList.contains("addNew")) {
        $(".active") && $(".active").classList.remove("active")
        target.classList.add("active")
        now = "sx"
        renderAddNew()
    }
    if (target.classList.contains("sort")) {
        flagSort = 1
        num++
        if(num%3===0){
            flagSort = 0
            $(".up") && $(".up").classList.remove("up")
        }else{
            if (flagLight) {
                $(".up") && $(".up").classList.remove("up")
                target.firstElementChild.firstElementChild.classList.add("up")
                flagLight = 0
            } else {
                $(".up") && $(".up").classList.remove("up")
                target.firstElementChild.lastElementChild.classList.add("up")
                flagLight = 1
            }
        }
        if (now === "zh") {
            renderSyn()
        } else if (now === "xl") {
            renderSales()
        } else if (now === "sx") {
            renderAddNew()
        }
        
    }
    if (target.classList.contains("cut")) {
        if (flagRender) {
            target.firstElementChild.src = "/vite_6.16/src/assets/综合.png"
            $("ul").classList.add("sortUl")
            flagRender = 0
        } else {
            target.firstElementChild.src = "/vite_6.16/src/assets/排序.png"
            $("ul").classList.remove("sortUl")
            flagRender = 1
        }
    }
    if (target.nodeName === "DL") {
        localStorage.clear()
        const index = target.getAttribute("index")
        renderDetail(index, now)
    }
    if (target.classList.contains("search")) {
        window.location.href = "http://localhost:8001/vite_6.16/search"
    }
})
async function renderDetail(index, now) {
    const res = await axios.get(`https://zyxcl.xyz/exam_api/${now}`)
    console.log(res)
    const data = res.data.items.find((item) => {
        return index == item.item_id
    })
    console.log(data)
    localStorage.setItem("index", JSON.stringify(data))
    window.location.href = "http://localhost:8001/vite_6.16/detail"
}
async function renderSyn() {
    const res = await axios.get("https://zyxcl.xyz/exam_api/zh")
    console.log(res)
    const data = res.data.items
    // console.log(data)
    if (flagSort) {
        if (flagLight) {
            data.sort((a, b) => {
                return b.price - a.price
            })
        } else {
            data.sort((a, b) => {
                return a.price - b.price
            })
        }
    }
    render(data)
}
async function renderSales() {
    const res = await axios.get("https://zyxcl.xyz/exam_api/xl")
    console.log(res)
    const data = res.data.items
    // console.log(data)
    if (flagSort) {
        if (flagLight) {
            data.sort((a, b) => {
                return b.price - a.price
            })
        } else {
            data.sort((a, b) => {
                return a.price - b.price
            })
        }
    }
    render(data)
}
async function renderAddNew() {
    const res = await axios.get("https://zyxcl.xyz/exam_api/sx")
    console.log(res)
    const data = res.data.items
    // console.log(data)
    if (flagSort) {
        if (flagLight) {
            data.sort((a, b) => {
                return b.price - a.price
            })
        } else {
            data.sort((a, b) => {
                return a.price - b.price
            })
        }
        // console.log(data)
    }
    render(data)
}

function render(data) {
    $("section ul").innerHTML = data.map((item) => {
        return `<dl index="${item.item_id}">
          <dt><img src="${item.img}" alt=""></dt>
          <dd>
            <p>${item.title}</p>
            <div>月销量${item.sold}</div>
            <span>￥${item.price}</span>
          </dd>
        </dl>`
    }).join("")
}