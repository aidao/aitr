import login from './login'
import mywallet from './mywallet'
import mysale from './mysale'
import password from './password'
import userInfo from './userInfo'

const ln = {
  common: {
    Login: '등록',
    transaction: '이체비',
    back: '되돌아간다',
    ok: '제출',
    submit: '제출',
    Enter: '들어간다'
  },
  MembershipGrade: {
    Regular: '보통 회원'
  },
  login: login,
  mywallet: mywallet,
  mysale: mysale,
  password: password,
  userInfo: userInfo
}
export default ln
