import React from 'react';
import { Browser } from '../helpers'


let tabColor = (keyword) => {
    let cnd = isActiveTab(keyword);
    return {
        color: cnd ? "#77a4ea" : "#ffffff"
    }
}

let isActiveTab = (tab) => {
    let pt = location.pathname, hash = location.hash, cnd = false;

    if (tab === 'a' &&
        (pt === '/' || pt == '/static/loan/products/' || pt == '/static/loan/products/index.html'))
        cnd = true;

    if (tab === 'b' && hash == "#/repayment-records" &&
        (pt == '/static/loan/account/' ||
            pt == '/static/loan/account/index.html'))
        cnd = true;

    if (tab === 'c' &&
        (pt == '/static/loan/weixin-invite/index.html' ||
            pt == '/static/loan/weixin-invite/' || hash === '#/invite'))
        cnd = true;

    if (tab === 'd' && hash == "#/user-panel" &&
        (pt == '/static/loan/account/' ||
            pt == '/static/loan/account/index.html'))
        cnd = true;

    return cnd
}

function get_styles(type) {
    let style = {}

    const STYLE_TAB_BASE = {
        width: "25%",
        display: "block",
        float: "left",
        textAlign: "center",
        fontSize: "24px",
    }
    const STYLE_ICON_BASE = {
        height: "51px",
        display: "block",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        margin: "10px 0"
    }

    if (type == 'fixed_panel')
        style = {
            width: "720px",
            height: "111px",
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "-1px",
            background: "#393f5a",
            zIndex: "100"
        }

    if (type == 'tab_a')
        style = Object.assign({}, STYLE_TAB_BASE, tabColor('a'))

    if (type == 'tab_b')
        style = Object.assign({}, STYLE_TAB_BASE, tabColor('b'))

    if (type == 'tab_c')
        style = Object.assign({}, STYLE_TAB_BASE, tabColor('c'))

    if (type == 'tab_d')
        style = Object.assign({}, STYLE_TAB_BASE, tabColor('d'))

    if (type == 'icon_a')
        style = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: isActiveTab("a") ?
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAA0CAMAAAAkAzG8AAAAjVBMVEUAAAB3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOrlVKg8AAAALnRSTlMA7mVUqgL7aRAG8qWHCvfmIr+h27yVkFlPRt/Y0sqEfHQ/JsRwMiwcF7U3sj0ID7pfdgAAAaBJREFUSMeVlutygjAQhQ8KKFBEBS94r9Zr2/P+j9cxaliYSNLvV2b4JoTdPRlgIjqdIjgRbWIy3rjYQUFFEdjdLz6Zwshw7MXL8fy+08XjixII5kk+iP29UDMqVp9AQk0elDkV3lC7+nm4G1Iw1itfux413zQSa3dAGwPtFlZ3pN1Pq/sDzdqirlExs7hd2ddR+2kDCM5Zi5qdUWO/eKsu9o3h6sXva7uNamrSft5UuFu2M6nUvq3JYfV1XdroiChYEBmZirfNFs+izuTBEu2Kru1egzRHT7grXTGPMgDT50Zj+XG/r7hR0EO6JLN+Y56OpjIMjriFnGMfGwuxoWSZYjtFtDJ348oaCdIUE9Y5PN2sepOiD6SPlQhyoNQLNWjAisdtUoqsKE7A8LGSMTIP2Qd0Hyo2yvWd3Ktycyc3U8PLir6iSoGUL/rSsdaBZWN4fcUMKNWikO4OcpzM55UjvHJ0l0AUOrphiiMdXd7QMbnRzpjlCV2ZYO3sruE5ux7ozr/2HTm7BTrObgfBwVE9REDQ9RdsEHqCkAzz+w/DH2wcGYWSW5VPAAAAAElFTkSuQmCC')" :
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAA0CAMAAADG3yrFAAAArlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8tivQqAAAAOXRSTlMA73cDq5lm/MNa9URtBfjr39mnlGI2GQ0InoN0PujHvn1RFOOJTCbPy15WSUIrIdO4ofK1MQ+PaDA0h19wAAACgklEQVRIx6VV2ZaqMBAM4sqAoKLgrrhvo87ozO3//7FbWSDAUfGcqQfodIqkUylb9mf8K3vNjW2+xd03iePbYcX4tEii8oQQ2JVB9SbjPnj94QLPHUbhsfRTaaQ3OWEKaPmo84igzNgN64+D+8Aljm2UcM0NKdR7bELUXCPZ4Bt4pHBNyF2MvFaN+GuFx0xk4xWs8xjfhzH5gNSJRTbfsoYJuedcUCcrh+3w7iXnx6CNd1QnEqHEr0tGyUSVLSJXq97GcvzT+4RXkixi9oQKH0gOU2pg2OGB01j+BiwLEyu4ae0uYPvsMTqYG6QTJyvZSkPf0SK7246AkRrkJ6xuLuk3Zdl5lImMY/4UtgXnPCZbMyfLvRIwf0BuEDAN06kZAZ3HYuSn7hakXLHHGHkwgbyoxAZH9gwn+KWhh0Oir7j6WD9H6wVvLDX5B8ZX3La1ltHSSmSfSnPpUVlGoUFbR1Ra03dcITprsqEMD6ykEQKPtoleNk4Ypv2caDGg2og7wvjM/JK6aTG0iS/kBfPMDQWQw9eL0VhPRQvajOXxtRz6Wr6JLrKeD44ZN+VBhNog9Zg8jnUsUQ7IqfyXKcMesvuX5APCdSbUqOvrTS+nN3lC1oUOUuW/Jl/QgfPCzMsCLtFERjF5CX2k5KINvDwg2yOOhGUQ3NRRKwKocCqjmLwG50PZpOkU1Gxaqq1cibasgMy7dlv14X4hWVk6hKXsQnKVW1qadVRIVpb28U2uy66P3Sg9VvtXRRNpsWKciSrqnMVoC80MrmAxhkQGY+KftBg+eKoNFGNG5IoG417tahbDUga23TfgF77+u4A1zfqb3KnJwN63PcqhaWRg1Vr9lcn+A9xEjULtMBklAAAAAElFTkSuQmCC')"
        })

    if (type == 'icon_b')
        style = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: isActiveTab("b") ?
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAqCAMAAADPj1gPAAAAh1BMVEUAAABqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPAjB1QCAAAALHRSTlMAIrs8m/hmBOOIFAHzNRvtycKTznkKCPG1YD8pDrCCUtnVqaNwaVhKL9qPfw0Pv6wAAAGqSURBVEjHndXrloIgFAXgraEQqKmVZdfp3ky8//MNpaJmrIHZP1pnLfi6HA+EKjxn0jJRVopaJQo5ZFlU7CTdsqvYQpUk9mwSL9Ve9lJzVfmwDPXV7le1UcUMtllXbEX8NE0z/88cS/pyTyZyaZ9s07BSuoQ0bOrEAl6zQDolrln7RhPzPEW6HL2zW8FMbJ0sTGyJ+cT8zWYGlnK11GZ6J7KNLwT5xKKSYtVtzhgrXVcjtPoasiNQRro3JAxjJGEY7rT7oTgPWZCnesfkDp32obKcDVgvV9Br/WmPwaKRBRTk+dtGUsWeMeDgzFQ49tE/WN6eR+LA5Hiu4cOByYXvh8BluwdllkxPyVo1dYOjK0vUyBXY2rMDIWQP3PKROhT2jKOJnnsTW3RWLuru5Sg87+Z3+/SBZTTubhlOyfde7BpGNTtwiJ/utq04v92P9NQw5QPUp+UCsexu7PWCbZpTKsezTL1+6Zac1ZMyJcSofy/ONAsS803LaX8pLdDWxPzvue19/+fQSrdcvURAhbkxD1VyJzVFHf7toKIY2p0CW5Xd0UmReFaZt+QXgfcecXeczVsAAAAASUVORK5CYII=')" :
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAMAAAAgTTMxAAAAkFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+WABnwAAAAL3RSTlMAPA6l+kT28m8dF5ln3EsyEggEwlwiDAL80sq+q56M6+XjsaLXWEHOuK2BYlAsKCeUuNsAAAGySURBVEjHndXpcqsgAIZhanDDJa6Je07Wrqff/d9dpxIoNmEKeX/pjM+AwCjhuaUH07wuyAVrYNVzxl0Jy0bufOD5PzGrcFvA59cAODMqBCDdlpg3u3rwjVeydKVj/2BR4wo3wqpSOB/wqg0xaFN9PyscgDdiWAVAcfxlc0cPnJyPuHRP83a2O+1s811bzBd3XIx9oXPFHrHGpR7eibYYXnrPsQOwImppm6q3K+DAbl2AZloetCOO6u12ahDMYKO6LPhUNyqIogRJFEUBkX0G2Qwc1S2q95BlROkP18Eb5Xjmrp4Pwoqvk4V7AvJHXEYxFQ84MoFHaZfauGKiEL2bOBlz3R69m/bY5TaOXNeFAetHXG3n1nEcd+ji+IT99rdjWudQiGh6sy7hwjnq2X9NksSHn5xe1Vk6d1yFfn37fmrrHmfhmHQXH/RM1AIszvSZwr9cXXYEPO5IOIAuR8wWo1EM1wnyz3sp12XAC9H2goEQ1aXSMQ+OjjnwmOJo+zFfXvi/uiLaKlf++MKfLYmJYSPQiANLgVNopNg4L8i1A6z6EK7eWSj1o1ofqKny3+Qx/wJ1oJ37DGG9sQAAAABJRU5ErkJggg==')"
        })

    if (type == 'icon_c')
        style = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: isActiveTab("c") ?
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAMAAAAPkIrYAAAAgVBMVEUAAABqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPA37PM9AAAAKnRSTlMA+fD0zesGAmgLLCC3kEQw5sdwYCUYD9nTsp2Ig3hKrFY+fVA24rukwpjBMNO9AAAC9UlEQVRYw+2XWZajIBRAQURN4pxBjdEMZmT/C+yGQlBaIUX6r+r+1KnEc/N4AyD4yWyDh4shxO4j2H5mikNIBDCM7U2bkCiEG0vVGpF/QGv+5bWAOIti/z3VhUxyAYySMIr1O7aGzNAAisjjc2VUtXDOBVv6fST+TxODancjs9x2AAD/dNjzdWJDZAei4SAK/SAU19OpFkjnQgvxYOfQD3JtOxAtayA4Q7pKXWBHveuoZuOkcaV6V6qm46GpIjGwAxKa/3LetTK5hl2QE0KcedfS5FoCSUA/+HX9L9fmO65GX8etybUFkjud7nmXB/Uqxx8MJP0gAvO4elc4GCG2iSUaV613BVIVcrdtIfFCFIlFBZdAx13nykWNMA9Ty1WjkltywLdsA9F8EeXZ3dIF5sDEIptRoTMQ+BEqz8DMtpiOKra6LU01WbH8pmXV+WyZe9UEI9YNyTrevSXaNYWoeluOVNXyK+D0r/W+7quZuJDgrJ5o/VPKAuh4cjtxmbvVG16VJ19uPJ63ULkK+HVfrVgUNM7rujmJB71QrLgBFCTGIZ7pKrieqUimXixkVmE8d/Tvp/Lbjk/hjgaav14VVm88WzQ+nXl6JZujOuX973kBYtURj76Iwq0Z5NNrFdN4E0zYjefaZ3lqNy2joDtf49OhciYnSoZ+GrpjYoEcR78YbPwHG9dFaQKewCcx4riMwXLvYLzIVhw+BrKFuiHxhMmTsOaHk5FI7WlWOQFN2JO/ZxjB7YrRYvXVAfQTAFmcIbEiVMaGFtZDRI/5DN/0cV4tPGrCUh5nY+vKpevI46xsXdX4GkwS4Mv+s09YwuKkf2xJ5Egi1oSBvSsYd+sD1Paug3Q92YTu7V37cSFLpYyWhWQRYeDau7LxCyAEqb3rJuv4Yi5k70L05pC/9sfM+VKTDwDAz4alcOxVzuBFBdFrY/ZR7nd9irCbgI/6nl+PcFFdEjqc3t1WFfpAxbs4Vsm6eJNX564+uvhtI0zLqm4X4JcP+QOxH+JtrEH+gQAAAABJRU5ErkJggg==')" :
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAyCAMAAAA+w+hKAAAApVBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+4/eNVAAAANnRSTlMAVQSB6Fr58+z15M+nh07ajmwqDwjwL9XKvbCromk2E5h1cGbBtp1h4d2zk3pIHrlEGlc6xSPOO8k/AAACnUlEQVRIx9VV2YKiQAxEQMBrABUPxAvP8RjHcab+/9M2me6lUVtgH7deSKcp0hWStPGEgTVuOq4/tgbGv+C2Rob1rTLNDHCHwGTvNGr425pZwOtvQIjaaa2WtiO2N31yu2A0V6+JbdpvnHpi0Ts1aNkm60BP+RU96rTpd9W665PjjQScdwGbGJv6gzbpPNe852oDexnmyyNmR0t8o53avatGrrq0f+i7zo+OmADDR9+QVUp8ArB0xHfNUTrAe7YYASMdkZK4e/TtKM3ZYgHYOiLr0SU6Hx7/D9GpmpwV4GaLDbDXEX0gePRtc/92BiB5UeLNh2K80imO0v5oEnH2quTCexe32UDWDfO2+i72SdDdvDgiq7izQ/aoz6Y+pK0O05tw+87FwuKu6j1zVATHEtv9kM8WDf4qbHkn8/XIaYPgJeFXmnjgeJUnnYU84nk5Y7682BjTzxqr6fjJG7E3bO9EUlYRvPXyXujJBWHC5qzTcmF/d+QpJyDYKyObdlE9py0WMRbGMxZiK6HMfENgmRsahEta16ViNu2MQDiSnOkyGLL9lhtJ+1lBAj5t9XbIL5tZdXsfRhG6ERe7SvyX8JL1eryrOF05fj1KRubslf0tAFNpHzi6THjLKENLDdglgDkbNjdwGY5qNM5kprriqcEajLHoHCXSdClSoURRfZcnkRfWpiRWF3kCnJ6UWI5AibwBOEuJhXgU2W/w9RSKuEV4EjniRtoqiaUit0bWamuug7gSMQYOqtV8DrsoZqi3R6rOPb6Hrarj6D1XdDwPwkrE9Pf+6YbLIPb41zjcU1Uw5UvuowGBhDW6E2taK0R9ZcURH/UsaPvW1dihIhwg5bHm2K3kbP5egU6jCjFyH5M4SA9Dr4Tr+Rvrfiz9AXYgkQpDKgzEAAAAAElFTkSuQmCC')"
        })

    if (type == 'icon_d')
        style = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: isActiveTab("d") ?
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAe1BMVEUAAAB3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOp3pOrL2IeZAAAAKHRSTlMA+u+52j0e9eEFzIQOz8S0pX8Y6K+aeGxDKWZYUiXS0ZRxYU04NeUyJZFaYwAAAXVJREFUSMet1udygzAQBOCVEJhmYwMG3Huy7/+EcckkkjBFmXz/YJi55UAn4V8E56OnJCmVdzwHGLRbKBpUskMf3+Mbnt+dqGSHsiNfPWGnSY22tGSvMoUln3LANIchUBykAiPVniPs9WweR/HwY8GRFvj2KTiS+MTLjKPN8LSlgy0epnQwxZ1PJz6AJZ0sgUhSV0haZGFeRrhRt0GU0JBE2FjJqlYPjTqy9RUqzKnJcBdSE+Iuo2Zutlg0QE1DDTTCbHNBQ6xoUTENBQQdCdCZe5UJCjr6QExHMeZ0NEdFRxWudOQ//mTbTO8PLTJqr5fJBclv8DQR9qsA/pvlfVGvfq6Bq1Wnwd2eJnEGcF0vah9AY+U+4GFDW7nCS3CkZYOnmC1xtW0up1n7Pl5u46fl7e8zGdHYyR9pe5jiCCqHJgg5KAxgyA8ccMhhSTP2ylK0nfr2/RPe2mWdJXbuZ5g+qySkIUxWGLRaL71QCiFDb7l+8/wX9hAbPArqw1gAAAAASUVORK5CYII=')" :
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAhFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8g2+bRAAAAK3RSTlMA+rjwJcZseyrlpMGTIN3rkB2YbzbaYBgLBlnWvLGgVS+qMizMf0xIQfVxp/+zHAAAAdJJREFUSMellumWgjAMhS9QFhFZZFERd0ed4f3fb9KOUrAgPcz3Qw9dTprkNg1UkiIw88gwotwMigSjJO627rB1F/jE8VT3cDpiiNX+uWZmBm6auoE5ew7sV+jlYIlp22FyjDm2GLQOUNks+ZThX/DGxTf4zHKDN9YmH5976MGb8zlz/bbD5iYcDOBwQ3Znz6biTmcYJOOBqNpn436EH+O/CLk/rVjRZ8TwERbRorLJh0V+ZBghI3+sV3582p9iFIeW+RCceXShAY/1GZwdHesCDTw62k7EQtgbQXrA4+rSvwctPFr6Rf9byis0IY3kQEI7nSb4thWjS2zZrBO0BQr6Ze2YlGhTdsLJ6KtAQOJqhr5pKO4a4XKVnyS1ACbJGrpW/laHtE8avvb4cmUdoyFIXy60cUm/EPrSJiXPJmyZcjDhvg7SfRE2bcRqkUoNZCqlYEaQgpGyHEHKUhX/0k6a+5HvVPGrV4yOGz4guEV1qF6xnoucUaYq5377sSkHR/Uiv8pF2wwz6ydVopaLgaJ090PDyPePvqIk7TmapW96gUWpX8anPxb6T9LUh2/68yofcU/ZIB/x/7UKakMS84YkVhqSiW3P9OZKbeEsw7AGWrhf+EBSF7SUTxMAAAAASUVORK5CYII=')"
        })

    return style
}

/*
 parameters
 <NavBar title={}  height={} background={} />
 */
class BottomNavBar extends React.Component {
    render() {

        let { history } = this.props

        let link_handler = tab => {
            // 如果当前tab是激活状态, 不用跳转
            if (isActiveTab(tab)) return;

            if (tab == 'a') {
                location.href = '/static/loan/products/index.html#/'
            }
            if (tab == 'b') {
                if (!isActiveTab('a') && history) {
                    history.push('/repayment-records')
                } else {
                    location.href = '/static/loan/account/index.html#/repayment-records'
                }
            }
            if (tab == 'c') {
                if (!isActiveTab('a') && history) {
                    history.push('/invite')
                } else {
                    location.href = '/static/loan/account/index.html#/invite'
                }
            }
            if (tab == 'd') {
                if (!isActiveTab('a') && history) {templateType
                    history.push('/user-panel')
                } else {
                    location.href = '/static/loan/account/index.html#/user-panel'
                }
            }
        }

        if (Browser.inApp) return null;

        return <div style={{ height: '120px' }}>
            <div style={get_styles('fixed_panel')}>
                <a style={get_styles('tab_a')} onClick={() => link_handler('a')}>
                    <i style={get_styles('icon_a')}></i>借款
                </a>
                <a style={get_styles('tab_b')} onClick={() => link_handler('b')}>
                    <i style={get_styles('icon_b')}></i>还款
                </a>
                <a style={get_styles('tab_c')} onClick={() => link_handler('c')}>
                    <i style={get_styles('icon_c')}></i>邀友
                </a>
                <a style={get_styles('tab_d')} onClick={() => link_handler('d')}>
                    <i style={get_styles('icon_d')}></i>我的
                </a>
            </div>
        </div>
    }
}

export default BottomNavBar
