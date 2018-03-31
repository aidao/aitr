import login from './login'
import mywallet from './mywallet'
import mysale from './mysale'
import password from './password'
import userInfo from './userInfo'
import VIPCenter from './vipCenter'
import org from './org'

const ln = {
  common: {
    Login: '登录',
    transaction: '转账',
    back: '返回',
    ok: '确定',
    submit: '确定',
    cancel: '取消',
    confirm: '确认',
    Enter: '进入',
    query: '查询',
    search: '搜索',
    by: '按',
    MemberAccount: '会员帐号',
    ComingSoon: '暂未开放',
    NoData: '暂无数据'
  },
  errors: {
    safecode: {
      required: '安全码不能为空',
      verifyFailed: '安全码输入错误'
    },
    email: {
      required: '邮箱不能为空',
      email: '邮箱格式应为 英文/数字+“@”符号+英文/数字+“.”符号+com/cn/net'
    }
  },
  securityCode: {
    title: '输入安全码',
    placeholder: '输入您的安全码'
  },
  FootNav: {
    vip: 'VIP中心',
    org: '组织框架',
    mysale: '我的销售',
    tradecenter: '交易中心',
    mywallet: '我的钱包'
  },
  MembershipGrade: {
    Regular: '普通会员'
  },
  login: login,
  mywallet: mywallet,
  mysale: mysale,
  password: password,
  vip: VIPCenter,
  userInfo: userInfo,
  org: org
}
export default ln
