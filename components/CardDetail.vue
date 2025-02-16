<template>
  <div v-if="store.showModal" class="modal">
    <img :src="store.card.image" alt="card.name" class="card-img" />
  </div>
</template>
<script setup>
import { useCardDetailStore } from '~/stores/cardDetail';
const store = useCardDetailStore();
</script>
<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  width: 80%;
  display: flex;
  justify-content: center;
}
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}
</style>
