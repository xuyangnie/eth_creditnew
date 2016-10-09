contract DebitCredit {
    
  address public debit;//借方
  address public credit;//资方

  uint public contractAmount;//合约金额
  uint public paidAmount;//已还金额
  uint public repayDate;//还款日期

  enum State {init,amount_locked,loan_fail,repay_on,repay_fail,repay_success}
  
  State public state;
  
  modifier inState(State _state){if(state != _state) throw; _ }
  
  modifier onlyDebit(){if(msg.sender != debit) throw; _ }
  
  modifier onlyCredit(){if(msg.sender != credit) throw; _ }
   
  function DebitCredit(address _debit,uint _repayDate) {
    credit = msg.sender;
    debit = _debit;
    contractAmount = msg.value;
    repayDate = _repayDate;
    state = State.init;
  }
  
  //放款
  function loan() onlyCredit inState(State.init) {
    state = State.amount_locked;
    if(!debit.send(contractAmount)){
        state = State.loan_fail;
        throw;
    }else{
       state = State.repay_on;
    }
  }
  
  //还款
  function repay() onlyDebit inState(State.repay_on) {
     if(paidAmount==contractAmount){
         state = State.repay_success;  
         throw;
     }
     state = State.amount_locked;
     if(!credit.send(msg.value)){
        state = State.repay_fail;
        throw;
     }else{
        paidAmount += msg.value; 
        if(paidAmount==contractAmount){
         state = State.repay_success; 
        }else{
          state = State.repay_on;  
        }
     }
  }
   
  //查询未还金额
  function qryBal() onlyDebit returns (uint retVal)  {
      return contractAmount-paidAmount;
  }
  
}

