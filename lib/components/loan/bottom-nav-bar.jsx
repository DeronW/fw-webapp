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
            width: "20%",
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
                color: cnd ? "#77a4ea" : "#ffffff",
                WebkitFilter: cnd ? null : "brightness(4)",
                filter: cnd ? null : "brightness(4)"
            }
        }
        let goto = (path) => {
            return isActiveTab(path) ? null : path
        }

        let _style_tab_a = Object.assign({}, STYLE_TAB_BASE, tabColor('home'))
        let _style_tab_bill = Object.assign({}, STYLE_TAB_BASE, tabColor('bill'))
        let _style_tab_invite = Object.assign({}, STYLE_TAB_BASE, tabColor('weixin-invite'))
        let _style_tab_self = Object.assign({}, STYLE_TAB_BASE, tabColor('user'))
        let _style_tab_more = Object.assign({}, STYLE_TAB_BASE, tabColor('more'))
        let _style_tab_a_icon = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: "url( 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAA0CAYAAAAT3cGOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjU1YTc3My00N2QxLTQ4MDYtYjU4YS05NDBlMDc3YmI2MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Nzg5QjAwNzYxRTY3MTFFNzg4NzFBQjJEMzg3REM4MkMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzg5QjAwNzUxRTY3MTFFNzg4NzFBQjJEMzg3REM4MkMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDY3OTVERTk1NzIwNjgxMTgzRDE4RDE3RTY4MjIzRDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZWY1NWE3NzMtNDdkMS00ODA2LWI1OGEtOTQwZTA3N2JiNjIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3zwIagAAA4dJREFUeNrUmVtIFFEYx8dxc83KTLrZg13UttJqp5LqpehCJPgSFHSll0gq6imwKBCqByEtEDKsh65amFBEPVQUVnR/6UIRZeWDgu2DUmA3KPt/7LcxDXN2z5md3Rk/+MEwZ/ac/575zne+70xG9fmI5rIFQQlfvwc/3epYd1FkFjgI6N+/YiJ8L8uNAQIuCc0E18Fyy/1csB8sACvBbz/M7E4boWajtiOpcoNJ4AzoBV/AG3AaVNr8ZjzYJzHWLlBheRurQDPoAP3gK7hk8vmEbjAZPAZjLa9zOtgMXoMd4C631YHRkpPTAEJgGTgmELWa28vBh0Qze8gi1Gql4DbYDYrBOoU3Wcxv7IZo9thGgVqZma2QXFCHwSIHfr9R8rkVMj6brTBwpZY6y5IR+1Chw4wUin0kI/aA5g+rkRF7DzzzWOhTcF82ztZ7LLZOZVNo5Rn2wtpBm4rYAbAedKVZaBeHtgHV3KCb9/TONAnt5PG6nSQyFJaWgjFpElsA1sTLBPU4O9Q50AiGpUlskHPfmyBHRSzloBs8WmBLVKJBHqj2OHRtBYUyYslPh3osNpMri4RiJ/pkuw3JiC1U6PAX57Of4jzzGax1UOUWyOSzYYUOaSFeBD3gjiAL2wYug3yOLrI2M9HM0mCGQoflpi2ywaa9hYWSLVSc2WnW3NoqdgoYqdAhBfHtfL0XvDO19XDVS7aJUT0mKI0nNuxgIdTz2/jOBWXsbKCKq+OQ4usX6rH6rOGgw2z223lcFddwwXmVd6ULYLhfxJJNBU2cqR3lOBnLS40kwpfhhtiqOCV0H1/T/v5S8GyT5Diz2FX/WMWOs4ttAjsh8cw3cFLQJit2BC/6DqtYQzEK2NlbLXp6SFYE5riwk4XtxKp03Cq4X8shLHZI0eiS2DZr6Apr/jTDLs4aPhUbtkaDXPYxWcsX3P9huj7OiApSWZvAcTsSMKlXOQrqS/Pszga3Ag79VbTArnDyEltgWwSViBNX+CdW1V9Foct8+FsU5zlHi0z3+eL6b5HpnGzM8LlYyj1ySGwZGOJzsZQYlekpcoGg6KAiGVcIuLxz7WFSspPppjrK7zZXt6vPfWolumKB6KXl6R5snU6tl8S+GCRin5PY5kEitoXEngIPfC6U9J0N8KHEYi36OZ2+SM/Xop/wkzE6sOtX/A2dsMc+gZKmj+CJFv2kf40q3L8CDAATVY6cv08nggAAAABJRU5ErkJggg==')"
        })
        let _style_tab_bill_icon = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAvCAYAAACsaemzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjU1YTc3My00N2QxLTQ4MDYtYjU4YS05NDBlMDc3YmI2MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjA4QUI2NTUxRTY1MTFFNzlCMTVCOEE3OERDREJFOUMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjA4QUI2NTQxRTY1MTFFNzlCMTVCOEE3OERDREJFOUMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDY3OTVERTk1NzIwNjgxMTgzRDE4RDE3RTY4MjIzRDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZWY1NWE3NzMtNDdkMS00ODA2LWI1OGEtOTQwZTA3N2JiNjIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+fHK3oAAAAbFJREFUeNrsmj1Lw0AYxy9tHcziGw46KA6KDi6CDuKiddJdBEFRwX4BsaODi5OrOApuOoqCH0CKqDg4iC/oICgivgyCSLX+j55wlEu9NKV5Gp4//GjI9ej9ekmehIuT3noSRdILlkAStAg6OQUpcAz6gAuOwFeiSKd5sA5qBK2cgxHwDjbBtNp/C0a9hIbBBogLekkpmUFNRqYDLMc8Oq0SlbkCh2o7aZoIk1ArGBA0c6Jttxnam0xC7YJuHrVt19DumoTihIU+//tCTEQsLBRlIVkLuoBTBuQ4pnz+/gd4LSToDH2X6Y/NgazPPgugsZBEgEHUgRs+h1iIhVgo0nWo07LGzFXLDP34qDMVCdchviiwEAuxUNA6ZMskhRlyqB0tQevQJZ9DLMRCLMRClYzpsv0MtkMe15AocQnUJHQBJkIW2gXjpQo1EDpi3oI+3UqhF0JC9eoekS8KLEQkuWoV8lpaubcRyhISaVafDx6SezZCGUJCf+9H7Bva5Gs6dzZCsyL/ngyFzGiF9UzbvwMWbevQNegR+TVOSTeoDUmoH6TBGhgDK+BA3YpZFdxfAQYASlRFF81CIbkAAAAASUVORK5CYII=')"
        })
        let _style_tab_invite_icon = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAzCAYAAADCQcvdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjU1YTc3My00N2QxLTQ4MDYtYjU4YS05NDBlMDc3YmI2MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkI4RDg0RjgyNTkzMTFFNzg1MjM5RjA3M0Q4RTUxQjYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkI4RDg0RjcyNTkzMTFFNzg1MjM5RjA3M0Q4RTUxQjYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTFjZGVlOWYtNWFiYS00YzNkLTg2ODAtMzAxZGFjNjljYjI1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmVmNTVhNzczLTQ3ZDEtNDgwNi1iNThhLTk0MGUwNzdiYjYyMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjLrq1wAAAURSURBVHja3JoJiFVlGIbPnLlOM2ljed1GnMhcxgorM5xK7ZJoLlhpSJqZgRRUmBvJiEFpmxaFBYpiRKAzkJoFmeiIFeUS5oKRmpQ5pk6aYq6ljqa9H/c9w9/xbPee8587tw8e5t6z/Pe8//Ytcwqqqo8aEdi14CEwBPQEHUEpkMaPgB/BarAS/G1osDlPtHE8ngjZbgmYSlo5nO9A7gJPgT/BPPA2+MuIwcwQ994CtoPXXcQ5mVz3MtjK+1WrBofBeXAW7AVLwZOgOG6B/cH3oHuW93fn/f2VY/WgPbgGNAedwWNgMfgNPBOXwB7gU9Ai5OxpwXZ68HsV6Admgo3gsnJtW7AI1HC9axMoU2U5aBnREmnJ9qwpuAHMAn1BFzAXNCjXjwErQKEugRNARcT7QAXbtVsdN687OZ0tGwxe0iFQrp2oabOb6PEsP4EU+Eo5Nh2URS2wEpRrEljO9t1MdtaR4A/FPT0dtcB7Nbssv/ZP0H9aNjBqgTdpFhik/U+UzzdHLTChWWCQ9g+Ac/zcXnckkyu7wL+F/0eBJQziY4lFc2G9Mn3mfBM4Qvl8MmqBZzQ//Amf80XgceX7z1EL3KVZ4Daf82Nt0cuaqAWuA1c0iZP8r9bj/AAG3pZJAP5R1AJ/B2s1CVzokeFLzrjKtnu+C/br2GRmaRjFvWzXyW4Ay7j+LKtlzqhlF/2OvR2VNXBtnXU5Pwok+VkS4AVguC1HjDz8msIcLWzwLRHJaLDZ45o6Tl3p2MleG930mmORCZQHk/LgSpYYsrEjHJ1vfa6rDVsaCTJFyziNhirHTjFdkcV+KYPfk/X7MWeAKm4ceAU84lNzeRacZjunWLup4lp1tAKPwq+kL2+BRznSUrDtA3bYrpPy36uMMgo9Rv1z8I6t/CA2iLukde85uoDXONL2YMNpRE+y7FETVKD0ZLVDY/X0SXtcRvpBcIeRLvZeBAfpwL90Ca360WE7jdoxrlG1VLHJZ+3PALP9BEoJ/jOP0TjOH14XcpORCtkHPlOygUWmrxW3Ib/dnPngUOO/BWSZug+DL9zWoNRGFvvkWkn2+nvguiyEyYMtMYLVOIu4Ztsp8eoCTvUXwW3gBcU3F4D5Rrp47CjwTXB9gIeUDpjEaELWSpcA99wO3qdjH5tBh0jR9w2PTWueLVC4kb7yqilayumXbWliN9gCfuF6M9lZ0su9QaeQAUHSIyAoZihp7aYyys/b/WDfkHWXW4kOK+IO7haQn6fLGMbvKacpen9MSes/nNr7FPbzuJf5Pd83NtfVOlcCR3K6dlboxONhBK5XvQNnZKNA2c3ujkng5QyPW9abRSevhFlNuVLqGrwPNItJ4AoGAFdsPV4eYB3eo/hEu11iIDBQHfFEzNPT+s1sd9SUh0CD8a0lUCKqUjMHAsNYKoN1KL66j0mvX5knAitt2b3dNtNlNG5MJhdvcZ4ILOHzGh7+8Afle1czwLA3NfNbTvVqmGcGjCObknXzOX/cLrAszwT6Pa+aJCdNK6TJI2vjc/608rlVIsANTc1a2wL8B1h5kGyjgkFL43RN5OEIJpW8b4tP0rw2EWOIFpWZSsbgJu6QkX7xb5pcXJdnAvfxr4Rsq5hmSVwrmfsOlkOeM9L/LD2cYG1kZh4JXKJk+cOCBL6zGcmPZ1TfVE1G6UMjXWx2fQHWSaD0hLw1NJdJpwytvIPSgaFRrsI4qevIm02/MsaUNxN3ZtrIvwIMAI0D/S8PbbwdAAAAAElFTkSuQmCC')"
        })
        let _style_tab_self_icon = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjU1YTc3My00N2QxLTQ4MDYtYjU4YS05NDBlMDc3YmI2MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEY1REYwRjExRTY2MTFFNzlFNDA5MUUwMTU3MDJBNjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEY1REYwRjAxRTY2MTFFNzlFNDA5MUUwMTU3MDJBNjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDY3OTVERTk1NzIwNjgxMTgzRDE4RDE3RTY4MjIzRDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZWY1NWE3NzMtNDdkMS00ODA2LWI1OGEtOTQwZTA3N2JiNjIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+fGJgOwAAA81JREFUeNrcmktIVGEUx+/c7GFPrRYqlhZmthBMW5hWSEYusveqB0SrHtQiCIQkF5W1jcJlUWBiQkWkIdTCHmTQi15OVvTEoCzLTJBK7X+Y/8RtcMZ7v+823pkDP/CO853v/O/jfOd8d3wVtZ+MeLAEF31lghJQALLBLDAdTOH/u8Fn8Bo8B/dAC3jjBSES8CawAcwZ5rvJRL633PL5C1APailQyUzFcYtAM3gGqmyIiGQydj99ic/F0RCSAc6DG6AM+Fy8NX30eZ1zZP4PITLJLuAHa6Pw7MocbZzT55aQSTxDx0FiFBNRIue8wBi0hKTyUq8Zwcy6mjGkqgpJp4M8DywTeYwl3amQJHAZZHlozctiTEl2hZjM67keXMBzGZtpR0gl06BXrYwxRhSSzwXO61bFWIcUIvm6xuX663/WiDXWNcYqZD0ojKGCt5Ax/yPEN9R9FwO2L3hVgkKKPLJeOLX5wSIzKGRLDPdUW4NCRlnvNYf2kQ2TrnXTl2qBOdpkGpvqcPAgG6oUMA1Ua4iopo8U+hx0OF460EIRslRhculH6vh3P/N6l4KfLo7t53EdfTu1YpMPjFPrCTkeAL0Kfno5NpJvW0Wlyb5bpUwotRxLAzRDwY+M2W05LlUsj7JlhUxTXFmvgPtgAsjReEaOgZ28OvmK7XNaQriy2Gb7W+BSCs3RHJ8st9ZYI/ZtjAj5GQdCekTI13gR8j4OhHwQIe1xIKRdhDyOAyFPREhLHAi5JULugm8uObytWeqoVs6tJgu2c7pZwwjsCC4Eh22OqWNVcURzCbgIfgUbq9OaQiZamjRpmVcZ4d91dIBtYDP4wUB+a8x9yrDsmNzkQ6+6KSflylmwA5wEl0ATNwjEp+zbfgEPOdeApfhsAOMV530UfMYTLI2SNDj1OmUCOAFWsMd4Kg8hCbWZoAJsN9RfNhm8jQetQgyemb1ggeZtto7IO0J5HeHnMzQOzAXlYImmAINJqsFajlvbVymnW9nH61qBi9VxqPUz1r9tcehZuQMOxcC6Uc1YjXBCxA6yafKqXQUHQj80w1w22c146UEREtNGy2ZFRCFinWAZeOchEW8ZU+dQ/zSHGVjEXD3SJjEUMybDqZDgKiypsnEERTQxho5IX7KTy7tZcuwBfVEU0Mc5Vxo2tmXtLkqSr4+y3GiM0lXI5Zy2tlBNhawhZ6jECPxuxG1rpu9yp1lT9TXbNTKPVayk6wyNbHTGCPw6yK96BnTfF/pZtldSlLx0kb1k+cXPbCOw+TeZ3/3OBu6VEfhp0wNWwm1uXMo/AgwAGrS7OCOmg84AAAAASUVORK5CYII=')"
        })
        let _style_tab_more_icon = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAsCAYAAAD8WEF4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjU1YTc3My00N2QxLTQ4MDYtYjU4YS05NDBlMDc3YmI2MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODE0ODEyMTExRTY2MTFFNzhFQUVGOUY4NjgzODJDOUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODE0ODEyMTAxRTY2MTFFNzhFQUVGOUY4NjgzODJDOUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDY3OTVERTk1NzIwNjgxMTgzRDE4RDE3RTY4MjIzRDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZWY1NWE3NzMtNDdkMS00ODA2LWI1OGEtOTQwZTA3N2JiNjIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5Bp+NwAAAWtJREFUeNrsmUFOAkEQRXtaVuoVlCto4lJh4yXwHCYSWaOJcAyBc+haojfQMa50q+5g/JXUYtJ0Mmj/NiGpSh6ZmtAvP4QAVRQXt+8OtQP64Ay0wZZbrxagBDNwDb4iz6G5C4TdxsUdOHJp9QC64Lt2j+r2eBgQZE4dg+Ae1S1he45XvYY+ye31fcSqdkOf5Jawnij0DX2SmynLXhbWwlpYC2th84ddEn3Lhj7JLWFficIy6KluCTslCmdBT3VL2CGYE2RzddWL6vb6y76r4mcdJ9athZ4ZRqYEx3YXOoNtRBVVVW1M2FZ/8mFfCjnD7oIb8AKqXyJnRuqIFc3d0ot7cJgwJJ6DU3AcLDqobnllLxNk9TqI7A2obq9rnVx7A6pbwu4RhftBT3Xb3sA+Zy2shbWwFtb2Bv+yN3gjCsM9AdUtYScZ9wZUt4S9Ao8E2VNkb0B1S9hP0NHxofyDSM6MwYlb/TuU6v4RYABvr34ogW6vRwAAAABJRU5ErkJggg==')"
        })

        let _href_a = goto('/static/loan/home/index.html')
        let _href_bill = goto('/static/loan/bill/index.html')
        let _href_invite = goto('/static/loan/weixin-invite/index.html')
        let _href_self = goto('/static/loan/user/index.html')
        let _href_more = goto('/static/loan/more/index.html')
        let _dome_section = {
            width: "140px",
            height: "100px",
            overflow: "hidden",
            position: "absolute",
            top: "-22px",
            left: "50%",
            marginLeft: "-70px",
            backgroundColor:"#393f5a",
            borderRadius:"50%",
            zIndex:"-1"
    }

        //if (!$FW.Theme.get('header')) return null;

        if($FW.Browser.inApp()) return null;

        return (
            <div style={easyloan_style_footer_fixed}>
                <a style={_style_tab_a} href={_href_a}>
                    <i style={_style_tab_a_icon}></i>
                    借钱
                </a>
                <a style={_style_tab_bill} href={_href_bill}>
                    <i style={_style_tab_bill_icon}></i>
                    账单
                </a>
                <a style={_style_tab_invite} href={_href_invite}>
                    <i style={_style_tab_invite_icon}></i>
                    邀友
                </a>
                <a style={_style_tab_self} href={_href_self}>
                    <i style={_style_tab_self_icon}></i>
                    我的
                </a>
                <a style={_style_tab_more} href={_href_more}>
                    <i style={_style_tab_more_icon}></i>
                    更多
                </a>
                <div style={_dome_section}></div>
            </div>
        )
    }
}
