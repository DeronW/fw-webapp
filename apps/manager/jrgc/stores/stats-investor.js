import { observable, extendObservable, computed } from 'mobx'


export default class StatsInvestor {

    constructor(Get) {
        this.get = Get;

        this.SORT_PARAM_DICT = {
            'invested-amount-1': '11',
            'invested-amount-0': '12',
            'invested-amountAnnual-1': '21',
            'invested-amountAnnual-0': '22',
            'invested-balance-1': '31',
            'invested-balance-0': '32',
            'registered-time-1': '41',
            'registered-time-0': '42',
            'investedFirstTime-amount-1': '51',
            'investedFirstTime-amount-0': '52',
            'investedFirstTime-time-1': '61',
            'investedFirstTime-time-0': '62',
            'investedFirstTime-balance-1': '71',
            'investedFirstTime-balance-0': '72'
        }

        this.data = { };
        extendObservable(this.data, {
            investorType: '',
            durationType: '',
            investorRawData: []
        })
    }

    _getSortNo = (sortBy, orderBy) => {
        let { investorType } = this.data,
            sortNo = this.SORT_PARAM_DICT[`${investorType}-${sortBy}-${orderBy}`];

        return sortNo
    }

    initStats = (investorType, durationType) => {
        this.data.investorType = investorType;
        this.data.durationType = durationType;
    }

    fetchInvestorInfo = (sortBy, orderBy, pageNo) => {
        let { durationType, investorRawData } = this.data,
            sortNo = this._getSortNo(sortBy, orderBy);

        if (pageNo === 1) investorRawData.splice(0, investorRawData.length);

        return this.get('/api/finManager/achievement/v2/custList.shtml', {
            orderType: sortNo,
            timeType: durationType,
            pageNo: pageNo,
            pageSize: 10
        }).then(({ pageData }) => {
            const investData = pageData.result,
                totalPage = pageData.pagination.totalPage;

            investorRawData.push(...investData);

            pageNo = (totalPage === 0 || totalPage === pageNo) ? 0 : (pageNo + 1);
            return pageNo;
        })
    }

}