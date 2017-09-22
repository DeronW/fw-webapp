import React from 'react'
import ReactEcharts from 'echarts-for-react'

class Chart extends React.Component {

    _merge = (target, source) => {
        for (var key in source) {
            if (source[key].constructor === Object) {
                this._merge(target[key], source[key]);
            } else if (source[key].constructor === Array) {
                target[key] = [...source[key]];
            } else {
                target[key] = source[key];
            }
        }
        return target
    }

    _genOptions = () => {
        const defaultOpts = {
            legend: {
                textStyle: {
                    fontSize: 18
                },
                bottom: 0
            },
            tooltip: {
                trigger: 'axis',
                padding: 10,
                textStyle: {
                    fontSize: 20
                }
            },
            xAxis: {
                axisLabel: {
                    fontSize: 16
                }
            },
            yAxis: {
                axisLabel: {
                    fontSize: 16
                },
                nameTextStyle: {
                    padding: [6, 0]
                },
                max: function(value) {
                    return Math.round(value.max + 0.1*(value.max - value.min));
                }
            },
            series: [{
                symbolSize: 9,
                lineStyle: { normal: { color: '#d75063' } }
            }, {
                symbolSize: 9,
                lineStyle: { normal: { color: '#20629f' } }
            }],
            dataZoom: [{
                type: 'inside',
                xAxisIndex: [0],
                filterMode: 'none',
                start: 0,
                end: 100
            }, {
                type: 'inside',
                yAxisIndex: [0],
                filterMode: 'none',
                start: 0,
                end: 100
            }],
            textStyle: {
                fontSize: 18
            }
        };

        const mergedOpts = this._merge(defaultOpts, this.props.option);
        return mergedOpts
    }

    render() {
        return <ReactEcharts style={{ width: "100%", height: "100%" }}
            option={this._genOptions()} />
    }

}

export default Chart