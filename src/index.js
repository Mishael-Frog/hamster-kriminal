const tap = document.querySelector('#tap');
const wallet = document.querySelector('#wallet');
const lvl = document.querySelector('.lvl-fill');
const hamster = document.querySelector('hamster-skin');
const levelCounter = document.querySelector('#lvl-counter');
const energy = document.querySelector('#energy');

let account = {
    name:'hamster',
    balance:0,
    money_per_hour:0,
    money_per_tap:1,
    level:{
        value:0,
        point:0,
        upgrade_price:100
    },
    energy:1000000

}

const handleTap = (event) => {
    if(account.energy <= 0){
        return;
    }

    tap.classList.add('tap-active');

    let timeout = setTimeout(()=>{
        tap.classList.remove('tap-active');
    },100) 

    account.energy -= 1;
    energy.innerText =  account.energy;
    account.balance += account.money_per_tap;
    wallet.innerText = account.balance.toFixed(0);
    let x = event.clientX;
    let y = event.clientY;
    generateMoneyEffect(x,y);
    updateLevelPoint();
}

const generateMoneyEffect = (x,y) => {
    let money = document.createElement('img');
    money.classList.add('cost');
    money.src = '../assets/coinx23.png';
    money.style.left = `${x}px`;
    money.style.top = `${y}px`;
    tap.append(money);
    let timeout = setTimeout(()=>{
        money.remove()
        clearTimeout(timeout)
    },1000);

}

const updateLevelPoint = () =>{
    if(account.level.point >= account.level.upgrade_price){
        account.level.point = 0;
        account.level.value += 1;
        account.level.upgrade_price += 100;
        account.money_per_tap += 1 + (0.1 * account.level.value);
        levelCounter.innerText = `Level: ${account.level.value} / 10`;
        return;
    }
    account.level.point += 1;
    lvl.style.width = (account.level.point / account.level.upgrade_price) * 100 + '%'
}

function gameLoop(){

    let interval = setInterval(()=>{
        if(account.energy <1000){
            account.energy +=1;
        }else{
            return;
        }
        energy.innerText =account.energy;
    },1000);
}

gameLoop();

tap.addEventListener('click', handleTap)
