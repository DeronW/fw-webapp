import React from 'react'

let isActiveTab = (tab) => {
    let pt = location.pathname,hash = location.hash,cnd = false;

    if(tab == 'user' && hash == '#/')
        cnd = true;

    if(tab == 'investor' && hash == '#/investor')
        cnd = true;

    if(tab == 'stats' && hash == '#/stats')
        cnd = true;

    return cnd
}

function getStyle(tab){
    let style = {}

    const STYLE_ICON_BASE = {
        height: "50px",
        display: "block",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        margin: "10px 0",
    }

    if (tab == 'fixed_panel'){
        style = {
            width: "720px",
            height: "94px",
            position: "fixed",
            left: "0",
            right: "0",
            bottom: "-1px",
            background: "#fff",
            zIndex: "100",
            paddingBottom:'6px'
        }
    }

    if(tab == 'icon_user'){
        style = Object.assign({},STYLE_ICON_BASE,{
            backgroundImage:isActiveTab("user")?
            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAyCAMAAAADUYksAAAAWlBMVEUAAACgZF2gY1ygYlufYVqfYVqeYFmeYFmgY1yfYlueYFmdXVafYlufYlufYVqfYVqeYFmeYFmeX1ifYlufYVqeYFmeYFmeYFmfYVqfYVqhZV7////28fC8ko2OlISyAAAAGnRSTlMA+fTql4AVCOPdLv3awq6eSkH0x6pGNShvbjVhVDkAAAEQSURBVDjLtdTLkoMgEIXhhqAiGo25zhzN+7/mULFC0EbaWeRfufhKQECKu12thk/b642SVUYjSpuKm0JhlSpWpGyRqC1j4zSSafcxD4WN1COM9TFcvUdskamdTYFsrzVWKo9U5ZGBkPFIS0gTnSB2og6h5zQ9o6dQRxahaRyn6ClkSclIEeThQMj0BaRko8jKyFIno27XtuzbYOol1O89dPLxfVXnTP2fK0V3tWnuFHJqwziKKuvkfMo9vx5WdVmaS8XNcMCqw7A2BonM0hyR7MiMoAy7V3zEAWA3NPSe/WJdo2+xxtn8IofwM7+II/YqhzyC86jniJ/xWkL1PCX2CdikzgDYx4w7e9Q0yNY09AfeSJDkjFNcuwAAAABJRU5ErkJggg==')":
                            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAyCAMAAAADUYksAAAAb1BMVEUAAACbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1RbWc27AAAAJHRSTlMA5vlJ7yQLFBDc0su2rKFmGJ16bWFOMqaDWzw18+vYwHSwXRxpP2I/AAAByElEQVQ4y42U23LCMAxERcitgdzThAAFCvv/39j1mMSusRnOCx7PjrWrSIhN0k9FDMTF1CfiZ97BYjd7JNsvOHxtHUnagkS//SkTyU79bwTSpramUZXiLjM3WRermo11o0pNWmIuJ1VyvUwLVqrlhZo1i6Wi8vMtHr6Vr2cuHmvxUgPQGWlokgATbQm5M1cWEmXMeOcv03cSpGMfRBImy8OinAkT6YFy+TKbzdY9SQn0UppoG2DjnqRWj7CR4zvRiQ0V2s/flcsYXgDIWyj4TKTLhclZzhgPMNK4aUEA1QLTzACqmR99ls8+sAzATx586AcYnkNXhUQVh26d5MGvGcz0Ux75FyFiEXulBs879krJQy1n5S5npZbzYa15AWbscitWx1woGrFIK5CorMecgrEuI5AqdU2+/vX4whxiWxIfPJJkD4d94mrmM8j1dmwY43i7gpxnpxRIm1gPtyAHV3MZnZG8/FfNykHqblOqXM7r02elsTfUqM6LBZ4va9tA1haz4l4fj7w+iU+kdhzH5aFW/CJpn081atRDIrUmjZ6+q4REwq4Oei5vYdFNz+Zu8ea2QKfSKxUDerSsZhoaIOYPfcsb6Fz+AGlcPXEJPzLpAAAAAElFTkSuQmCC')"

        })
    }
    if(tab == 'icon_investor'){
        style = Object.assign({},STYLE_ICON_BASE,{
            backgroundImage:isActiveTab("investor")?
            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAyCAMAAAAOT/lrAAAAb1BMVEUAAACbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1RbWc27AAAAJHRSTlMA+Qjw/EsR6sWXimYk9N9CNtjKs6rOu51wLh6nlJKAfV9dUFUUZhLsAAABNUlEQVQ4y8WU13KEMAxFZUzvLWwv2dz//8aAN7OsZJE85jzAjDkzupZliHa7gLa5zF8zwDZbQmOBcVZm0lITyhRYFHJv9JEUoh4L6RLjXmGhmopXqKCYnovm82chM9AZ1p0EeQIPMxyJwR1XQgIJ/Z8SCiP0lVoona8UQilIIhtjSeHBlD1pdO/KQ1XydyVXlQm4x44OsEdNqViYRJnWVvbOr3WGJA2E8gGGXYqJQJYr9QmAYUMfeMc4yM1HEBye+c+rkknlFhg3wywtp2p7l4mlFZhueZQira8dWFrdYGklaV2XoreSntTe6rO5nZafYqMpEVMumnJjyqApGVNOYGgj/qUpYnqN0lri7MFQL+RVGtc/fw0FKUThKoQRqbTmlbSlDUoLhy1pkzhx1zmm3xjDcCTON2xHcOIT77dPAAAAAElFTkSuQmCC')":
                            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAyCAMAAAAOT/lrAAAAflBMVEUAAACbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SR6VlmAAAAKXRSTlMA+Vr04hNKOSTx6ceGa70b1bZ1B6Ar3bCsYlNDKO2mjXs9NNCPgG4PMx5pmTkAAAGoSURBVDjLtZPZkoIwEEUTAZFVBDfcxxkdz///4IBLyKZvc6qsypULuel0C9G24gOjtvtBOXlnmJRQ9BaCPPIZojwArkLksjcdd7ZhlyeAzJtufc7oyU5xpx408enxZ3V+ZarwktSNUGxKHJb1rzCYYdJtYZPAVxSPirouRvEYAuEAmOq/LCnESsSQupYDzJWY60J/kcXr9qT6pF2Y8rlcq6XJQqIxFj5WaGy8lhyN3Gsp1bsVJFOfZQ/PDj0C6ZenT7VyBYAs3F6HmdkZ88ay/MDltb5ACmRWoEwrxrh7fHADBaBeivqWqu1AOwgHtewvbLsHrkba1aDW0HaHDCE00p4GVUNyFi1GU5TG1W37HH3g718jbTSoiAffkZ12IFQON+2Qdx2un7uom7vo+gQ/Sthph/ra86pqO9TX1wlW3p3bCQYztfNQzaNpmcNI6BRwcL6yMYcIpBF3mqhO1m5/OdHid7oSJlsJ6e2lbilIZwTGASTbpz+BwDOy8R7k/RAbCfvYO/chUNxPR7gQXqYVkOdANRVviDLuZJF4S7OiY9WIT1zD0J7lP0TPQqhcr3eCAAAAAElFTkSuQmCC')"
        })
    }
    if(tab == 'icon_stats'){
        style = Object.assign({},STYLE_ICON_BASE,{
            backgroundImage:isActiveTab("stats")?
            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAxlBMVEUAAACbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1T///+ocWugY1zz7Ovawb7GoZ3s4N6nbmijaWKdX1j+/PyygHuuenWsdnD7+fj7+Pju4+Liz83gzcvJpqLCm5cXFg1IAAAALHRSTlMA+ATzE9rOvYQI4XNNtpkzJQ9sYlGWWzkZyKN7emk8C+fUyb+NfmZXRqukDestt6wAAAHOSURBVEjHzdTpeqIwFAbgA4EiKojiVrW1ezszX4ravbPf/01NktY2TUJw/swz7x94gJOzAKE33YTBjSVdsrXg0yJTF35WjgR+CRkY/BgZ0OSfBqSLGDuJFykJyxPs7GQpAnK43MEpJ+oHwOfI7KG6qaweok9A0KdDAH2r6Q3f2E1H4nAoAwIr4H7FV/dmgCpmSrQHlFpAdS1sOOe/5EmlB5TAnjh01EGrnr+70QLU0h1ZmUh0Rdp8vvOt1Z1e0pUoPiJhJFKEeHe72j5/q/cQigQjkqZMpILm+huXvj5DI0tnU5LkafBhRg8q4KGCphfIDhSVTPfEXzxCE8vC6VXBoPvN+fpxzc13x4q6P3r94wnA88+157c++ND0dlzQHZi7TIMLMhzBa0imwV9uZJS2Ua+dkq3bUJAtR52cnMIEbklIbkt3RPKF6qS5q56UPIZtcz5D8ksHsf6JDlJq1jvPZJ52dt6jnb3uvv9NQDS5lN//5SSiZtNypk32KJt7Gw+HGSxxp1/3+PgYShBns9FolsUBFLYInePfh7Q/n7zdDifzl4vHjsJagVzrrCBDccZk0paZZKyuRs6hqbUGdsBpQTWKUzuAyjKkeuOL7d0/5jTZxurEQMsAAAAASUVORK5CYII=')":
                            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAe1BMVEUAAACbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1SbW1R4q0qAAAAAKHRSTlMABvybEw1O99pq8OHOpCSW83IZ6b64e3ZYxjsqHcCNZIaCXDGvRTbURfPPQAAAAjVJREFUSMfNVdu2ojAMbYECchOVm6Aiop78/xdOMvRQbCu8zZr9UppmJztprGyGX+RgR174zMQAaxgMfx/WYeQoAMojs+NYAhS6EfUrf4OBdeg2ANAs2uk/JfAqdGCDQHDCitNGnHGjEw5xrRMIZ4GbPZiEzAEnsxBgjwlQTuppKimIq9fgPQECwVoUJ7SyLgFJvuhFe7i0RAgWhO7muu55Eoxft25BEMHf200AekVIYMJNruGC0AMk1BBcFKGc/J4snT6uikDBDqQME71mwiWkXtBsvqjy+KIILxTvyZYkfC46OwGcLkSN8SNTRfOEuko45phKdamLAOpJajSqLtE+lwNdYy5FYFjv3RuPAwVUhDGY4iAoGUHIbYmlBhBccZEWQe0i4fMkRETo5O4Ev4h+VQIhXwyLT+PayGsGwsSSLg0gHJ8tsFPD86b8DWuov6/J5BJhxz5wRwGTRJ4mO05rn6TSEmH8nmmIjRgqPemxWU+e1d/Deu6mmWOK1EpIAWLUZn37aou9trx7qhcHw3pQ/dPBC6Bf66d+mvKCMzsEMaJaHfM6In/BvoG7QBS3yQQTWeOSO7icrcCP4ROxz9bBdyEohHjn23hXZUyxy+qtnWy/vv8NwWsbmv+m9dg2jo900dnTVuF+6YCO8PD1ph8/IP9qnul+nz5DyY4q622M8s2u2vmYt9Vk/BlN/4HC5bdOt3e3nJIOXJeD1uDuWZt2D6hpJuGasS/IriaB9f3anD3mKfwD/V5lTffxhUkAAAAASUVORK5CYII=')"
        })
    }

    return style
}

class BottomNavBar extends React.Component{
    render(){
        // let { history } = this.props
        let link_handler = tab => {
            if (isActiveTab(tab)) return;

            if(tab == 'user'){
                location.href = '/static/manager/jrgc/index.html#/'
            }
            if(tab == 'investor'){
                location.href = '/static/manager/jrgc/index.html#/investor'
            }
            if(tab == 'stats'){
                location.href = '/static/manager/jrgc/index.html#/stats'
            }
        }
        const STYLE_TAB_BASE = {
            width: "33.33%",
            display: "block",
            float: "left",
            textAlign: "center",
            fontSize: "22px",
            color:"#9b5b54"
        }
        return <div>
            <div style={getStyle('fixed_panel')}>
                <a style={STYLE_TAB_BASE} onClick={() => link_handler('user')}>
                    <i style={getStyle('icon_user')}></i>我的
                </a>
                <a style={STYLE_TAB_BASE} onClick={() => link_handler('investor')}>
                    <i style={getStyle('icon_investor')}></i>客户
                </a>
                <a style={STYLE_TAB_BASE} onClick={() => link_handler('stats')}>
                    <i style={getStyle('icon_stats')}></i>业绩
                </a>
            </div>
        </div>
    }
}

export default BottomNavBar