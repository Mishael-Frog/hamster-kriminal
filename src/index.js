const tap = document.querySelector('#tap');
const wallet = document.querySelector('#wallet');
const lvl = document.querySelector('.lvl-fill');
const hamster = document.querySelector('#hamster-skin');
const levelCounter = document.querySelector('#lvl-counter');
const energy = document.querySelector('#energy');
const exchangeNav = document.querySelector('#footer-exchage');
const mineNav = document.querySelector('#footer-mine');
const marketbtn_list = document.querySelectorAll('.market-card-btn');
const pricecard_list = document.querySelectorAll('.market-card-price');

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

let market = {
    price_for_card:100,
    profit:1
}

marketbtn_list.forEach((value) =>{
    value.addEventListener('click', (event) =>{

        if(account.balance >= market.price_for_card){
            account.balance -= market.price_for_card;
            account.money_per_hour += market.profit;
            market.price_for_card += 100;
            market.profit *= 2
            pricecard_list.forEach((value) => {
                value.innerHTML = `${market.price_for_card}`;
            })
            alert('Карточка успешно куплена!');
        }else{
            alert('Не достаточно средств!');
        }
    })
})

function switchPage(page){
    if(page == 'mine'){
        document.querySelector('.game-body-market').classList.remove('hidden'); //удаляем класс hidden то есть сделать его видимым
        document.querySelector('.game-body-energy').classList.add('hidden'); //добавляем класс hidden то есть сделать его невидимым
        tap.classList.add('hidden') // добавляем класс hidden то есть сделать невидимым
    }else if( page == 'market'){
        document.querySelector('.game-body-market').classList.add('hidden'); //добавляем класс hidden то есть сделать его невидимым
        tap.classList.remove('hidden') //удаляем класс hidden то есть сделать его видимым
        document.querySelector('.game-body-energy').classList.remove('hidden'); //удаляем класс hidden то есть сделать его видимым
    }
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
        hamster.src = `../assets/hamster-skin-lvl-${account.level.value}.png`;
        account.money_per_tap += 1 + (0.1 * account.level.value);
        levelCounter.innerText = `Level: ${account.level.value} / 10`;
        return;
    }
    account.level.point += 1;
    lvl.style.width = (account.level.point / account.level.upgrade_price) * 100 + '%'
}

function gameLoop(){

    let interval = setInterval(()=>{
        account.balance += account.money_per_hour;
        wallet.innerHTML = account.balance.toFixed();

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
mineNav.addEventListener('click',()=>{switchPage('mine')});
exchangeNav.addEventListener('click',()=>{switchPage('market')});