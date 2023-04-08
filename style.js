'use Strict';
//Account Details
const account1={
    name:'Prakash Singh',
    movements:[1000,2000,-500,1500,-1000,5000,-3000,1000],
    interestRate:1.2,
    pin:1111,
    movementsDate:[ '2023-01-01T13:15:33.035Z',
    '2023-01-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-06-25T18:49:59.371Z',
    '2022-07-26T12:01:20.894Z',]
};
const account2={
    name:'Deepak Rana',
    movements:[4000,1000,-1500,1500,-500,2000,3000,-1000],
    interestRate:1.5,
    pin:2222,
    movementsDate:[ '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',]
};
const account3={
    name:'Rohit Rauthan',
    movements:[6000,-2000,2500,-1500,1000,5000,-3000,-1000],
    interestRate:1.3,
    pin:3333,
    movementsDate:[ '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',]
};
const account4={
    name:'Rituraj Choudhary',
    movements:[2000,2000,600,1500,2000,4000,3000,1000],
    interestRate:1.2,
    pin:4444,
    movementsDate:[ '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',]
};
const accounts=[account1,account2,account3,account4];
// console.log(accounts);

//Step-1-WORKING WITH LOGIN BUTTON 

const btnLoginUser=document.querySelector('.loginID');
const btnLoginPin=document.querySelector('.loginPass');
const btnLogin=document.querySelector('.btnLogin');
const userInterface=document.querySelector('.mainSection');
const labelWelcome=document.querySelector('.labelWelcome');
const containerMovements=document.querySelector('.movements');
const labelBalance=document.querySelector('.labelBalance');
const labelSumIn=document.querySelector('.labelSumIn');
const labelSumOut=document.querySelector('.labelSumOut');
const labelSumInterest=document.querySelector('.labelInterest');
const labelTransferTo=document.querySelector('.form__input--to');
const labelAmount=document.querySelector('.form__input--amount');
const btnTransfer=document.querySelector('.form__btn--transfer');
const labelLoanRequest=document.querySelector('.form__input--loanAmount');
const loanAmountTransfer=document.querySelector('.form__btn--loanTransfer');
const btnDelete=document.querySelector('.form__btn--transferDelete');
const labelConfirmUsername=document.querySelector('.user');
const labelConfirmPin=document.querySelector('.userPin');
const sortButton=document.querySelector('.btn--sort');
const labelDate=document.querySelector('.date');
const lebelTime=document.querySelector('.summarySecond');





//Working with Movements and displaying it
const displayMovements=function(acc,sort=false){
    containerMovements.innerHTML='';
    const movs=sort?currentAccount.movements.slice().sort((a,b)=>{return a-b}):acc.movements;

movs.forEach(function(mov,i){
    const type=mov>0?'deposit':'withdrawl';
    const date=new Date(acc.movementsDate[i]);
    const day=`${date.getDate()}`.padStart(2,0);
const month=`${date.getMonth()+1}`.padStart(2,0);
const year=`${date.getFullYear()}`.padStart(2,0);
const displayDate=`${day}-${month}-${year}`
    const html=` <div class="movements_Value ${type}">
    <div class="dateSection">
        <p>${i+1} ${type}</p>
        <p class="displayDate">${displayDate}</p>
    </div>
    <div class="deposit_Value">
        <p>${mov}</p>
    </div>
</div>`;
containerMovements.insertAdjacentHTML('afterbegin',html);
})
}

//DISPLAY BALANCE
const displayBalance=function(acc){
acc.balance=acc.movements.reduce((acc,curr)=>acc+curr,0);
labelBalance.textContent=`RS ${acc.balance}`;
}
//DISPLAY SUMMARY
const displaysummary=function(acc){
const balanceIn=acc.movements.filter(mov=>mov>0).reduce((acc,curr)=>acc+curr,0);
labelSumIn.textContent=`RS ${balanceIn}`;
const balanceOut=acc.movements.filter(mov=>mov<0).reduce((acc,curr)=>acc+curr,0);
labelSumOut.textContent=`RS ${Math.abs(balanceOut)}`
const interestIn=acc.movements.filter(mov=>mov>0).map((v)=>(v*acc.interestRate)/100).filter(v=>v>=1).reduce((acc,curr)=>acc+curr,0);
labelSumInterest.textContent=interestIn;
}

//Create username property in all account
const userName=function(accounts){
const x=accounts.forEach(function(acc){
acc.username=acc.name.toLowerCase().split(' ').map(a=>a[0]).join('');
});
return x;
}
userName(accounts);

const updateUI=function(currentAccount){
    displayMovements(currentAccount);
  displayBalance(currentAccount);
   displaysummary(currentAccount);
}




//LOGIN BUTTON 
let currentAccount,timer;

btnLogin.addEventListener('click',function(e){
e.preventDefault();
currentAccount=accounts.find(acc=>acc.username===btnLoginUser.value);
console.log(currentAccount);
if(currentAccount?.pin===Number(btnLoginPin.value)){
  userInterface.style.opacity=100;
 labelWelcome.textContent=`Welcome Back ${currentAccount.name.split(' ')[0]}`
}
btnLoginUser.value=btnLoginPin.value='';

updateUI(currentAccount);
const now =new Date();
const day=`${now.getDate()}`.padStart(2,0);
const month=`${now.getMonth()+1}`.padStart(2,0);
const year=`${now.getFullYear()}`.padStart(2,0);
const hour=`${now.getHours()}`.padStart(2,0);
const min=`${now.getMinutes()}`.padStart(2,0);
labelDate.innerText=`${day}-${month}-${year}-${hour}:${min}`;

//LOG OUT TIME FUNCTION CALL

if(timer)clearInterval(timer);
timer=userTimeCount();
})

//WORKING WITH TRANSFER BUTTON 
btnTransfer.addEventListener('click',function(e){
    e.preventDefault();
    const receiverAcc=accounts.find(acc=>acc.username===labelTransferTo.value);
    const amount=Number(labelAmount.value);
    if(amount>0 &&receiverAcc &&amount<=currentAccount.balance &&receiverAcc?.username!==currentAccount.username){
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);
    }
    labelTransferTo.value=labelAmount.value='';
    currentAccount.movementsDate.push(new Date());
    receiverAcc.movementsDate.push(new Date());


    updateUI(currentAccount);
    
    //Reset Timer in case user logs out between transfer
    clearInterval(timer);
    timer=userTimeCount();
})

//WORKING WITH LOAN REQUEST
loanAmountTransfer.addEventListener('click',function(e){
    e.preventDefault();
    const amount=Number(labelLoanRequest.value);
    if(amount>0&& currentAccount.movements.some(mov=>mov>=amount/10)){
      setTimeout(function(){
        currentAccount.movements.push(amount);
      labelLoanRequest.value='';
    currentAccount.movementsDate.push(new Date());

   updateUI(currentAccount)
      },2500);
        
    };
    //Reset Timer in case user log out in between loan request;
    clearInterval(timer);
    timer=userTimeCount();
    
})

//WORKING WITH CLOSE ACCOUNT 

btnDelete.addEventListener('click',function(e){
    e.preventDefault();
    const user=accounts.find(a=>a.username===labelConfirmUsername.value);
    if(user?.pin===Number(labelConfirmPin.value)){
   const index=accounts.findIndex(acc=>acc.username===currentAccount.username);
   accounts.splice(index,1);
   userInterface.style.opacity=0;
    }
    labelConfirmUsername.value=labelConfirmPin.value=''
})

//Working with sort Method and Sorting values
let sorted=false;
sortButton.addEventListener('click',function(e){
e.preventDefault();
displayMovements(currentAccount,!sorted);
sorted=!sorted;
})

//WORKING WITH TIMER FOR LOG OUT 

const  userTimeCount=function(){

    let time=300;
     const  timer= setInterval(function(){
      const min=String(Math.trunc(time/60)).padStart(2,0);
      const sec=`${time%60}`.padStart(2,0);
  lebelTime.textContent=`${min}:${sec}`;
  
  if(time===0){
      clearInterval(timer);
      userInterface.style.opacity=0;
      labelWelcome.textContent=`Log in to get started`;
  }
  time=time-1;
  },1000);
     console.log(timer);
      return timer;
  }



//working with Timer --SET TIMEOUT AND SET INTERVAL 
// loanAmountTransfer.addEventListener('click',function(e){
//     e.preventDefault();
//     const amount=Number(labelLoanRequest.value);
//     if(amount>0&& currentAccount.movements.some(mov=>mov>=amount/10)){
//       setTimeout(function(){
//         currentAccount.movements.push(amount);
//       labelLoanRequest.value='';
//     currentAccount.movementsDate.push(new Date());

//    updateUI(currentAccount)
//       },2500);
        
//     }
    
// })



//THEORY 

//SET INTERVAL--- task keeps on repeating based on a given time
// setInterval(function(){
//     const now=new Date();
//     const min=now.getMinutes();
//     const hour=now.getHours();
//     const seconds=now.getSeconds();
//     console.log(`${hour}:${min}:${seconds}`);
// },);



//working with Date 
// const now =new Date();
// const day=`${now.getDate()}`.padStart(2,0);
// const month=`${now.getMonth()+1}`.padStart(2,0);
// const year=`${now.getFullYear()}`.padStart(2,0);
// const hour=`${now.getHours()}`.padStart(2,0);
// const min=`${now.getMinutes()}`.padStart(2,0);

// labelDate.innerText=`${day}-${month}-${year}-${hour}:${min}`;














