let startArr=[];
const QUESTIONS = [{
    q: 'Q1：您的年龄是？',
    seq: 0,
    name:"age",
    options: [{
        a: 'A.18-30岁',
        score: 2
    }, {
        a: 'B.31-50岁',
        score: 8
    }, {
        a: 'C.51-64岁',
        score: 6
    }, {
        a: 'D.高于64岁',
        score: 1
    }, {
        a: 'E.18岁以下',
        score: 0
    }]
}, {
    q: 'Q2：您的家庭年收入为（折合人民币）？',
    seq: 1,
    name:"income",
    options: [{
        a: 'A.5万元以下',
        score: 0
    }, {
        a: 'B.5-20万元',
        score: 2
    }, {
        a: 'C.20-50万元',
        score: 6
    }, {
        a: 'D.50-100万元',
        score: 8
    }, {
        a: 'E.100万元以上',
        score: 10
    }]
}, {
    q: 'Q3：一般情况下，在您每年的家庭收入中，可用于金融投资（储蓄存款的比例为）？',
    seq: 2,
    name:"can",
    options: [{
        a: 'A.小于10%',
        score: 0
    }, {
        a: 'B.5-20万元',
        score: 2
    }, {
        a: 'C.20-50万元',
        score: 6
    }, {
        a: 'D.50-100万元',
        score: 8
    }, {
        a: 'E.100万元以上',
        score: 10
    }]
}, {
    q: 'Q4：以下哪项最能说明您的投资经验？',
    seq: 3,
    name:"experience",
    options: [{
        a: 'A.除存款、国债外，我几乎不投资其他金融产品',
        score: 0
    }, {
        a: 'B.大部分投资于存款、国债等，较少投资于股票、基金等风险产品',
        score: 2
    }, {
        a: 'C.资产均衡地分布于存款、国债、银行理财产品、信托产品、股票、基金等',
        score: 6
    }, {
        a: 'D.大部分投资于股票、基金、外汇等高风险产品，较少投资于存款、国债',
        score: 10
    }]
}, {
    q: 'Q5：您有多少年投资股票、基金、外汇、金融衍生产品等风险投资品的经验？',
    seq: 4,
    name:"experiencePeriod",
    options: [{
        a: 'A.没有经验',
        score: 0
    }, {
        a: 'B.少于两年',
        score: 2
    }, {
        a: 'C.2-5年',
        score: 6
    }, {
        a: 'D.5-8年',
        score: 8
    }, {
        a: 'E.8年以上',
        score: 10
    }]
}, {
    q: 'Q6：以下哪项描述最符合您的投资态度？',
    seq: 5,
    name:"attitude",
    options: [{
        a: 'A.厌恶风险，不希望本金损失，希望获得稳定回报',
        score: 0
    }, {
        a: 'B.保守投资，不希望本金损失，愿意承担一定幅度的收益波动',
        score: 4
    }, {
        a: 'C.寻求资金的较高收益和成长性，愿意为此承担有限本金损失',
        score: 8
    }, {
        a: 'D.希望赚取高回报，能接受为期较长期间的负面波动，包括本金损失',
        score: 10
    }]
}, {
    q: 'Q7：您计划的投资期限是多久？',
    seq: 6,
    name:"investPeriod",
    options: [{
        a: 'A.1年以下，我可能会随时动用投资基金，对其流动性要求比较高',
        score: 4
    }, {
        a: 'B.1-3年，为获得满意的收益，我短期内不会动用投资资金',
        score: 6
    }, {
        a: 'C.3-5年，我会在相对较长的一段时间内进行投资，对流动性要求较低',
        score: 8
    }, {
        a: 'D.5年以上，为达到理财目标，我会持续的进行投资',
        score: 10
    }]
}, {
    q: 'Q8：您的投资目的与期望值是？',
    seq: 7,
    name:"hope",
    options: [{
        a: 'A.资产保值，与银行同期存款利率大体相同',
        score: 2
    }, {
        a: 'B.资产稳健增长，略高于银行定期存款利率',
        score: 6
    }, {
        a: 'C.资产迅速增长，远超银行定期存款利率',
        score: 10
    }]
}, {
    q: 'Q9：您对期限为半年的产品，投资风险适应度是？',
    seq: 8,
    name:"riskAjust",
    options: [{
        a: 'A.本金无损失，收益达到定期存款收益',
        score: 0
    }, {
        a: 'B.在本金安全或者有较大保障的情况下，可以承受收益适当的波动，以便有可能获得大于同期存款收益',
        score: 4
    }, {
        a: 'C.在本金损失可能性极低的情况下，愿意接受投资收益，以便获得大于同期存款收益',
        score: 6
    }, {
        a: 'D.愿意承担一定风险，以寻求一定的资金收益和成长性',
        score: 10
    }, {
        a: 'E.为获得一定投资回报，愿意承担投资产品市值较大波动，甚至本金损失',
        score: 15
    }]
}, {
    q: 'Q10：您投资产品的期限超过一年后，出现何种程度的波动，您会呈现明显的焦虑？',
    seq: 9,
    name:"anxious",
    options: [{
        a: 'A.本金无损失，但收益未达预期',
        score: 0
    }, {
        a: 'B.出现轻微本金损失',
        score: 4
    }, {
        a: 'C.本金10%以内的损失',
        score: 6
    }, {
        a: 'D.本金20%-50%的损失',
        score: 10
    }, {
        a: 'E.本金50%以上的损失',
        score: 15
    }]
}];
if(startArr.length==0){
    QUESTIONS.map((value,index)=>{
        let json={};
        json[value.name]=-1;
        startArr.push(json);
    });
}