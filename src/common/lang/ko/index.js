import login from './login'
import mywallet from './mywallet'
import mysale from './mysale'
import password from './password'
import userInfo from './userInfo'
import VIPCenter from './vipCenter'
import org from './org'

const ln = {
  common: {
    Login: '등록',
    transaction: '이체비',
    back: '되돌아간다',
    ok: '제출',
    submit: '제출',
    cancel: '취소',
    confirm: '제출',
    Enter: '들어간다',
    query: '알아',
    search: '검색',
    by: '보다',
    MemberAccount: '회원 계좌번호',
    ComingSoon: 'Coming soon',
    NoData: 'Temporarily no data'
  },
  errors: {
    safecode: {
      required: 'Security code cannot be empty',
      verifyFailed: 'Security code input error'
    }
  },
  securityCode: {
    title: '안전 코드',
    placeholder: '안전 코드를 기입하세요'
  },
  FootNav: {
    vip: 'VIP전용구역',
    org: '소모구조',
    mysale: '나의 판매',
    tradecenter: '교역하러 간다',
    mywallet: '내 지갑'
  },
  MembershipGrade: {
    Regular: '보통 회원'
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
