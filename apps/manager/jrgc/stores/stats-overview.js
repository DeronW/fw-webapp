import { extendObservable, computed } from 'mobx'


export default class StatsOverview {

    constructor(Get) {
        this.get = Get;

        this.data = { };
        extendObservable(this.data, {
            statsDurationType: '1',
            graph: {
                '1': { },
                '2': { },
                '3': { },
                '4': { }
            },
            investor: {
                '1': { },
                '2': { },
                '3': { },
                '4': { }
            }
        })
    }

    @computed get graphFormatted() {
        const { statsDurationType, graph } = this.data,
            raw = graph[statsDurationType];
        const formatted = {
            date: raw.date === undefined ? [] : raw.date.slice(),
            value: raw.value === undefined ? [] : raw.value.slice(),
            valueAnnual: raw.valueAnnual === undefined ? [] : raw.valueAnnual.slice()
        };
        return formatted
    }

    @computed get investorFormatted() {
        const { statsDurationType, investor } = this.data,
            raw = investor[statsDurationType];
        const formatted = {
            invested: raw.invested === undefined ? '' : raw.invested,
            registered: raw.registered === undefined ? '' : raw.registered,
            investedFirstTime: raw.investedFirstTime === undefined ? '' : raw.investedFirstTime,
            investAmount: raw.investAmount === undefined ? '' : raw.investAmount,
            investAmountAnnual: raw.investAmountAnnual === undefined ? '' : raw.investAmountAnnual,
        }
        return formatted
    }

    setStatsDuration = tabNo => this.data.statsDurationType = tabNo

    fetchTabData = tabNo => {
        this.fetchGraphData(tabNo);
        this.fetchInvestorData(tabNo);
    }

    fetchGraphData = tabNo => {
        this.get('/api/finManager/achievement/v2/stat.shtml', {
            type: tabNo,
            userId: '543'
        }).then(({ result }) => {
            this.data.graph[tabNo] = {
                date: result.timeDimension,
                value: result.accInvestAmtList,
                valueAnnual: result.annualInvestAmtList
            };
        })
    }

    fetchInvestorData = tabNo => {
        this.get('/api/finManager/achievement/v2/investInfo.shtml', {
            type: tabNo,
            userId: '543'
        }).then(({ result }) => {
            this.data.investor[tabNo] = {
                invested: result.investCustCount,
                registered: result.regCustCount,
                investedFirstTime: result.firstInvestCustCount,
                investAmount: result.totalInvestAmt,
                investAmountAnnual: result.totalYearAmt
            };
        })
    }

}