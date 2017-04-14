/*
 parameters
 <NavBar title={}  height={} background={} />
 */

class BottomNavBar extends React.Component {
    constructor() {
        super();
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
            height: "110px",
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "0",
            background: "#393f5a",
            borderTop: "1px solid #f0f0f0",
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
            return {
                color: isActiveTab(keyword) ? "#77a4ea" : "#ffffff",
                webkitFilter: isActiveTab(keyword) ? 'none' : "brightness(4)"
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
            backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAAzCAYAAAAtg6DjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjU1YTc3My00N2QxLTQ4MDYtYjU4YS05NDBlMDc3YmI2MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzNGMjQ4MTkxRTY4MTFFNzk1RjhEMjEwRkQzQjJFQjEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzNGMjQ4MTgxRTY4MTFFNzk1RjhEMjEwRkQzQjJFQjEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDY3OTVERTk1NzIwNjgxMTgzRDE4RDE3RTY4MjIzRDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZWY1NWE3NzMtNDdkMS00ODA2LWI1OGEtOTQwZTA3N2JiNjIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+IYOv+QAABRBJREFUeNrcmnmIVVUcx897vqaZmhnFl1NaA1kyWjGpFY1LzYRUo0GlIRS5BBZEGFpKGETl0qYUmQUFEYlLBm2Shlk2kf0hWkmrBC6t2mLqtJkt+vr+uF/pdDnn3jPvnntnnj/4wMy595x3v2f9/X735uas+FF5sBPAlWAcGA5OA/VAGv8efALWgTXgoPJsD03qF3m9kLD9GjCL9DVcH0DOAzeA/eAJsAj8rjKyfIK6Z4Gt4D6LQJPJffeA91k/bM9x5A+BA2AbeIEddGLWIseALWBImfWHsP6YUPlO0ACOB33YERPBUvAVuBXkshDZDF4GtQlnUS3badbK7gaTLPcXweOsU5emyGpOn96elktvtletla3iyNlsPFgLqtISKdNlsOd9YTDb1U02sj0RdVq5F3gXKffOSGkDnBF6Ftl0ZsfUuQ2c4VtkC2hMSWQj29ftebAxos5xYJpvkSNTPs5M7d8BShF1LvUt8vSURZral2PmjaTP1BWRhZRF2tp/JKJOQ9oeT1b2FvjOci13rIg8wnOxW3zXLG1bRAccMyJtzvlPvkX+mrKQA5ZycdanWq596FvkZymL/MBS/ihoslx71bfIDTEHcxL7Daw3lF8DbrHUkazDMt8i98QczEnsKUOmQALsJyPqTHddQl3deOalMJo72G7Y5lgO+xKjlBfTOkI2sdd92V9gMqdr2KYYyiQh1s51mqqrdjsY5sFh/xNcBzZbrv8AJA23nV6PBNfvmmbSnSv3ehcpDyepR0kvXlymQElWXRsTSg33NV1cpmt/TqkrtLKfwWV0nv/pwu+VGCcOCwmUc/BecLUKcrhRdhc3KWlrH+hg0G3NOeUikssSxizkNi4jLknh0YYDWDJq88EE0Cti9OVMe5jhk26yxl7T6v4BngULOOJh+0WZE1ki5Gaw2lWk9OgKQ+/sZqD6uWXELwdDVZBQ/ht8w0Ne1lSnoY5M99cto7eXa7YjVP5YRBqmxLTIkjiRku5/JWJU9vHHNyRcKteDp2Omp+y+Y8HbofJaunungqsorMhrh9nZHbY12UgvolfEDxfZ+4tVF/OftFPAcrDSYf1VcQ2fbPCQpLM/VkHWbiiPF8VnX6JrCIt8QAWZ6ziTBmaCL7l2BjnUOZdTbQc3MlcTh+D+mHtkGUk+9hD/P0ffKPXpWs/eKTfNITHfezzXOtmBffiDF4KBCZ2GosVp0G2Z5kQs5pn+P0EXJczjnE3SsCru7OsdUiVHRbaZnIHWjALgw9x1j4TO68aYvaDVQeTG0PKQmdSZ7waREzl1z9QYyHIVIzLOvgBfa/vGaH3jkV3uggwTU+Xka2Rd1zi0/4729yX6dB2lgrR7FvYSp6vuaOdU/CsIWZcjDGemacpO0Ue/kPFUPfqb5e60bQ4i9ZGU1/h1+W4QmcTaHO7Zrv577ScdOipP96ilQkS2KLeXr/ou25bngq6uEJE1fN440yOdprzjFOhJ5rK09BCtIe/od/YkaypHZP8KE+nyvHr82FdEnlRhIvs53KPnY4sFx0o9yUyDUsdAup5BQrt2bX+hAkeyqP0tp8KbjKBstraQoTvny/SgojlC4Ld0DKbn6blXku3S/v5IBe9nSgzhJCEtHzUuBTeqIOl2sMBcy9wKErk8lDFod3GWH2QEME2V8QVihiaj9YzSvgaJ+5hXFym9cZMKXqJI4Hq+Cj7nGkA3qrtcvk5OP/k8VN6XyNeRn5bT0L8CDAC6mfYdtjig0gAAAABJRU5ErkJggg==')"
        })
        let _style_tab_self_icon = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjU1YTc3My00N2QxLTQ4MDYtYjU4YS05NDBlMDc3YmI2MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEY1REYwRjExRTY2MTFFNzlFNDA5MUUwMTU3MDJBNjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEY1REYwRjAxRTY2MTFFNzlFNDA5MUUwMTU3MDJBNjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDY3OTVERTk1NzIwNjgxMTgzRDE4RDE3RTY4MjIzRDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZWY1NWE3NzMtNDdkMS00ODA2LWI1OGEtOTQwZTA3N2JiNjIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+fGJgOwAAA81JREFUeNrcmktIVGEUx+/c7GFPrRYqlhZmthBMW5hWSEYusveqB0SrHtQiCIQkF5W1jcJlUWBiQkWkIdTCHmTQi15OVvTEoCzLTJBK7X+Y/8RtcMZ7v+823pkDP/CO853v/O/jfOd8d3wVtZ+MeLAEF31lghJQALLBLDAdTOH/u8Fn8Bo8B/dAC3jjBSES8CawAcwZ5rvJRL633PL5C1APailQyUzFcYtAM3gGqmyIiGQydj99ic/F0RCSAc6DG6AM+Fy8NX30eZ1zZP4PITLJLuAHa6Pw7MocbZzT55aQSTxDx0FiFBNRIue8wBi0hKTyUq8Zwcy6mjGkqgpJp4M8DywTeYwl3amQJHAZZHlozctiTEl2hZjM67keXMBzGZtpR0gl06BXrYwxRhSSzwXO61bFWIcUIvm6xuX663/WiDXWNcYqZD0ojKGCt5Ax/yPEN9R9FwO2L3hVgkKKPLJeOLX5wSIzKGRLDPdUW4NCRlnvNYf2kQ2TrnXTl2qBOdpkGpvqcPAgG6oUMA1Ua4iopo8U+hx0OF460EIRslRhculH6vh3P/N6l4KfLo7t53EdfTu1YpMPjFPrCTkeAL0Kfno5NpJvW0Wlyb5bpUwotRxLAzRDwY+M2W05LlUsj7JlhUxTXFmvgPtgAsjReEaOgZ28OvmK7XNaQriy2Gb7W+BSCs3RHJ8st9ZYI/ZtjAj5GQdCekTI13gR8j4OhHwQIe1xIKRdhDyOAyFPREhLHAi5JULugm8uObytWeqoVs6tJgu2c7pZwwjsCC4Eh22OqWNVcURzCbgIfgUbq9OaQiZamjRpmVcZ4d91dIBtYDP4wUB+a8x9yrDsmNzkQ6+6KSflylmwA5wEl0ATNwjEp+zbfgEPOdeApfhsAOMV530UfMYTLI2SNDj1OmUCOAFWsMd4Kg8hCbWZoAJsN9RfNhm8jQetQgyemb1ggeZtto7IO0J5HeHnMzQOzAXlYImmAINJqsFajlvbVymnW9nH61qBi9VxqPUz1r9tcehZuQMOxcC6Uc1YjXBCxA6yafKqXQUHQj80w1w22c146UEREtNGy2ZFRCFinWAZeOchEW8ZU+dQ/zSHGVjEXD3SJjEUMybDqZDgKiypsnEERTQxho5IX7KTy7tZcuwBfVEU0Mc5Vxo2tmXtLkqSr4+y3GiM0lXI5Zy2tlBNhawhZ6jECPxuxG1rpu9yp1lT9TXbNTKPVayk6wyNbHTGCPw6yK96BnTfF/pZtldSlLx0kb1k+cXPbCOw+TeZ3/3OBu6VEfhp0wNWwm1uXMo/AgwAGrS7OCOmg84AAAAASUVORK5CYII=')"
        })
        let _style_tab_more_icon = Object.assign({}, STYLE_ICON_BASE, {
            backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAsCAYAAAD8WEF4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplZjU1YTc3My00N2QxLTQ4MDYtYjU4YS05NDBlMDc3YmI2MjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODE0ODEyMTExRTY2MTFFNzhFQUVGOUY4NjgzODJDOUEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODE0ODEyMTAxRTY2MTFFNzhFQUVGOUY4NjgzODJDOUEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDY3OTVERTk1NzIwNjgxMTgzRDE4RDE3RTY4MjIzRDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ZWY1NWE3NzMtNDdkMS00ODA2LWI1OGEtOTQwZTA3N2JiNjIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5Bp+NwAAAWtJREFUeNrsmUFOAkEQRXtaVuoVlCto4lJh4yXwHCYSWaOJcAyBc+haojfQMa50q+5g/JXUYtJ0Mmj/NiGpSh6ZmtAvP4QAVRQXt+8OtQP64Ay0wZZbrxagBDNwDb4iz6G5C4TdxsUdOHJp9QC64Lt2j+r2eBgQZE4dg+Ae1S1he45XvYY+ye31fcSqdkOf5Jawnij0DX2SmynLXhbWwlpYC2th84ddEn3Lhj7JLWFficIy6KluCTslCmdBT3VL2CGYE2RzddWL6vb6y76r4mcdJ9athZ4ZRqYEx3YXOoNtRBVVVW1M2FZ/8mFfCjnD7oIb8AKqXyJnRuqIFc3d0ot7cJgwJJ6DU3AcLDqobnllLxNk9TqI7A2obq9rnVx7A6pbwu4RhftBT3Xb3sA+Zy2shbWwFtb2Bv+yN3gjCsM9AdUtYScZ9wZUt4S9Ao8E2VNkb0B1S9hP0NHxofyDSM6MwYlb/TuU6v4RYABvr34ogW6vRwAAAABJRU5ErkJggg==')"
        })

        let _href_a = goto('/static/loan/home/index.html')
        let _href_bill = goto('/static/loan/bill/index.html?tab=billApplying')
        let _href_invite = goto('/static/loan/weixin-invite/index.html')
        let _href_self = goto('/static/loan/user/index.html')
        let _href_more = goto('/static/loan/more/index.html')

        if(!$FW.Theme.get('header')) return null;

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
                <div className="domebox"></div>
            </div>
        )
    }
}
