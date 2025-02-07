import cards from './cards.json';

interface Card {
    id: string;
    [key: string]: any;
}

interface Pack {
    name: string;
    cards: Card[];
    diamond: number;
    star: number;
}

const PACKS: Record<string, string> = {
    'a1' : 'Genetic Apex',
    'pa' : 'Promo A',
    'a1a' : 'Mythical Island',
    'a2' : 'Space Time Smackdown',
}



function getCardsByPack(cards : any[]) {

    let cardList: Pack[] = [];
    cards.forEach(card => {
const packName = card.id.split('-')[0];
const existingPack = cardList.find(pack => pack.name === PACKS[packName] || pack.name === packName);
if (existingPack) {
    existingPack.cards.push(card);
    existingPack.diamond += card.rarity.includes('◊') ? 1 : 0;
    existingPack.star += card.rarity.includes('☆') ? 1 : 0;
}
else {
    cardList.push({
        name: PACKS[packName] || packName,
        cards: [card],
        diamond: card.rarity.includes('◊') ? 1 : 0,
        star : card.rarity.includes('☆') ? 1 : 0,
    });
}
    });

    //reoorder Promo A to be last
    cardList.sort((a, b) => {
        if (a.name === 'Promo A') return 1;
        if (b.name === 'Promo A') return -1;
        return 0;
    });
return cardList;
}

export default getCardsByPack(cards);