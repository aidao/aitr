const ln = {
  mywallet: '내 지갑',
  coinShouYi: '수입폐 ',
  coinZhuCe: 'Registered currency',
  coinChongGou: '중구폐',
  coinZhongChou: '중주폐',
  coinChaiFen: '분할폐',
  coinXiaoFei: '소비폐',
  balance: '잔액',
  ReceivingMemberNumber: '회원접수번호',
  NumberOfPointsTransferredOut: '적분 전출 수량',
  placeholder: {
    TransferTo: '회원접수번호를 기입하세요',
    TransferAmount: '적분 전출 수량을 기입하세요'
  },
  transfer: {
    errors: {
      'NoReceiveAccount': 'Receive member account does not exist',
      'NoReferAccount': 'The account has no recommended relationship',
      'ReceiveAccountRequired': 'The receiving member cannot be empty',
      'pointsOut': {
        required: 'The number of transfer points cannot be empty',
        positiveInt: 'You can only get positive integers'
      }
    }
  }
}

export default ln
