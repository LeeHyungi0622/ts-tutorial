import { Card, Player } from './types';

// 영웅 클래스
class Hero implements Card {
  public att: number;
  public hp: number;
  public hero: boolean;
  public field: true;
  public mine: boolean;
  constructor(mine: boolean){
    this.mine = mine;
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
    this.field = true;
  }
}


// 쫄병 클래스
class Sub implements Card {
  public att: number;
  public hp: number;
  public field: boolean = false;
  public mine: boolean;
  public cost: number;
  constructor(mine: boolean){
    this.mine = mine;
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.floor((this.att + this.hp) / 2);
  }
}



interface obj<T> {
  add: (a: T, b: T) => T
}

const a: obj<number> = {
  add: (a, b) => a + b,
}

const b: obj<string> = {
  add: (a, b) => a + b,
}

console.log(a.add(1, 2));
console.log(b.add('a', 'b'));



const opponent: Player = {
  hero: document.getElementById('rival-hero') as HTMLDivElement,
  deck: document.getElementById('rival-deck') as HTMLDivElement,
  field: document.getElementById('rival-cards') as HTMLDivElement,
  cost: document.getElementById('rival-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};



const me: Player = {
  hero: document.getElementById('rival-hero') as HTMLDivElement,
  deck: document.getElementById('rival-deck') as HTMLDivElement,
  field: document.getElementById('rival-cards') as HTMLDivElement,
  cost: document.getElementById('rival-cost') as HTMLDivElement,
  deckData: [],
  heroData: null,
  fieldData: [],
  chosenCard: null,
  chosenCardData: null,
};

const turnButton = document.getElementById('turn-btn') as HTMLButtonElement;
let turn = true; // true면 내 턴, false면 상대 턴

function initiate(){
  [opponent, me].forEach((item) => {
    item.deckData = [];
    item.heroData = null;
    item.fieldData = [];
    item.chosenCard = null;
    item.chosenCardData = null;
  });
  // 객체를 생성할때 개별인자로 직접 전달하지 않고, 객체로써 넘겨주도록 하자. 
  createDeck({mine: false, count: 5});
  createDeck({mine: false, count: 5});
  createHero({mine: false});
  createHero({mine: true});
  redrawScreen({mine: true});
  redrawScreen({mine: false});
}

initiate();

function createDeck({ mine, count }: { mine: boolean, count: number}){
  const player = mine ? me : opponent;
  for(let i: number = 0; i < count; i++){
    player.deckData.push(new Sub(mine));
  };
  redrawDeck(player);
}

function createHero({ mine }: { mine: boolean }){
  const player = mine ? me : opponent;
  player.heroData = new Hero(mine);
  connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true});
}

interface A {
  data: Card,
  DOM: HTMLDivElement,
  hero?: boolean
}

function connectCardDOM({ data, DOM, hero = false }: A ){
  const cardEl = document.querySelector('.card-hidden .card')!.cloneNode(true) as HTMLDivElement;
  // 무조건 HTML 요소가 존재한다고 보장 !
  cardEl.querySelector('.card-att')!.textContent = String(data.att);
  cardEl.querySelector('.card-hp')!.textContent = String(data.hp);
  if (hero){
    (cardEl.querySelector('.card-cost') as HTMLDivElement).style.display = 'none';
    const name = document.createElement('div');
    cardEl.appendChild(name);
  }
  DOM.appendChild(cardEl);
}

function redrawHero(target: Player){
  if(!target.heroData){
    throw new Error('heroData가 없습니다.');
  }
  target.hero.innerHTML = '';
  connectCardDOM({ data: target.heroData, DOM: target.hero, hero: true });
}

function redrawScreen({ mine }: { mine: boolean }) {
  const player = mine ? me : opponent;
  redrawHero(player);
}

function redrawDeck(target: Player){
  target.deck.innerHTML = '';
  target.deckData.forEach((data) => {
    connectCardDOM({ data, DOM: target.deck });
  });
}