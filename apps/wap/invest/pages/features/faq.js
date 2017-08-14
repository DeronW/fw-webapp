import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { Header } from '../../components'
import styles from '../../css/features/faq.css'


const QUESTIONS = [
    {
        group_title: '新手上路',
        group_items: [{
            topic_title: '注册登录',
            icon: 'zcdl',
            topic_items: [{
                q: '注册需要您提供哪些相关材料？',
                a: '提供个人常用手机号，短信验证码提交通过后，设置用户名、密码即可注册。'
            }, {
                q: '身份认证可以修改吗？',
                a: '一个账号只可身份认证一次，一旦认证成功将无法修改。'
            }, {
                q: '身份认证总是失败，该如何解决？',
                a: '请检查身份证号和真实姓名是否匹配，输入是否正确。如输入正确但无法认证成功，请拨打客服电话 <a href="tel:400-0322-988" >400-0322-988</a> ，客服人员会审核您的身份信息后协助您完成身份认证操作。'
            }]
        }, {
            topic_title: '身份认证流程',
            icon: 'sfrz',
            topic_items: [{
                q: '身份认证需要您提供哪些相关材料？',
                a: '需提供您的有效身份证号，及真实姓名。提交后系统会进行核实，核实无误即可认证成功。'
            }, {
                q: '身份认证可以修改吗？',
                a: '一个账号只可身份认证一次，一旦认证成功将无法修改。'
            }, {
                q: '身份认证总是失败，该如何解决？',
                a: '请检查身份证号和真实姓名是否匹配，输入是否正确。如输入正确但无法认证成功，请拨打客服电话<a href="tel:400-0322-988" >400-0322-988</a>，客服人员会审核您的身份信息后协助您完成身份认证操作。'
            }]
        }, {
            topic_title: '绑定银行卡',
            icon: 'bdyhk',
            topic_items: [{
                q: '银行卡绑定过程需要提供哪些信息？',
                a: '需要提供身份认证人的有效银行卡信息，包括发卡行、银行卡号。'
            }, {
                q: '绑定银行卡失败，该如何解决？',
                a: '目前徽商银行只支持储蓄卡绑定，暂不支持信用卡和存折绑定。如储蓄卡号、发卡行、开户姓名均正确但无法绑定成功，请拨打客服电话400-0322-988，客服人员会协助您完成绑定操作。'
            }, {
                q: '可以修改开户行名称吗？',
                a: '目前只支持绑定一张银行卡，若账户中无余额、无待收时，可在“个人中心”-“我的信息”-“绑定银行卡”下进行修改；若账户中有余额和待收时，则不可以进行银行卡开户支行的修改。'
            }]
        }, {
            topic_title: '还款方式及利息计算',
            icon: 'hkfs',
            topic_items: [{
                q: '按月等额本息还款',
                a: '项目期间将出借本金及利息总额相加，然后平均分摊到还款期限的每个月中，每个月的还款额是固定的，但每月还款额中的本金比重逐月递增、利息比重逐月递减。'
            }, {
                q: '利息如何让计算？',
                a: '每月还款额=[借款本金×月利率×（1+月利率）^还款月数]÷[（1+月利率）^还款月数－1]<br/> 注：^次方'
            }, {
                q: '案例：',
                a: '某“消费贷”项目期限24个月，预期年化收益率13.5%，出借金额为30000元，那么：<br/>每月回款本息=1433.31元'
            }, {
                q: '（按天）一次性还本付息',
                a: '按项目实际天数计算利息，项目到期日一次性将出借的本金和利息总额偿还给出借客户。'
            }, {
                q: '收益如何计算？',
                a: '项目总期限T天，项目年化收益率R，客户出借本金M：<br/> 到期回款本金：M；<br/> 到期回款利息：M*R*T/360'
            }, {
                q: '案例：',
                a: '某“易赚盈”项目期限30天，预期年化收益率12%，客户出借本金1,000,000元，那么：<br/> 到期回款本金=1,000,000元；<br/> 到期回款利息=1,000,000*12%*30/360=10000元；<br/> （注：具体情况按照每个项目的详细信息进行具体分析，最终解释权归工场微金所有。） '
            }, {
                q: '按月付息到期还本',
                a: '项目期间每月偿还一次利息，到期日一次性偿还本金和最后一期利息。'
            }, {
                q: '收益如何计算？',
                a: '项目总期限T个月，项目年化收益率R，客户出借本金M：<br/> 到期回款本金：M；<br/> 每月（末）回款利息：M*R/12 元； '
            }, {
                q: '案例：',
                a: '某“利随享”项目期限12个月，预期年化收益率14%，客户出借本金=1,000,000元，那么：<br/> 到期回款本金：1,000,000元；<br/> 每月回款利息：1,000,000*14%/12=11666.67元；<br/> （注：具体情况按照每个项目的详细信息进行具体分析，最终解释权归工场微金所有。） '
            }]
        }]
    }, {
        group_title: '我要出借',
        group_items: [{
            topic_title: '出借流程',
            icon: 'cjlc',
            topic_items: [{
                q: '出借前需要做哪些必要操作？',
                a: '出借前应完成以下操作内容：<br/> 1.注册账号并登录<br/> 2.开通徽商存管账户<br/> 3.设置交易密码<br/> 4.充值 '
            }, {
                q: '出借金额是否有限制？',
                a: '1.单笔出借金额不得低于标的限制的最低起投额<br/> 2.单笔出借金额不得大于标的剩余的可投金额<br/> 3.单笔出借导致标的所剩余的可投金额低于起投额时，不可出借，请尽量输入可直接满标的金额作为最后一笔出借。 '
            }, {
                q: '出借时会有附加费用产生吗？',
                a: '出借人在工场微金完成的每一笔出借，平台都不会收取任何附加费用。'
            }, {
                q: '出借完后该如何查看我的回款状态？',
                a: '请到“个人中心”-“我的出借”中查看出借记录以及回款计划。'
            }]
        }, {
            topic_title: '资金管理',
            icon: 'zjgl',
            topic_items: [{
                q: '通过网银支付是否安全？',
                a: '用户充值、出借和提现操作均通过徽商银行存管系统的网上支付服务完成，保障交易安全，您可放心交易。'
            }, {
                q: '充值应注意的问题',
                a: '1）请注意您的银行卡充值限额，以免造成充值失败；<br>2）如果充值金额没有及时到账，请拨打客服电话400-0322-988，客服人员会协助你解决；<br>3）对充值后无出借的提现，收取0.4%的手续费。'
            }, {
                q: '充值有时间限制吗？',
                a: '没有时间限制，用户7*24小时均可通过徽商银行资金存管系统充值。'
            }, {
                q: '如何充值？',
                a: '您还可以通过在线网银转账等多种形式，直接充值到您的徽商银行存管电子专用账户。'
            }, {
                q: '港澳台等特殊用户怎么充值？',
                a: '特殊用户是指大陆境外的港澳台用户，以及因户口动迁等原因导致无法线上进行身份验证开户的用户。徽商银行资金存管上线前已注册并有资金记录行为的特殊用户可以正常进行充值、出借、提现，未注册的新特殊用户，抱歉暂不能为您提供服务。'
            }, {
                q: '用户提现条件是什么? 有什么限制?',
                a: '已注册、已开户（已绑卡）、已设置交易密码的用户，可以进行提现。个人用户提现和机构提现，单日最高提现次数为10次，总提现金额最高不超过1000万，单笔最高提现金额最高不超过1000万元。单月笔数和总金额不做限制。'
            }, {
                q: '用户提现方式有哪些？',
                a: '根据提现金额和到账时间，提现分为实时提现和大额提现两种方式。实时提现：10万及以下的提现，工作日及节假日7*24小时实时到账。大额提现：10万及以上的大额提现，在工作日5*8小时（9:00-17:00）到账，最快30分钟内到账，实际到账时间以发卡行为准。大额提现需填写开户支行。'
            }, {
                q: '提现收手续费吗？怎么收取？',
                a: '（1）用户在工场微金有过一笔出借后，提现免收手续费；<br>（2）充值后无出借的提现，收取0.4%的手续费；<br>（3）手续费在进行提现交易时实时收取。'
            }]
        }, {
            topic_title: '债权转让',
            icon: 'zqzr',
            topic_items: [{
                q: '什么是债权转让？',
                a: '债权转让是指，产品持有人（转让方）将自己持有的全部出借项目，通过项目转让方式，将债权转让给其他人（受让方），并与受让方签订转让协议，收回本金及利息的操作。当您急需用钱或资金流转需要时，可以发起债权转让，快速收回资金。'
            }, {
                q: '债权转让的规则',
                a: '1. 仅一次性还本付息、按天一次性还本付息、按月付息到期还本的项目（包括已认购的转让项目）持有满30天后，允许全部转让；<br/>2、单笔微金项目支持一对多转让，并可多次转让；单笔尊享项目仅支持一对一转让，且仅能转让2次；<br/>3. 尊享项目每次转让必须全部转出，不支持部分转出，微金项目发布转让后，若在有效期内未全部卖出，剩余部分可再次申请转让；<br/>4. 原标出借本金不足1000元时，不允许转让；<br/>5. 预期还款日前7日（含还款日当日）不允许转让；<br/>6. 转让方通过折让金设置转让价格，折让金越高，受让方预期年化利率越高。折让金定价区间：0≤折 让金≤转让方填写的转让本金的20%；<br/>7. 转让手续费为原标出借本金的0.5%；'
            }, {
                q: '如何债权转让？',
                a: '首先从平台账户“我的出借”列表中选择需要转出的项目，点击“出借的项目-XX项目”右下方蓝色的“项目转让”选项，链接到该笔项目的转让信息填报页面，根据页面提示发起转让申请。'
            }, {
                q: '债权转让收益计算？',
                a: '以原标还款方式为“一次性还本付息”模式的项目转让标为例：<br/> 假设：<br/> 1.    项目总期限＝T天，预期年化收益率=R，客户出借本金M元；<br/> 2.	客户在持有原标的第D天（已持有期限=D天）在平台发起转让：<br/><br/> 分析：原标剩余期限=T-D天，<br/><br/> 项目交易时收取转让方手续费C元；<br/> 转让方实收金额=转让时原标剩余价值-C；<br/> <br/> 到期日受让方回款本金=M元；<br/> 到期日受让方回款利息=M*R*T/360 元；'
            }, {
                q: '案例：',
                a: '1.“易车享”XX项目期限180天，预期年化收益率13%，客户出借本金1,000,000元；<br/> 2. 客户在持有项目30天时发起转让申请，原标剩余期限150天；<br/> <br/> 分析：转让时原标剩余价值=1,010,142.71元；<br/> 转让方手续费=10,000元；<br/> 转让方实收金额=1010142.71-10000=1,000,142.71元；<br/> <br/> 到期时受让方回款本金=1,000,000元；<br/> 到期时受让方回款利息=1,000,000*13%*180/360=65000元<br/> （注：具体情况按照每个项目的详细信息进行具体分析，最终解释权归工场微金所有。） '
            }]
        }, {
            topic_title: '批量出借',
            icon: 'plcj',
            topic_items: [{
                q: '什么是“批量出借”？',
                a: '“批量出借”是工场微金为了方便用户出借小额项目推出的新功能，通过使用该功能，用户可以一次性出借远大于单个项目可投金额的资金。批量出借后，系统会自动按照项目列表的默认顺序依次完成投标，直至完成所有出借为止。'
            }, {
                q: '批量出借能否使用工豆？',
                a: '使用“批量出借”功能时会默认选择使用工豆，且工豆优先投标'
            }, {
                q: '批量出借能否使用优惠券？',
                a: '使用“批量出借”功能不可以使用优惠券，如果想使用优惠券，只能选择集合中的单个项目进行出借。'
            }, {
                q: '批量出借后还用逐一输入交易密码吗？',
                a: '用户完成授权后，使用“批量出借”功能进行投标无需再次输入交易密码，即可完成出借。'
            }, {
                q: '新用户首投时能否正常享受新手福利？',
                a: '新用户首次出借时使用“批量出借”可能无法享受到新手政策活动的最优奖励，建议仔细阅读新手政策，并选择单个项目出借'
            }, {
                q: '批量出借怎么开通？',
                a: '登录后，未开通徽商账户、未升级徽商账户、未设置交易密码的用户，不允许使用批量出借功能。用户应先完成开户、升级和设置密码后开通批量出借功能的授权→设置最高限额→授权完成。'
            }, {
                q: '使用批量出借后能否债权转让？',
                a: '债权转让只针对单个项目进行转让。如果系统自动匹配的单个项目出借金额不足1000元，则不能进行债权转让。'
            }]
        }]
    }, {
        group_title: '徽商银行资金存管',
        group_items: [{
            topic_title: '徽商银行资金存管',
            icon: 'hsyh',
            topic_items: [{
                q: '什么是徽商银行资金存管？',
                a: '用户在工场微金的交易资金通道，将由第三方支付托管账户全面迁移至徽商银行资金存管系统。接入徽商银行存管后，借款人、出借人将在徽商银行开设独立的银行电子账户，交易资金均根据用户指令通过该电子银行账户划拨，从源头上杜绝资金池以及资金占用风险的发生。徽商银行独立电子账户在借款人、平台、出借人之间建立安全屏障，实现出借者资金和平台自有资金的完全隔离。'
            }, {
                q: '老用户怎么升级徽商银行存管？',
                a: '1）点击“个人中心”-“开通银行存管账户”滚动公告<br/> 2）开通徽商账户<br/> 3）设置交易密码<br> 4）完成升级 '
            }]
        }, {
            topic_title: '余额收益',
            icon: 'yesy',
            topic_items: [{
                q: '什么是余额收益？',
                a: '余额收益是用户徽商存管电子账户的可用余额所产生的利息收益，该收益按照徽商银行定期存款利率或活期存管利率“靠档计息”规则，当资金变动日终时进行计算，用户可在个人中心查询。'
            }, {
                q: '如何计算存款利息？',
                a: '徽商直销银行自动靠档计息业务开通了三个月、六个月、一年、两年、三年、五年6个档位。靠档计息账户在进行提前支取时，存款利率按照满足存期要求的最大靠档利率计算。<br>举例：<br>支取靠档计息存款资金时，存期为7个月，则结息靠入整存整取六个月的档位，存款利息=靠档账户支取金额×7个月×六个月定存利率。<br>支取靠档计息存款资金时，存期为50天，则结息无法靠档，根据活期利率结息，存款利息=靠档账户支取金额×50天×活期利率。'
            }]
        }]
    }, {
        group_title: '常见问题',
        group_items: [{
            topic_title: '会员等级',
            icon: 'hydj',
            topic_items: [{
                q: '什么是会员等级',
                a: '会员等级是工场微金为广大用户提供的高阶服务，共有5个等级，每一等级都有专属的特权奖励。'
            }, {
                q: '怎么查看我的会员等级',
                a: '在个人中心，点击头像即可查看当前会员等级。'
            }, {
                q: '什么是贡献值',
                a: '贡献值是衡量会员等级的标准，在会员等级页面，用户可点击“查看升级攻略 ”了解贡献值的详情。'
            }]
        }, {
            topic_title: '工分',
            icon: 'gf',
            topic_items: [{
                q: '什么是工分',
                a: '工分是平台对用户的回馈奖励，可用于豆哥商城兑换各种商品以及参与相关活动。'
            }, {
                q: '如何获取奖励工分',
                a: '投标、签到可获得相应工分奖励，投债权转让标、机构专区标除外。'
            }, {
                q: '工分用途',
                a: '工分可用于兑换豆哥商城商品；用于参与指定活动。'
            }]
        }, {
            topic_title: '返现券',
            icon: 'fanxq',
            topic_items: [{
                q: '什么是返现券？',
                a: '返现券是平台发放给用户的福利，投标时可勾选使用'
            }, {
                q: '返现券如何使用？',
                a: '投标时可勾选使用，投标成功后，以现金方式返还到您的平台账户中，到账即可提现。'
            }, {
                q: '返现券会过期吗？',
                a: '返现券有有效期，请在有效期内投标使用。'
            }]
        }, {
            topic_title: '返息券',
            icon: 'fxq',
            topic_items: [{
                q: '什么是返息券？',
                a: '返息券是平台新推出的一种活动优惠券，可用于增加工友投标收益。'
            }, {
                q: '返息券如何使用？',
                a: '投标时可勾选使用，投标成功后，以工豆形式返到平台工豆账户内，工豆可投标使用，工豆有效期30天。投标时，返现券与返息券可以同时勾选，叠加使用。投标按月/季等额还款项目，最终返息获得工豆需要乘以0.56。0.56为借款方占用投标方的资金使用率。'
            }, {
                q: '返息券会过期吗？',
                a: '返息券有有效期，请在有效期内投标使用'
            }]
        }, {
            topic_title: '工豆',
            icon: 'gd',
            topic_items: [{
                q: '什么是工豆？',
                a: '工豆是平台发放给用户的虚拟货币，不可提现，投标时可抵现金使用。'
            },
            {
                q: '如何获取工豆？',
                a: '活动期间投标可得。'
            },
            {
                q: '工豆该如何使用？',
                a: '不可提现，投标时可抵现金使用。'
            },
            {
                q: '工豆会过期吗？',
                a: '工豆有有效期，请在有效期内投标使用。'
            }]
        }, {
            topic_title: '红包',
            icon: 'hb',
            topic_items: [{
                q: '什么是红包？',
                a: '红包是平台回馈新老工友的一种福利形式，包括工豆红包和返现券红包。红包须通过微信进行分享及领取。工豆红包领取后，红包金额自动转化为带有效期的等价工豆，仅可在投标时使用，不可提现；返现券红包领取后，红包金额自动转化为带有最小投标金额和可投标期限等限制条件的等价返现券，返现券可在投标时使用，投标成功后，获得相应的返现现金。'
            },
            {
                q: '如何获取红包？',
                a: '1.活动期间投标可得。<br />2.签到有几率获得。'
            },
            {
                q: '如何抢红包？',
                a: '可在微信中，从好友发给您的链接，朋友圈好友分享的链接中进行抢红包操作，抢到的红包金额会存到您输入的手机号所对应的账户中，投标即可使用。'
            },
            {
                q: '如何发红包给好友？',
                a: '可到“个人中心”-“我的红包”-“送出的红包”中点击发红包分享给微信好友或分享到朋友圈。'
            },
            {
                q: '红包会过期吗？',
                a: '抢到的红包有有效期，请在有效期内投标使用。'
            }
            ]
        }, {
            topic_title: '违约金',
            icon: 'wyj',
            topic_items: [{
                q: '什么是违约金？',
                a: '违约金是正常还款下，除应还本息之外，补充分配给出借人的金额。'
            },
            {
                q: '违约金分类',
                a: '违约金分为逾期违约金和提前还款违约金'
            },
            {
                q: '何时分配逾期违约金？',
                a: '由第三方担保机构提供本金利息保证的项目，逾期时首先由担保机构及时代偿，担保机构代偿失效时，将会产生逾期违约金。'
            },
            {
                q: '何时分配提前还款违约金？',
                a: '提前还款是每个借款人可享的权利，为保障出借人利益，借款人提前还款后，需缴纳提前还款违约金，由工场微金分配给出借人作为出借损失补偿。'
            }]
        }]
    }, {
        group_title: '了解项目',
        group_items: [
            {
                topic_title: '消费贷',
                icon: 'xfd',
                topic_items: [{
                    q: '什么是消费贷？',
                    a: '消费贷系列项目一款面向广大消费群体提供消费分期金融服务的产品。项目多为网信奇点、首山资产等资产提供方推荐，借款人资金多用于满足个人消费需求。项目优点：还款方式为按月等额本息还款；借款期限为3个月-36个月；预期年化利率高；起投金额仅100元。'
                }, {
                    q: '如果借款人无力还款，如何保障出借人权益？',
                    a: '如果借款人未按期还款，由担保机构履行担保责任代为清偿借款,或由资产回购方回购债权人持有债权，以保障出借人权益。担保机构或资产收购方负责借款追偿，催收工作。'
                }, {
                    q: ' 消费贷项目线上都需要签哪些合同？',
                    a: '消费贷项目一般为个人直接融资项目，签订的合同及签署主体如下(仅供参考，以实际签署合同为准)：<br/>（1） 借款合同：出借人、借款人、平台方<br/>（2） 委托担保合同：借款人、担保公司<br/>（3） 保证合同：出借人、担保公司<br/>（4） 借款人咨询服务协议：借款人、咨询方、平台方<br/>（5） 出借人咨询服务协议：出借人、咨询方、平台方'
                }]
            }
        ]
    }
];


@CSSModules(styles, {
    allowMultiple: true,
    errorWhenNotFound: false
})
class List extends React.Component {

    render() {

        let topic = (i, index) => {
            return <a styleName="topic" key={index} onClick={() => {
                this.props.history.push(`/features/faq/${i.icon}`)
            }}>
                <div styleName={`topic-icon icon-${i.icon}`}></div>
                {i.topic_title}
            </a>
        }

        let group = (data, index) => {
            return <div styleName="group" key={index}>
                <div styleName="group-title">{data.group_title}</div>
                <div styleName="topics">
                    {data.group_items.map(topic)}
                </div>
            </div>
        }

        return <div styleName="bg">
            <Header title="帮助中心" history={this.props.history} />
            {QUESTIONS.map(group)}
        </div>
    }
}


@CSSModules(styles, {
    allowMultiple: true,
    errorWhenNotFound: false
})
class Page extends React.Component {

    constructor(props) {
        super(props)

        let current_topic = {}

        QUESTIONS.forEach(group => {
            group.group_items.forEach(topic => {
                if (topic.icon == props.match.params.kind)
                    current_topic = topic
            })
        })

        this.state = {
            opened: [],
            topic: current_topic
        }
    }

    toggleHandler = (index) => {
        let opened = this.state.opened.slice();
        opened[index] = opened[index] == 'show' ? 'hide' : 'show';
        this.setState({ opened: opened });
    }

    render() {
        let qa = (i, index) => {
            var cn = this.state.opened[index] == 'show' ? 'qa show' : 'qa';

            return <div styleName={cn} key={index}>
                <div styleName="q" onClick={() => this.toggleHandler(index)}>
                    <div styleName="icon-down-arrow"></div>
                    {i.q}
                </div>
                <div styleName="a" dangerouslySetInnerHTML={{ __html: i.a }}></div>
            </div>
        }

        return <div styleName="bg">
            <Header title="帮助中心" history={this.props.history} />
            <div styleName="topic-title">{this.state.topic.topic_title}</div>
            <div styleName="topic-content">
                {this.state.topic.topic_items.map(qa)}
            </div>
        </div>
    }
}

export {
    List, Page
}