const ln = {
  mywallet: 'My wallet',
  coinShouYi: 'Earnings currency',
  coinZhuCe: 'Registered currency',
  coinChongGou: 'Refactoring currency',
  coinZhongChou: 'Crowdfunding currency',
  coinChaiFen: 'Split currency',
  coinXiaoFei: 'Consumption currency',
  balance: 'Balance',
  ReceivingMemberNumber: 'Receiving member number',
  NumberOfPointsTransferredOut: 'Number of points transferred out',
  placeholder: {
    TransferTo: 'Please fill in the receiving member number',
    TransferAmount: 'Please fill in the number of points transferred out'
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
