import { defineStore } from 'pinia';

export const useCardDetailStore = defineStore('cardDetail', {
  state: () => ({
    card: {},
    showModal: false,
  }),
  actions: {
    openDetails(card: string) {
      this.card = card;
      this.showModal = true;
    },
    closeDetails() {
      this.showModal = false;
      this.card = {};
    },
  },
});
