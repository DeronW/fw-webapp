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

    var len = tabs.length;
    for (var i = 0; i < len; i++) {
        tabs[i].onclick = function () {
            for (var j = 0; j < len; j++) {
               if(this == tabs[j]){
                   tabs[j].classList.add("active");
                   parts[j].classList.add("show");
               }else{
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
    reportBtn.onclick = function () {
        gotoHandler("https://m.9888.cn")
    };
    auditBtn1.onclick = function () {
        gotoHandler("https://www.baidu.cn")
    };
    auditBtn2.onclick = function () {
        gotoHandler("https://m.9888.cn/static/wap/fa-xian/index.html")
    };
    auditBtn3.onclick = function () {
        gotoHandler("https://www.weibo.cn")
    };

    var myChartLeft = echarts.init(document.getElementById('main1'));

    optionLeft = {
        title: {
            text: '借款用户',
            subtext: '',
            x: 'center',
            textStyle: {
                color: '#384a62',
                fontSize: 36,
                fontWeight:'normal'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{d}%",
            backgroundColor: 'rgba(55,72,123,0.7)',
            padding: 10,
            textStyle:{
                fontSize:24
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
                    {value: 345, name: '女士', selected: true},
                    {value: 251, name: '男士'}
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
                    {value: 335, name: '18~25岁'},
                    {value: 310, name: '25~35岁'},
                    {value: 234, name: '35~45岁'},
                    {value: 135, name: '45~60岁'},
                    {value: 1048, name: '60岁以上'}
                ]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartLeft.setOption(optionLeft);

    //第二个饼图
    var myChartRight = echarts.init(document.getElementById('main2'));

    // app.title = '嵌套环形图';

    optionRight = {
        title: {
            text: '出借用户',
            subtext: '',
            x: 'center',
            textStyle: {
                color: '#384a62',
                fontSize: 36,
                fontWeight:'normal'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)",
            backgroundColor: 'rgba(55,72,123,0.7)',
            padding: 10
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
                    {value: 345, name: '女士', selected: true},
                    {value: 251, name: '男士'}
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
                    {value: 335, name: '18~25岁'},
                    {value: 310, name: '25~35岁'},
                    {value: 234, name: '35~45岁'},
                    {value: 135, name: '45~60岁'},
                    {value: 1048, name: '60岁以上'}
                ]
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartRight.setOption(optionRight);
};