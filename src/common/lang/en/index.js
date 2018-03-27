import login from './login'
import mywallet from './mywallet'
import mysale from './mysale'
import password from './password'
import VIPCenter from './vipCenter'
import userInfo from './userInfo'

const ln = {
  common: {
    Login: 'Log in',
    transaction: 'Transfer',
    back: 'Back',
    ok: 'OK',
    submit: 'Submit',
    cancel: 'Cancel',
    Enter: 'Enter'
  },
  MembershipGrade: {
    Regular: 'Regular membership'
  },
  login: login,
  mywallet: mywallet,
  mysale: mysale,
  password: password,
  vip: VIPCenter,
  userInfo: userInfo
}
export default ln
