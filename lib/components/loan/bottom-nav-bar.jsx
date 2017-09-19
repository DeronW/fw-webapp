/*
 parameters
 <NavBar title={}  height={} background={} />
 */

class BottomNavBar extends React.Component {
    constructor(props) {
        super(props);
        let height = parseInt(this.props.height) || 100;
        let lineHeight = parseInt(this.props.height) || 100;
        this.state = {
            height: height,
            lineHeight: lineHeight,
            background: this.props.background || 'white'
        };
    }

    render() {
        if ($FW.Browser.inApp() || $FW.Browser.inFXHApp()) return null;

        let easyloan_style_footer_fixed = {
            width: "720px",
            height: "111px",
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "-1px",
            background: "#393f5a",
            zIndex: "100"
        };
        let isActiveTab = (tab) => {
            let pt = location.pathname, cnd = false;
            if (tab === 'home' && pt === '/') cnd = true;
            return pt.match(`/static/loan/${tab}`) || cnd
        }

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
            margin: "10px 0",
        }
        let tabColor = (keyword) => {
            let cnd = isActiveTab(keyword);
            return {
                color: cnd ? "#77a4ea" : "#ffffff"
            }
        }
        let goto = (path) => {
            return isActiveTab(path) ? null : path
        }

        let _style_tab_a = Object.assign({}, STYLE_TAB_BASE, tabColor('home'))
        let _style_tab_payback = Object.assign({}, STYLE_TAB_BASE, tabColor('payback'))
        let _style_tab_invite = Object.assign({}, STYLE_TAB_BASE, tabColor('weixin-invite'))
        let _style_tab_self = Object.assign({}, STYLE_TAB_BASE, tabColor('market'))
        let _style_tab_more = Object.assign({}, STYLE_TAB_BASE, tabColor('user'))
        let _style_tab_a_icon = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: isActiveTab("home") ? "url( 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAA0CAYAAAAT3cGOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjU1YTc3My00N2QxLTQ4MDYtYjU4YS05NDBlMDc3YmI2MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Nzg5QjAwNzYxRTY3MTFFNzg4NzFBQjJEMzg3REM4MkMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzg5QjAwNzUxRTY3MTFFNzg4NzFBQjJEMzg3REM4MkMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDY3OTVERTk1NzIwNjgxMTgzRDE4RDE3RTY4MjIzRDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZWY1NWE3NzMtNDdkMS00ODA2LWI1OGEtOTQwZTA3N2JiNjIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3zwIagAAA4dJREFUeNrUmVtIFFEYx8dxc83KTLrZg13UttJqp5LqpehCJPgSFHSll0gq6imwKBCqByEtEDKsh65amFBEPVQUVnR/6UIRZeWDgu2DUmA3KPt/7LcxDXN2z5md3Rk/+MEwZ/ac/575zne+70xG9fmI5rIFQQlfvwc/3epYd1FkFjgI6N+/YiJ8L8uNAQIuCc0E18Fyy/1csB8sACvBbz/M7E4boWajtiOpcoNJ4AzoBV/AG3AaVNr8ZjzYJzHWLlBheRurQDPoAP3gK7hk8vmEbjAZPAZjLa9zOtgMXoMd4C631YHRkpPTAEJgGTgmELWa28vBh0Qze8gi1Gql4DbYDYrBOoU3Wcxv7IZo9thGgVqZma2QXFCHwSIHfr9R8rkVMj6brTBwpZY6y5IR+1Chw4wUin0kI/aA5g+rkRF7DzzzWOhTcF82ztZ7LLZOZVNo5Rn2wtpBm4rYAbAedKVZaBeHtgHV3KCb9/TONAnt5PG6nSQyFJaWgjFpElsA1sTLBPU4O9Q50AiGpUlskHPfmyBHRSzloBs8WmBLVKJBHqj2OHRtBYUyYslPh3osNpMri4RiJ/pkuw3JiC1U6PAX57Of4jzzGax1UOUWyOSzYYUOaSFeBD3gjiAL2wYug3yOLrI2M9HM0mCGQoflpi2ywaa9hYWSLVSc2WnW3NoqdgoYqdAhBfHtfL0XvDO19XDVS7aJUT0mKI0nNuxgIdTz2/jOBWXsbKCKq+OQ4usX6rH6rOGgw2z223lcFddwwXmVd6ULYLhfxJJNBU2cqR3lOBnLS40kwpfhhtiqOCV0H1/T/v5S8GyT5Diz2FX/WMWOs4ttAjsh8cw3cFLQJit2BC/6DqtYQzEK2NlbLXp6SFYE5riwk4XtxKp03Cq4X8shLHZI0eiS2DZr6Apr/jTDLs4aPhUbtkaDXPYxWcsX3P9huj7OiApSWZvAcTsSMKlXOQrqS/Pszga3Ag79VbTArnDyEltgWwSViBNX+CdW1V9Foct8+FsU5zlHi0z3+eL6b5HpnGzM8LlYyj1ySGwZGOJzsZQYlekpcoGg6KAiGVcIuLxz7WFSspPppjrK7zZXt6vPfWolumKB6KXl6R5snU6tl8S+GCRin5PY5kEitoXEngIPfC6U9J0N8KHEYi36OZ2+SM/Xop/wkzE6sOtX/A2dsMc+gZKmj+CJFv2kf40q3L8CDAATVY6cv08nggAAAABJRU5ErkJggg==')" : "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAA0CAYAAADxAdr3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjU1YTc3My00N2QxLTQ4MDYtYjU4YS05NDBlMDc3YmI2MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEUzMzU0RDEyNUFEMTFFNzg1QjM5MDA4QkVERjI4NEYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEUzMzU0RDAyNUFEMTFFNzg1QjM5MDA4QkVERjI4NEYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzNhYzQ0NjktNDdhYy00NGVkLWExYjQtMzRjODQzNDQzYmEwIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NTU1NTkyNWQtNjYzYS0xMTdhLWI0MTUtOGViMGEyNWFhM2JkIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ViLX7QAABLhJREFUeNrUmldoVEEUhrObTWwxUSzYsMUeWyQaFBXEBvYudiwPih1RRNAHFRQfraBYkIiK+CaKYiWiiCUbLBixiyV27EbN+g/MhcNh2ubeNevAB7P3Tvl37jlnzp3dUCwWS/mfSjgBY3YFR8ATUAaKwILA5hIrHCATwc+YuhwDEb9zBCm2OfgaM5cdfueJGBY/E8wAOeAVeA6ugah4MIr2q0F18nkPuAuWgEby2lxwBewj7aqAniAfNADVQKE0qzJXk8gBzzSrdBfMAmHSvh8oJ22OkHu5bOVLQQbIAuvAO808V0EdF5MQQopj9lIIGsg+l8n176ANG3Mq67sbPHGYo8BFcB7r9BDcB78UAz4CQ9m11YoxQ6DIIk48hdvgJbn2A1S1CR7CBuogr9cFC8Frdp9+EREh6mnMbLRGqHg6w0G6bDed3W9kE9yC2eMhdl8Iv6CZ/LDFy+eSL/wRrACpzBxLyHhv2H2t0x0kncqIrXoIh7nExD4ATRxCkxDQEKQp7g1iYy53jcMdWcetijZiE5gCNoJ5oKbPGJvKnPctMROnjeME6SxMZGbAuyJ3yi1skdbHu9OJWPyNiV6eILF7mdhnuidmG4x7rBDdN2DB0xThLV/X3pZB7QezwS/5OQQmBpzdjST1j2CE3L4rlF6GZX5A9/S0gAXHWF7RyziHxWsLFLF2VMAmMUkxxxlQLV4bXqMYaHuCnG4z26xE2RaP4NosQoiYOCyBYS1FOvNjtuU3dhU8hn3b/gkWS0PpHzLvVNco0YzUP4EzBqdJBX0sjpUuE3RbuQ0ekM+dXaNEU1J/YYkiB8AJ0MbQbh04C/o6iH5K6k1cBeeS+h3D4FXBIFADFGjCkRC5TIbH/g6C6Qp3cglrIZn6mRJyylDi4Xz/z5RJvijXQRUHO57PHM+awGczh3OJDmtl29+gN7nu5QgfQEtHx+vF5s+zCR5ryvgNm8xJ8tqUSSKNWP2RcUSKDBYp5tgEr2dvuK4TiVejp7LfDfBK1jdVILzRt44ttnOJbqRepHGM5qCV4vpOGRE8p30uo8MARdvTBscrJlEn1+Z0L8i326BZgZUx/8W0wqtIu0/0DISHNXHy0tBhhRNd6Lw1QbYuDucaOtKyUebGKi6SdlMM7UwlqjgRtQr+zIL4vywvQSn53MVFsDD88ko8u46qdEV0S2+x31FgsuZeO1JfJNuqygSLYLFgg7muCDtezXYULESNd1ilfMcszeZ44ri2PngdYasbMhg+f1w7NfdGyGiTImPw/QBMwtN3isa+xexQL62CSXghGWeyz5OgL/zYKqxxuFvk1b6yyh9wk+sLaxwumiS/chVzfWFyHpCTBDucyfFEblE9TDL7SBIKjrJ3x04RhTmUs0cRb5kj85GfoMSn4JvSllO9HU8lWIShLz4mKQlAqFe+gXugved4nkl0J41uJNnPy9Qs8jzBbZNYMNXTyhOcRS6+STLB70i9lif4g+nwopIL1fM+Quykn6wvBa3BVeVvve4lw8dZ8ncZrbqxbC8akn/wEKFo13/w/45ZnmAR586D3kks9hwYGCJ/oRH2PAaMAz3kq3zIxwTCnL5WsG+6PLcTr2iXwFFwXJjJXwEGAHDm+LKckPkRAAAAAElFTkSuQmCC')"
        })
        let _style_tab_payback_icon = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: isActiveTab("payback") ?
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAAqCAMAAADPj1gPAAAAh1BMVEUAAABqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPAjB1QCAAAALHRSTlMAIrs8m/hmBOOIFAHzNRvtycKTznkKCPG1YD8pDrCCUtnVqaNwaVhKL9qPfw0Pv6wAAAGqSURBVEjHndXrloIgFAXgraEQqKmVZdfp3ky8//MNpaJmrIHZP1pnLfi6HA+EKjxn0jJRVopaJQo5ZFlU7CTdsqvYQpUk9mwSL9Ve9lJzVfmwDPXV7le1UcUMtllXbEX8NE0z/88cS/pyTyZyaZ9s07BSuoQ0bOrEAl6zQDolrln7RhPzPEW6HL2zW8FMbJ0sTGyJ+cT8zWYGlnK11GZ6J7KNLwT5xKKSYtVtzhgrXVcjtPoasiNQRro3JAxjJGEY7rT7oTgPWZCnesfkDp32obKcDVgvV9Br/WmPwaKRBRTk+dtGUsWeMeDgzFQ49tE/WN6eR+LA5Hiu4cOByYXvh8BluwdllkxPyVo1dYOjK0vUyBXY2rMDIWQP3PKROhT2jKOJnnsTW3RWLuru5Sg87+Z3+/SBZTTubhlOyfde7BpGNTtwiJ/utq04v92P9NQw5QPUp+UCsexu7PWCbZpTKsezTL1+6Zac1ZMyJcSofy/ONAsS803LaX8pLdDWxPzvue19/+fQSrdcvURAhbkxD1VyJzVFHf7toKIY2p0CW5Xd0UmReFaZt+QXgfcecXeczVsAAAAASUVORK5CYII=')" :
                "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAMAAAAgTTMxAAAAkFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+WABnwAAAAL3RSTlMAPA6l+kT28m8dF5ln3EsyEggEwlwiDAL80sq+q56M6+XjsaLXWEHOuK2BYlAsKCeUuNsAAAGySURBVEjHndXpcqsgAIZhanDDJa6Je07Wrqff/d9dpxIoNmEKeX/pjM+AwCjhuaUH07wuyAVrYNVzxl0Jy0bufOD5PzGrcFvA59cAODMqBCDdlpg3u3rwjVeydKVj/2BR4wo3wqpSOB/wqg0xaFN9PyscgDdiWAVAcfxlc0cPnJyPuHRP83a2O+1s811bzBd3XIx9oXPFHrHGpR7eibYYXnrPsQOwImppm6q3K+DAbl2AZloetCOO6u12ahDMYKO6LPhUNyqIogRJFEUBkX0G2Qwc1S2q95BlROkP18Eb5Xjmrp4Pwoqvk4V7AvJHXEYxFQ84MoFHaZfauGKiEL2bOBlz3R69m/bY5TaOXNeFAetHXG3n1nEcd+ji+IT99rdjWudQiGh6sy7hwjnq2X9NksSHn5xe1Vk6d1yFfn37fmrrHmfhmHQXH/RM1AIszvSZwr9cXXYEPO5IOIAuR8wWo1EM1wnyz3sp12XAC9H2goEQ1aXSMQ+OjjnwmOJo+zFfXvi/uiLaKlf++MKfLYmJYSPQiANLgVNopNg4L8i1A6z6EK7eWSj1o1ofqKny3+Qx/wJ1oJ37DGG9sQAAAABJRU5ErkJggg==')"
        })
        let _style_tab_invite_icon = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: isActiveTab("weixin-invite") ? "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAhFBMVEUAAABqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPBqpPB3SXbMAAAAK3RSTlMA+vbt3wqWRojpxKGBfG1eTBkO5qgszaSOVzUSBtW+UUHRPCYg2LevnHTa+I90MgAAAihJREFUSMfVldl6sjAQhieJgMqilEUtWwH33P/9/cQkf0wNbdKj9jsaeXiZfYRfIO8Q9gRlZXjwnLCYUCkS2aNjQ591KgAgXyHS5JsvPxJgqgsHAJHwn8xzBec08h1gI+zL2xzY01fdPYBQ2OvazCXUpBtAtRL23gwujGBWq2DR0cS9U7MGAFgLe2kTqYpVfbQ0gfsZ0IdJZ1FkE+jPgLtHh8UPZxCyn4LXn4KJO3gFppgPrAlcmijZO+/0sFsTuJkBD0/hGDckNXOY7UTH7ZV5P85GcA98yoVz62HNKpX+DZjs6oqG/93vA5hTvX5JkL9cosYf4Au9tTq3+oBvlW62zKfWzDxlXYo6ceAiTEmbeBp2zBG7S6xCFySyy4vHWkw/sZ8yE/MoOlDaPp5lo/C9z3fLrgKmAcuYVe0SxQkn5KVuByyry0ivKmIy2fK1lKhua6NRhU91SsXLPaWNoX0kGiVW7LG+JFzH6emW9wBRTU0YJ0mcfz6WSAYTyvsaUDtt1RaVag+NQgsm9OmmHie7Anls5zcRtvKfA4QW3LuHZsFOA5GcmR33/kEtQ6WBnmREbRUJcOQlbm05lWTGkqyxLaeSzFmSA7WX3M4bpReIHcBYjj4LO3QAd4zijbjD2QFs5fhTSqB0APunoYOFA5ixXUrHzmcesQOIwJODHQJyAeWxX6w9ODmAd6hbilZlGAA491Hpas35NWgqoktDvqkROZ2jAv6o/gHs7Bn4QAh3CwAAAABJRU5ErkJggg==')" : "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAq1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Nr6iZAAAAOHRSTlMA7vzmBPHrCPbi3KQq+as2ELeoaRXXrZKBe1NMLSQgm5aNh21HOxkM0cqyc08yup9kWsbCvkK8mFH3i6QAAAKUSURBVEjH1VXncvIwEJQlGxNMMeAEg+mhp5Ceff8n+9YRih1w+36yMwznG610uzpJ4poxDj+UlOpj+fRftE4Xv3heV6bZC02RUv8PbEEsWup9OC3iufFy9dljIEQQzZ14UZfpOojW3M8nehzQ3pivoBd/MggtxGjkLvoKYJhOPDAxioPtqh0zg5xCbyjqb4qSb1wdrqx4+Uw8ctT2bK4GlzR+07BOnsKk0KTYnokHwDyTyNmb57kJqzDxGLjNJNJ1+yIpIX/jFuqZRACXSSeVpHnXQqxBVjbHZpOaOABU5e3opLZgyNap3ABesulPrGiV13Lq7OiskzZb14Buzilmrce/faOAOx2OWuyhjchGBGCZXo88dRr8RV5T5GFAZs8cOn/BOh1zHkbqLii4cnrg2MXaFv7nwGGsKt90SwlC1vGDw6ac4d93lfzixn3A4P3H/Lbaea+u3khHqm7f/XtgWdjJwc5yV4f1Fp6qbIOovejWiqGilLYD9A2YYxjhsRu/ofEiDI782r9mC3K3zf4tgG/G2+BpaNGCT2M182HhBb/kiEcdTznLztYxw7koxixp9knLTNIEHL+EuHWSo+OZ67cf21kGmts/hS+s9Sdgu9yXEvvJYZzSHl/fCBiXEqmnlrp7IpPKxLN+XoUw0yciF4US9ePcFeeCKHJfSeK5hROK3OZILBapgJVOlOFS5FL7XIwLkQ9x2bPku1TkMXnz38RBv7nliJLr8RNoiD2wrkTscBPSRjWASSUiO00lIeLnyK9EdPX7428mEX2xBE+XXZUohfsGDS8utRdN3TLWZOTFjnQ07ebdFyE0HKsAkgP4C4XblXW1n61YpH3U928prMbsTNP44bCrOYWkVu32EAbiSvEPm7F/+fEARjYAAAAASUVORK5CYII=')"
        })
        let _style_tab_self_icon = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: isActiveTab("market") ? "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1OUJDMDRDMTI4QkMxMUU3QTlGOEE4OUZDN0NEMzIxMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1OUJDMDRDMjI4QkMxMUU3QTlGOEE4OUZDN0NEMzIxMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5QkMwNEJGMjhCQzExRTdBOUY4QTg5RkM3Q0QzMjExIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjU5QkMwNEMwMjhCQzExRTdBOUY4QTg5RkM3Q0QzMjExIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+etNRLgAAA9xJREFUeNrsmllIVFEYx69pm6kRVLaQZJQUGhZRBi2aqJRS0GaLRAY9CBX0EAQSPRSkFdRTQbQ8VBZFURL0kC1SPWhZD0U7PWTRpkl7Y5bT/2P+twaZOXNnbjPec+uDn+PM3HvO+d9z7recO3Fer9dws/UwXG4J8mdNzQdXittT1j/kDC4C9eAd8DqMFo6tHMQpZzCIbQWbHDxBA0EuyQcrKdzSPTgeVGq0GlcQy05mlYYOaH04Audr6FMmglQrAjPBSE0dZ74VgUUaR4YCKwIL3SywN92urpYGRqsETgOJmicwuSqBRYb+phRY4AKBM1QCx7lA4HCVwFc2Gn4Nrv2FAUo7l22c/0IlcF+EjX4HS8Bc8MTG4H4yaZ5jQ+RJlcBd4HSYDX5mWXUVSGGZB25HMLCPYCG4wAu2ANwIs41HoEolUK5gKdgI3lto8DyYAM4xvBSDl2Aq22ix0MYPcBhkgVqQDWb5Xay9oNNCOzKGmTzvt8XJnkyQin4AKAMl7DQZvAHPwHUuhXtmO+AEr/o8Chfry/NlyU1iII4HreAuqANneFHEBoMG9j2W/Rn8fzWzrHSORSbgKVfOMdAUqKJXCbRqSeAQWMz37WAtOBioAFWY1KCnQAbfN4LZFldSxFsWKksBFeC+nzgz3dvPmVjK41SWTed2y0+cWA4/k7Z72tp0CmFX2JHcT/3AEMbLKaCX4jz5/jjvMTn/DkOAzPAgMIwi0hRtjOKt0MoQJE6kDXzhMs7gfZduR2AesXMRc4gM7Bv3U8Ldf4moCI/1tsRkMIKOKiYWa4EPgAc8j1WHCVFqV5biNoaAtwHiWHGQviWkHHG6wHZWJQ2KYz4F+fySDjN4gOIkoG9gfDO9bSlftzB4B/K8jhdYx1fJgqqDHCOp2HRdnUynX/rW7RaNGSxk4nvU8O2vZgTIRCR5SKUD8jB8pERDoJVcNNwnpB4mBo0hjotn9WLms1XMYSPSEY1cNJj1ARdZLo1hSmViWjJnLJGzKzXlOlYFWgT6JDqYx8wdTfzryDYKkzzT3M3boXsmE2hppXD2zEzHVQK7BvihOnjRK6zvVNsMm1khfKUnvcnPy3UQuJthQmX1AbyzlEOVOgiUJDszSHjZztflhu8hiYSKDhatUdlVj4bALKPL1l0AgRU6p2phB2Qd68FgtszwbVJlulVgTaxn0PW/VbMisMPhGjrsCmx2uMBmuwLPOlxgrV2BOw1rT4m6w1r9YmvEAuUJT7Hx50mPU0zGU8Jc1rYXbfLLUB6yau8O87D/ao4n5APShDCXQ6Wh188sfXsy/3oc/C/QyfZLgAEA38P2xQkkSFQAAAAASUVORK5CYII=')" : "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RjEwMTk1ODI4QkQxMUU3QTlGOEE4OUZDN0NEMzIxMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RjEwMTk1OTI4QkQxMUU3QTlGOEE4OUZDN0NEMzIxMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdGMTAxOTU2MjhCRDExRTdBOUY4QTg5RkM3Q0QzMjExIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdGMTAxOTU3MjhCRDExRTdBOUY4QTg5RkM3Q0QzMjExIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kls5rAAABGJJREFUeNrsmntoTmEcx9/X2GYumxm5hBa1Kdf2B8mYTe5SMqRcEyXlL4r8IaJkSvKHay5JouSuZDbMQvIHImZCs2XTXMbMLo7vk+/J43HOeZ/3sr3n8P7q03nO7Xl/v/P7Pc95fr/z+g3D8P3L0s73j8t/b+B8UAhqwA9guIQWUA2KwDLgtzPA7zAGt4INHnHUGZBPJ2h5MAus91AkzgbLgwnRpZLbr4J+3HcL7UEfcFjSeY1uiAqj34Je3B8HbrnUc0mcH5K4PwC8CeTB4ZJx70Gpi0OzHtyR9nN0QnSi1C7ijOVmuSG183QMzJXahR6YYG4G48F4kC3tX/OAgSJEG9juD9KdDBwNOrH9GpR7wMAGZRxmOxmYF0Z4JoAuEVBYRFHnMMJU20Dd8OwIDoCP4DNn3WEhGCYezhHwBdSB22CI5r1Fdgb6xHtQ4rPxW/op56yIA1eMv6Ua9Ne430S8j89b9FMLMjTuT5PuaZTPqR58L7VXBViMizA6BqZIx5q57cGwydJ4+ingEJhpPnOpn26MpED9TJXaVU4e3Kg8wUdgJRgEkunVHLAJVCjXbgcTQLN0rAVcBKvBSNALdAeZYB7YDz4q/ewBo8FX6VgT2MXjnenxHmAyOMrfMWW3bJNqYLxNyAWSAwxX0cdcUG+EJsepg+gnVxkyOlLOcLU10BxXG5UnaCdVYJFFH5kcUy2aij0F+Rb9pINizT4uMUL+6MMpH0wDCxjfQznmxOxWCR6CK+AS+O4wNsRLdzJXR4NBTxDHBbIYK3fBZVDCsWeZEIBJTL5HMbMRutSCl7z3JPsKKuGN1WRiBnrEwM3gEyhwme47qdcWp4t0xmAzJ4YWDu6GMJQyyw1NYRqXyCWd0KuR6+CQPRgnbRPCVKyEs2fvMPtJkPSKd9MYHAO6g4Ft9YPtW7HfFSznpVicP8gQU+U6WBdJRXTGoKEsjD9phPQ5MD0EfWrp4UCSzPRMHttt5sGFNM5gtvFEUmYftzvAC4t773shRGdwK8rpS5RzpoHnOeF48kXf0SK3jJq0hgdFFXwaWAwecGGuvvcyGLqp1OG5z+LDSUREoxwgS7LG9V1BmUZ680Vqi+R5ThAljmSlL9trWyNEReFpLCeYeofrOkntvuAU0yJPLLbfMUSFEUkMxVTp/DTui/wwE9zjVL/Ji9nEN/CBmFLHfZH4PgPbeDzLiwbqyAhua7wwiwplxdfWDg7XrOWCoAND1SwZno60Mq2xVDsLZoWgSylrrHVuX6rt5Oxp1Xc+t6LU/orvR+HFYnDC97vg62oP6vSVHeZSTduDsZpMhKWIGX2Z1xNeO8l1owebdWK9jcVvo19IBlZI7fEuMXCcjX4hGXhBau/1/frW4I+i5yZJibOqX0ivCfGXqce+Xx8jTWngGrOtRSTTiUoNR3wYqgxnkqnkykSUINJ4LFH5oWiIqBjMdjIumNfELT6pAmbfjVEyqpG/X0B9Av6HLvb5LGZgzMDoyk8BBgBEjsHlc1d2ZwAAAABJRU5ErkJggg==')"
        })
        let _style_tab_more_icon = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: isActiveTab('user') ? "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjU1YTc3My00N2QxLTQ4MDYtYjU4YS05NDBlMDc3YmI2MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEY1REYwRjExRTY2MTFFNzlFNDA5MUUwMTU3MDJBNjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEY1REYwRjAxRTY2MTFFNzlFNDA5MUUwMTU3MDJBNjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDY3OTVERTk1NzIwNjgxMTgzRDE4RDE3RTY4MjIzRDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZWY1NWE3NzMtNDdkMS00ODA2LWI1OGEtOTQwZTA3N2JiNjIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+fGJgOwAAA81JREFUeNrcmktIVGEUx+/c7GFPrRYqlhZmthBMW5hWSEYusveqB0SrHtQiCIQkF5W1jcJlUWBiQkWkIdTCHmTQi15OVvTEoCzLTJBK7X+Y/8RtcMZ7v+823pkDP/CO853v/O/jfOd8d3wVtZ+MeLAEF31lghJQALLBLDAdTOH/u8Fn8Bo8B/dAC3jjBSES8CawAcwZ5rvJRL633PL5C1APailQyUzFcYtAM3gGqmyIiGQydj99ic/F0RCSAc6DG6AM+Fy8NX30eZ1zZP4PITLJLuAHa6Pw7MocbZzT55aQSTxDx0FiFBNRIue8wBi0hKTyUq8Zwcy6mjGkqgpJp4M8DywTeYwl3amQJHAZZHlozctiTEl2hZjM67keXMBzGZtpR0gl06BXrYwxRhSSzwXO61bFWIcUIvm6xuX663/WiDXWNcYqZD0ojKGCt5Ax/yPEN9R9FwO2L3hVgkKKPLJeOLX5wSIzKGRLDPdUW4NCRlnvNYf2kQ2TrnXTl2qBOdpkGpvqcPAgG6oUMA1Ua4iopo8U+hx0OF460EIRslRhculH6vh3P/N6l4KfLo7t53EdfTu1YpMPjFPrCTkeAL0Kfno5NpJvW0Wlyb5bpUwotRxLAzRDwY+M2W05LlUsj7JlhUxTXFmvgPtgAsjReEaOgZ28OvmK7XNaQriy2Gb7W+BSCs3RHJ8st9ZYI/ZtjAj5GQdCekTI13gR8j4OhHwQIe1xIKRdhDyOAyFPREhLHAi5JULugm8uObytWeqoVs6tJgu2c7pZwwjsCC4Eh22OqWNVcURzCbgIfgUbq9OaQiZamjRpmVcZ4d91dIBtYDP4wUB+a8x9yrDsmNzkQ6+6KSflylmwA5wEl0ATNwjEp+zbfgEPOdeApfhsAOMV530UfMYTLI2SNDj1OmUCOAFWsMd4Kg8hCbWZoAJsN9RfNhm8jQetQgyemb1ggeZtto7IO0J5HeHnMzQOzAXlYImmAINJqsFajlvbVymnW9nH61qBi9VxqPUz1r9tcehZuQMOxcC6Uc1YjXBCxA6yafKqXQUHQj80w1w22c146UEREtNGy2ZFRCFinWAZeOchEW8ZU+dQ/zSHGVjEXD3SJjEUMybDqZDgKiypsnEERTQxho5IX7KTy7tZcuwBfVEU0Mc5Vxo2tmXtLkqSr4+y3GiM0lXI5Zy2tlBNhawhZ6jECPxuxG1rpu9yp1lT9TXbNTKPVayk6wyNbHTGCPw6yK96BnTfF/pZtldSlLx0kb1k+cXPbCOw+TeZ3/3OBu6VEfhp0wNWwm1uXMo/AgwAGrS7OCOmg84AAAAASUVORK5CYII=')" : "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjU1YTc3My00N2QxLTQ4MDYtYjU4YS05NDBlMDc3YmI2MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEMyRkRBOEMyNUFEMTFFNzg2NjJEMERBNkIzNDU4RTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEMyRkRBOEIyNUFEMTFFNzg2NjJEMERBNkIzNDU4RTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzNhYzQ0NjktNDdhYy00NGVkLWExYjQtMzRjODQzNDQzYmEwIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6NTU1NTkyNWQtNjYzYS0xMTdhLWI0MTUtOGViMGEyNWFhM2JkIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+uNgDdQAAA/NJREFUeNrcmk1IVFEUx2ce0cKmaNEHWJmZjviVko5Fq2yREG0rzUpCaKNGLWrTskVQm2qR0qJFakQroZVRfvShfUhEhaWiZKWgBQPpwhKd/hfOg8PpvZn3qfM68JOZ57vnnv+7d+6799wbTiQSIY9sG6gCFSAfZIMNYA0IgznwE3wBw2AQ9IBvXlQedikkC9SDGlDo0McQuA/uggnHkSghDigFD8BiwjtbJJ+lTmKy2yKbwFVwirqLkU2Cj2AETFOXUhYBm0EUFIMtZs+WWucimPGjRY6AuMnT7AdNIGrDX5TK9Jv4jFOdlvxZuWk1uGVQ0QJoB8UOuyenmHwtGNTTQjG4EhIBXQbO+0CRBwIkReRbWhfF4khIhkGzz4NmEPZBhE6Yuty8QffNsCtENeUT4WgKxHwUIIlRndwem3UzMyfyNzEGspdRhE421S1/M5aEHBMFZ0DuCojQyaUYuNWkEpIphtjfYO8KitDZQ7HwoTkzmZAOofxsGojQaRaxdZgJ2Q2W2I1PfR6dnIxmfGheopj/EdIpXnbFaSSCv2f4S7NTCtkuJoDtaShCp11MNHeo6xpNuU4AjU3BroTS13hsKubTfNI4xFQOpHFr6AyweIf1FlEruwKmssPCU1FT8ZcgDq6L1rRjGpVXfl6RXyvWIWLJUerqxbBmZSreK8ocd/hka4WfZxbL5YlyDRqtsXWbogVRKouJ7xUOW0T6qbRYbpRi1a1ME8353qKjN+L7oEMhstxrG2V5rPlKyE6h1IqdAW/BLLhJyQMnpsrdID/KX4ONsrzn5KzCn43swowNJ+UeDKVL4Bxh13is61WLrGMXZkPBsTn2ea0W+k9MCfnFlQUo9ghvHSXkh8hbBcV4rHElZIxdyAuQEP7aGNfEMLYrQEJK2OdhTbyUMm3Md1bS8kTK9Z0S0i1uOhgAIdXie49G+xOf2MU6B45vg+dgq4V7C6g7P3QhpE7MRsb12eQlMZsstDmL/U7lJsCBJPcdZqmdCRfLXW6X+VI32+VSd59II3VT2vMQBX8evGD/n3a6D2K21E2WfLCbpFZrhEcWNnRUKjbLr+SDolykg/ocpoOqQRulOv9QMnoU3AH7lyMdZJSgaw5igs4sZVqZBiJidlOmIUoQBz6JrdOSxtsKrW43eiZXYKNn0mDEs7XRk2zrrSlIW2+pNkN7fdoMLTTImbneDOXdrNVke7rNI0FF5Mtoe7rVi+1pOwcGGh0cGGhMcWDgqJ9HOK6BkymOcHxIcYSjJMURjjZwwa8jHJwyHw/VlC3HoRqzY061IqNvxz6De26PObkVIkVVUWI6yg6eRVhCTT94NkL5Y3Xw7KsXlf8VYAA3g67fvEL8FQAAAABJRU5ErkJggg==')"
        })

        let _href_a = goto('/static/loan/products/index.html#/')
        let _href_payback = goto('/static/loan/account/index.html#/repayment-records')
        let _href_invite = goto('/static/loan/weixin-invite/index.html')
        let _href_self = goto('/static/loan/market/index.html')
        let _href_more = goto('/static/loan/account/index.html#/user-panel')
        let _dome_section = {
            width: "140px",
            height: "100px",
            overflow: "hidden",
            position: "absolute",
            top: "-22px",
            left: "50%",
            marginLeft: "-70px",
            backgroundColor: "#393f5a",
            borderRadius: "50%",
            zIndex: "-1"
        }

        if ($FW.Browser.inApp()) return null;

        return (
            <div style={easyloan_style_footer_fixed}>
                <a style={_style_tab_a} href={_href_a}>
                    <i style={_style_tab_a_icon}></i>
                    借款
                </a>
                <a style={_style_tab_payback} href={_href_payback}>
                    <i style={_style_tab_payback_icon}></i>
                    还款
                </a>
                <a style={_style_tab_invite} href={_href_invite}>
                    <i style={_style_tab_invite_icon}></i>
                    邀友
                </a>
                <a style={_style_tab_more} href={_href_more}>
                    <i style={_style_tab_more_icon}></i>
                    我的
                </a>
            </div>
        )
    }
}
