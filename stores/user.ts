import { defineStore } from 'pinia';

interface Cards {
  [key: string]: CardData;
}

interface CardData {
  id: string;
  rarity: string;
  quantity: number;
}

interface User {
  name: string;
  avatar: number;
  myCards: Cards;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    // user: {} as User,
    user: {
      name: 'SemParar',
      avatar: 26,
      myCards: {
        'a1-002': {
          id: 'a1-002',
          rarity: '◊',
          quantity: 1,
        },
      } as Cards,
    },
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    },
    hasCard(card: CardData): boolean {
      return card.id in this.user.myCards;
    },
    getCardQuantity(card: CardData): number {
      return this.user.myCards[card.id]?.quantity ?? 0;
    },
    remove(card: CardData) {
      const { id } = card;
      if (this.hasCard(card)) {
        this.user.myCards[id].quantity -= 1;
        if (this.user.myCards[id].quantity === 0) {
          delete this.user.myCards[id];
        }
      }
    },
    add(card: CardData) {
      const { id, rarity } = card;
      if (this.hasCard(card)) {
        this.user.myCards[id].quantity += 1;
      } else {
        this.user.myCards[id] = {
          id,
          rarity,
          quantity: 1,
        };
      }
    },
  },
});
