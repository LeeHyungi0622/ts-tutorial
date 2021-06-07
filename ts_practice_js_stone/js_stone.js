"use strict";
exports.__esModule = true;
// 영웅 클래스
var Hero = /** @class */ (function () {
    function Hero(mine) {
        this.mine = mine;
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    }
    return Hero;
}());
// 쫄병 클래스
var Sub = /** @class */ (function () {
    function Sub(mine) {
        this.field = false;
        this.mine = mine;
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    return Sub;
}());
var a = {
    add: function (a, b) { return a + b; }
};
var b = {
    add: function (a, b) { return a + b; }
};
console.log(a.add(1, 2));
console.log(b.add('a', 'b'));
var opponent = {
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    field: document.getElementById('rival-cards'),
    cost: document.getElementById('rival-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var me = {
    hero: document.getElementById('rival-hero'),
    deck: document.getElementById('rival-deck'),
    field: document.getElementById('rival-cards'),
    cost: document.getElementById('rival-cost'),
    deckData: [],
    heroData: null,
    fieldData: [],
    chosenCard: null,
    chosenCardData: null
};
var turnButton = document.getElementById('turn-btn');
var turn = true; // true면 내 턴, false면 상대 턴
function initiate() {
    [opponent, me].forEach(function (item) {
        item.deckData = [];
        item.heroData = null;
        item.fieldData = [];
        item.chosenCard = null;
        item.chosenCardData = null;
    });
    // 객체를 생성할때 개별인자로 직접 전달하지 않고, 객체로써 넘겨주도록 하자. 
    createDeck({ mine: false, count: 5 });
    createDeck({ mine: false, count: 5 });
    createHero({ mine: false });
    createHero({ mine: true });
    redrawScreen({ mine: true });
    redrawScreen({ mine: false });
}
initiate();
function createDeck(_a) {
    var mine = _a.mine, count = _a.count;
    var player = mine ? me : opponent;
    for (var i = 0; i < count; i++) {
        player.deckData.push(new Sub(mine));
    }
    ;
    redrawDeck(player);
}
function createHero(_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    player.heroData = new Hero(mine);
    connectCardDOM({ data: player.heroData, DOM: player.hero, hero: true });
}
function connectCardDOM(_a) {
    var data = _a.data, DOM = _a.DOM, _b = _a.hero, hero = _b === void 0 ? false : _b;
    var cardEl = document.querySelector('.card-hidden .card').cloneNode(true);
    // 무조건 HTML 요소가 존재한다고 보장 !
    cardEl.querySelector('.card-att').textContent = String(data.att);
    cardEl.querySelector('.card-hp').textContent = String(data.hp);
    if (hero) {
        cardEl.querySelector('.card-cost').style.display = 'none';
        var name_1 = document.createElement('div');
        cardEl.appendChild(name_1);
    }
    DOM.appendChild(cardEl);
}
function redrawHero(target) {
    if (!target.heroData) {
        throw new Error('heroData가 없습니다.');
    }
    target.hero.innerHTML = '';
    connectCardDOM({ data: target.heroData, DOM: target.hero, hero: true });
}
function redrawScreen(_a) {
    var mine = _a.mine;
    var player = mine ? me : opponent;
    redrawHero(player);
}
function redrawDeck(target) {
    target.deck.innerHTML = '';
    target.deckData.forEach(function (data) {
        connectCardDOM({ data: data, DOM: target.deck });
    });
}
