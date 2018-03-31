import login from './login'
import mywallet from './mywallet'
import mysale from './mysale'
import password from './password'
import VIPCenter from './vipCenter'
import userInfo from './userInfo'
import org from './org'

const ln = {
  common: {
    Login: 'ログイン',
    transaction: '振込',
    back: '戻る',
    ok: 'を確認する',
    submit: 'を確認する',
    cancel: '取消',
    Enter: '進む',
    query: 'サーチ',
    search: '検索',
    by: '',
    MemberAccount: '会員',
    ComingSoon: 'Coming soon'
  },
  FootNav: {
    vip: 'VIPエリア',
    org: 'メカニズム',
    mysale: '売り出し',
    tradecenter: 'すぐ取引を行う',
    mywallet: 'ウォレット'
  },
  MembershipGrade: {
    Regular: '一般会員'
  },
  login: login,
  mywallet: mywallet,
  mysale: mysale,
  password: password,
  userInfo: userInfo,
  vip: VIPCenter,
  org: org
}
export default ln
