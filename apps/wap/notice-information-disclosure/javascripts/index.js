/**
 * Created by Administrator on 2017/3/20.
 */
window.onload = function () {
    var tabs = document.querySelectorAll('.informationTabMobile .tab');
    var parts = document.querySelectorAll('.infoConPartMobile');
    var reportBtn = document.querySelector(".reportBtn");
    var auditBtn1 = document.querySelector(".auditBtn1");
    var auditBtn2 = document.querySelector(".auditBtn2");
    var auditBtn3 = document.querySelector(".auditBtn3");
    var rlineLook = document.querySelector(".rlineLook");

    var len = tabs.length;
    for (var i = 0; i < len; i++) {
        tabs[i].onclick = function () {
            for (var j = 0; j < len; j++) {
                if (this == tabs[j]) {
                    tabs[j].classList.add("active");
                    parts[j].classList.add("show");
                } else {
                    tabs[j].classList.remove("active");
                    parts[j].classList.remove("show");
                }
            }
        };
    }

    function gotoHandler(link, need_login) {
        if (link.indexOf('://') < 0) {
            link = location.protocol + '//' + location.hostname + link;
        }
        if ($FW.Browser.inApp()) {
            NativeBridge.goto(link, need_login)
        } else {
            location.href = encodeURI(link);
        }
    }

    rlineLook.onclick = function () {
        gotoHandler("https://m.9888.cn/static/wap/protocol-user-service/index.html")
    };
    auditBtn1.onclick = function () {
        //gotoHandler("")
    };
    auditBtn2.onclick = function () {
        //gotoHandler("")
    };
    auditBtn3.onclick = function () {
        //gotoHandler("")
    };

    //判断金额 n:四舍五入保留几位小数，默认为2位
    function judgeCash(value, n) {
        n = n > 0 && n <= 20 ? n : 2;
        var len = value.toString().split(".")[0].length;
        value = Number(value.toString().substr(0, 11));
        var v = "";
        if (len > 8) {
            v = (value / 100000000).toFixed(n) + "亿";
        } else if (len > 3) {
            v = (value / 10000).toFixed(n) + "万";
        } else {
            return value
        }
        return v
    }

    //格式化人数
    function formatPerson(s) {
        s = parseFloat((s + "").replace(/[^\d.-]/g, "")) + "";
        var l = s.split(".")[0].split("").reverse(),
            t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + '人';
    }

    //防止除不尽
    function prevent(number) {
        return Number(number.toString().substr(0, 9)).toFixed(2)
    }

    function firstPie() {
        var myChartLeft = echarts.init(document.getElementById('main1'));

        optionLeft = {
            title: {
                text: '借款用户',
                subtext: '',
                x: 'center',
                textStyle: {
                    color: '#384a62',
                    fontSize: 36,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{d}%",
                backgroundColor: 'rgba(55,72,123,0.7)',
                padding: 10,
                textStyle: {
                    fontSize: 24
                }
            },
            legend: {
                orient: 'vertical',
                left: '20',
                top: '120',
                itemWidth: 18,
                itemHeight: 18,
                itemGap: 20,
                data: [
                    {
                        name: '18~25岁',
                        icon: 'image://https://static.9888.cn/images/web/circle1.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    },
                    {
                        name: '25~35岁',
                        icon: 'image://https://static.9888.cn/images/web/circle2.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    },
                    {
                        name: '35~45岁',
                        icon: 'image://https://static.9888.cn/images/web/circle3.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    },
                    {
                        name: '45~60岁',
                        icon: 'image://https://static.9888.cn/images/web/circle4.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    },
                    {
                        name: '60岁以上',
                        icon: 'image://https://static.9888.cn/images/web/circle5.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    },
                    {
                        name: '男士',
                        icon: 'image://https://static.9888.cn/images/web/circleMale.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    },
                    {
                        name: '女士',
                        icon: 'image://https://static.9888.cn/images/web/circleFemale.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    }
                ]
            },
            color: ['#f66493', '#5bccff', '#ffa100', '#4fd9e2', '#677ecc', '#ff837f', '#a194cf'],
            textStyle: {
                color: '#fff',
                fontSize: 24
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '38%'],
                    selectedOffset: 6,
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    data: [
                        {value: arguments[0], name: '女士', selected: true},
                        {value: arguments[1], name: '男士'}
                    ]
                },
                {
                    name: '',
                    type: 'pie',
                    radius: ['46%', '62%'],
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {value: arguments[2], name: '18~25岁'},
                        {value: arguments[3], name: '25~35岁'},
                        {value: arguments[4], name: '35~45岁'},
                        {value: arguments[5], name: '45~60岁'},
                        {value: arguments[6], name: '60岁以上'}
                    ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChartLeft.setOption(optionLeft);
    }

    function secondPie() {
        //第二个饼图
        var myChartRight = echarts.init(document.getElementById('main2'));

        optionRight = {
            title: {
                text: '出借用户',
                subtext: '',
                x: 'center',
                textStyle: {
                    color: '#384a62',
                    fontSize: 36,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{d}%",
                backgroundColor: 'rgba(55,72,123,0.7)',
                padding: 10,
                textStyle: {
                    fontSize: 24
                }
            },
            legend: {
                orient: 'vertical',
                left: '20',
                top: '120',
                itemWidth: 18,
                itemHeight: 18,
                itemGap: 20,
                data: [
                    {
                        name: '18~25岁',
                        icon: 'image://https://static.9888.cn/images/web/circleRight1.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    },
                    {
                        name: '25~35岁',
                        icon: 'image://https://static.9888.cn/images/web/circleRight2.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    },
                    {
                        name: '35~45岁',
                        icon: 'image://https://static.9888.cn/images/web/circleRight3.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    },
                    {
                        name: '45~60岁',
                        icon: 'image://https://static.9888.cn/images/web/circleRight4.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    },
                    {
                        name: '60岁以上',
                        icon: 'image://https://static.9888.cn/images/web/circleRight5.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    },
                    {
                        name: '男士',
                        icon: 'image://https://static.9888.cn/images/web/circleRight6.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    },
                    {
                        name: '女士',
                        icon: 'image://https://static.9888.cn/images/web/circleRight7.png',
                        textStyle: {
                            color: '#666',
                            fontSize: 20
                        }
                    }
                ]
            },
            color: ['#f46694', '#6c8ed8', '#f1b65c', '#e76f69', '#4cc0be', '#5baef5', '#6bb87a'],
            textStyle: {
                color: '#fff',
                fontSize: 24
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '38%'],
                    selectedOffset: 6,
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    data: [
                        {value: arguments[0], name: '女士', selected: true},
                        {value: arguments[1], name: '男士'}
                    ]
                },
                {
                    name: '',
                    type: 'pie',
                    radius: ['46%', '62%'],

                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {value: arguments[2], name: '18~25岁'},
                        {value: arguments[3], name: '25~35岁'},
                        {value: arguments[4], name: '35~45岁'},
                        {value: arguments[5], name: '45~60岁'},
                        {value: arguments[6], name: '60岁以上'}
                    ]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChartRight.setOption(optionRight);
    }

    //计算总额
    function computeTotal() {
        var borrow = document.querySelectorAll(".infoCell");
        for (var i = 0; i < borrow.length; i++) {
            borrow[i].querySelector('.cash span').innerText = arguments[i];
        }
    }

    $FW.getJSONP("http://www.gongchangp2p.cn/dataTopics/data.shtml", function(data) {
        //截止日期前一天
        document.querySelector(".infoTimeMobile span").innerText = data.data.date;
        //计算总额
        computeTotal(judgeCash(data.data.total_invest), judgeCash(data.data.total_interest), judgeCash(data.data.total_principal), judgeCash(data.data.total_orderCount));
        //借款用户
        firstPie(data.data.borr_female, data.data.borr_male, data.data.borr_age_level_1, data.data.borr_age_level_2, data.data.borr_age_level_3, data.data.borr_age_level_4, data.data.borr_age_level_5);
        //借款人数
        document.querySelector(".pieTopMobile .userNumber span").innerText = formatPerson(data.data.total_borrUserCount);
        //借款金额
        document.querySelector(".pieTopMobile .userCash span").innerText = judgeCash(data.data.total_invest / data.data.total_borrUserCount);
        //出借用户
        secondPie(data.data.female, data.data.male, data.data.age_level_1, data.data.age_level_2, data.data.age_level_3, data.data.age_level_4, data.data.age_level_5);
        //出借人数
        document.querySelector('.pieBottomMobile .userNumber span').innerText = formatPerson(data.data.total_userCount);
        //出借金额
        document.querySelector('.pieBottomMobile .userCash span').innerText = judgeCash(data.data.total_invest / data.data.total_userCount);
        //待偿金额
        var endurance = document.querySelectorAll(".enduranceCell");
        var len = endurance.length;
        for (var i = 0; i < len; i++) {
            endurance[0].querySelector('.cash span').innerText = judgeCash(data.data.total_principalInvest);
            endurance[1].querySelector('.cash span').innerText = judgeCash(data.data.total_overdueSum);
            endurance[2].querySelector('.cash span').innerText = prevent(data.data.total_overdueSum / data.data.total_invest * 100);
            endurance[3].querySelector('.cash span').innerText = prevent(data.data.total_overdueCount / data.data.total_orderCount * 100);
            endurance[4].querySelector('.cash span').innerText = data.data.total_lendSum
    }
    });

};
