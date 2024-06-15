import '../scss/style.scss'
import BScroll from "better-scroll";
import {
    $,
    $all
} from "./utils"
import Swiper from 'swiper';
import 'swiper/css';
import axios from "axios"
window.onload = () => {
    let bs = new BScroll('.bs', {
        scrollbar: false, //是否显示滚动条
        bounce: true, //回弹动画
        click: true, //派发点击事件
        scrollX: true, //是否横向滚动
    })

    new Swiper('.swiper', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true,
            },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    })
    bannerAxios("/api/banner")
    dishAxios("/api/personalized")
    async function bannerAxios(url){
        const res = await axios.get(url)
        console.log(res)
        $(".swiper-wrapper").innerHTML = res.data.banners.map((item)=>{
            return `<div class="swiper-slide"><img src="${item.imageUrl}" alt=""></div>`
        }).join("")
    }
    async function dishAxios(url){
        const res = await axios.get(url)
        console.log(res)
        let data = res.data.result.slice(0,6)
        console.log(data)
        $(".comDish").innerHTML = data.map((item)=>{
            return `<div class="dish"><img src="${item.picUrl}" alt=""><span>${item.name}</span></div>`
        }).join("")
    }
}