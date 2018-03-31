import login from './login'
import mywallet from './mywallet'
import mysale from './mysale'
import password from './password'
import VIPCenter from './vipCenter'
import userInfo from './userInfo'
import org from './org'

const ln = {
  common: {
    Login: 'Login',
    transaction: 'Transfer',
    back: 'Back',
    ok: 'OK',
    submit: 'Submit',
    cancel: 'Cancel',
    Enter: 'Enter',
    query: 'Query',
    search: 'Search',
    by: 'By',
    MemberAccount: 'Member account',
    ComingSoon: 'Coming soon'
  },
  FootNav: {
    vip: 'VIP zone',
    org: 'Organizational structure',
    mysale: 'My sales',
    tradecenter: 'ransaction',
    mywallet: 'My wallet'
  },
  MembershipGrade: {
    Regular: 'Regular membership'
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
