import login from './login'
import mywallet from './mywallet'
import mysale from './mysale'
import password from './password'
import userInfo from './userInfo'
import VIPCenter from './vipCenter'

const ln = {
  common: {
    Login: '登录',
    transaction: '转账',
    back: '返回',
    ok: '确定',
    submit: '确定',
    cancel: '取消',
    Enter: '进入'
  },
  MembershipGrade: {
    Regular: '普通会员'
  },
  login: login,
  mywallet: mywallet,
  mysale: mysale,
  password: password,
  vip: VIPCenter,
  userInfo: userInfo
}
export default ln
