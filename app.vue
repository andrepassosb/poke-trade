<template>
  <CardDetail />

  <div class="container-background">
    <div class="container-actions">
      <h2>{{ userStore.user.name }}'s Cards</h2>
      <div class="avatar">
        <div class="avatar-border">
          <img :src="avatar" alt="Avatar" class="avatar-img" />
        </div>
      </div>
    </div>
    <div class="container" v-for="pack in cardsByPack" :key="pack.id">
      <div class="container-title">
        <img
          :src="geneticApex"
          alt="Genetic Apex"
          class="logo"
          v-if="pack.name === 'Genetic Apex'"
        />
        <img
          :src="mythicalIsland"
          alt="Mythical Island"
          class="logo"
          v-if="pack.name === 'Mythical Island'"
        />
        <img
          :src="promoA"
          alt="Promo A"
          class="logo"
          v-if="pack.name === 'Promo A'"
        />
        <img
          :src="spaceTimeSmackdown"
          alt="Space Time Smackdown"
          class="logo"
          v-if="pack.name === 'Space Time Smackdown'"
        />
        <div class="container-counter" v-if="pack.name !== 'Promo A'">
          <div class="counter">
            <div class="diamond"><div class="pt1"></div></div>
            <span>210/</span> <span>{{ pack.diamond }}</span>
          </div>
          <div class="counter counter-star">
            <img :src="star" alt="star" class="star" />
            <span class="counter-text">{{ pack.star }}</span>
          </div>
        </div>
      </div>
      <div class="container-grid">
        <div
          v-for="card in pack.cards"
          :key="card.id"
          style="position: relative"
        >
          <!-- @click="store.openDetails(card)" -->
          <!-- <img :src="card.image" :alt="card.name" class="card-img" /> -->
          <div v-if="userStore.hasCard(card)">
            <img :src="card.image" :alt="card.name" class="card-img" />
            <span class="counter-card">{{
              userStore.getCardQuantity(card)
            }}</span>
          </div>
          <div v-else class="empty-card">
            <span>{{ cleanNumber(card.id) }}</span>
          </div>
          <div class="edit-cards">
            <div class="edit-buttons">
              <button
                class="button-remove"
                @click="userStore.remove(card)"
              ></button>
              <button class="button-add" @click="userStore.add(card)"></button>
            </div>
            <div class="counter-edit" v-if="userStore.hasCard(card)">
              <span>{{ formattNumber(userStore.getCardQuantity(card)) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Create a footer menu flutuante-->
  <div class="footer">
    <div class="footer-background">
      <div class="footer-grid">
        <div class="my-cards">
          <img
            src="~/public/img/gameboy-video-game-games-device-b.svg"
            alt="star"
          />
        </div>
        <div class="my-friends">
          <img src="~/public/img/personal-connections-white.svg" alt="star" />
        </div>
        <div></div>
        <div class="menu">
          <img src="~/public/img/menu.svg" alt="star" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import geneticApex from '~/public/img/genetic-apex.png';
import mythicalIsland from '~/public/img/mythical-island.png';
import promoA from '~/public/img/promo-a.png';
import spaceTimeSmackdown from '~/public/img/space-time-smackdown.png';
import star from '~/public/img/star.png';
import cardsByPack from '~/data';
import { useCardDetailStore } from '~/stores/cardDetail';
import { useUserStore } from '~/stores/user';

const userStore = useUserStore();

console.log(userStore);

const avatar = computed(
  () =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${userStore.user.avatar}.svg`,
);

function cleanNumber(number) {
  return number.split('-')[1];
}

function formattNumber(number) {
  console.log(number);
  return number.toString().padStart(2, '0');
}
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
  overflow: auto;
}
.container-background {
  display: flex;

  justify-content: center;
  background: linear-gradient(
    93deg,
    rgb(232, 241, 248) 0%,
    rgb(231, 240, 247) 50%,
    rgb(232, 241, 248) 100%
  );
  flex-direction: column;
  align-items: center;
}
/* .container {
    display: flex;
    justify-content: center;
    margin: 1.3rem;
  }

  .container-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 5px;
    
  }
  .cards-margin {
    margin-bottom: 5px;
  }
  .card-img {
    width: 100%;
    height: auto;
    box-shadow: 0px 0px 4px 4px  rgb(207,218,231);
  }
  .empty-card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 73px;
    height: 102px;
    background: #E6EFF6;
  border-radius: 5px;
  box-shadow: inset 3px 3px 3px rgb(204,218,234), 
              inset -4px -4px 5px rgba(255, 255, 255);
  } */
.container {
  padding: 1.3rem;
  width: calc(100vw - 1.3rem);
  max-width: 800px;
  flex-wrap: wrap; /* Permite ajuste automático */
}

.container-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Sempre 5 colunas */
  gap: 0.5rem;
  width: 100%;
  max-width: 100%;
}

/* .cards-margin {
  margin-bottom: 0.2rem;
} */

.card-img {
  width: 100%;
  height: auto;
  box-shadow: 0px 0px 4px 4px rgb(207, 218, 231);
  border-radius: 5px;
}

.empty-card {
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 0.69; /* Mantém a proporção */
  width: 100%; /* Ocupa a coluna */
  background: #e6eff6;
  border-radius: 5px;
  box-shadow:
    inset 3px 3px 3px rgb(204, 218, 234),
    inset -4px -4px 5px rgba(255, 255, 255);
  cursor: pointer;
}

/* Responsividade */
@media (max-width: 768px) {
  .container-grid {
    gap: 0.3rem; /* Reduz espaço para telas menores */
  }
  .empty-card span {
    font-size: 6vw !important;
  }
  .container-actions h2 {
    flex-grow: 1;
    text-align: center;
    padding-left: 15vw !important;
  }
  .counter-card {
    height: 12% !important;
    width: 50% !important;
    font-size: 2vw !important;
  }
}

@media (max-width: 500px) {
  .container-grid {
    grid-template-columns: repeat(
      5,
      minmax(40px, 1fr)
    ); /* Mantém 5 colunas, mas ajusta tamanho */
  }

  .empty-card span {
    font-size: 1.5rem !important;
  }
  .container-title {
    margin: 1rem !important;
  }
  .counter-card {
    height: 15% !important;
    width: 50% !important;
    font-size: 3vw !important;
  }
}

.empty-card span {
  font-size: 3rem;
  font-weight: bold;
  color: #b2bfdd;
}
.container-title {
  display: flex;
  justify-content: center;
  margin: 2rem;
  padding: 1rem;
  position: relative;
  box-shadow:
    rgb(255 255 255 / 95%) 0px -25px 18px -21px,
    rgba(0, 0, 0, 0.45) 0px 15px 20px -20px;
  background: linear-gradient(
    93deg,
    rgb(232, 240, 248) 0%,
    rgb(232, 241, 248) 50%,
    rgb(232, 240, 248) 100%
  );
  flex-direction: column;
  align-items: center;
}

.container-title img.logo {
  width: 18vw;
  max-width: 200px;
  height: auto;
}

.counter {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Ocupa a coluna */
  background: #e6eff6;
  border-radius: 1rem;
  box-shadow:
    inset 3px 3px 3px rgb(204, 218, 234),
    inset -4px -4px 5px rgba(255, 255, 255);
  padding: 0.2rem 0.5rem 0.2rem 0.3rem;
}
.counter span:nth-child(2) {
  padding-left: 0.9rem;
  font-size: 0.9rem;
  font-weight: bold;
}
.counter span:nth-child(3) {
  padding-left: 0.2rem;
  font-size: 0.7rem;
  font-weight: bold;
  transform: translateY(0.1rem);
}
.container-counter {
  margin-top: 1rem;
  display: flex;
}
.container-counter .counter2 {
  margin-right: 0.5rem;
}
.diamond {
  width: 0.7rem;
  height: 1rem;
  position: relative;
  margin-left: 0.5rem;
}
.diamond .pt1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #9cabc3;
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  border-radius: 5px;
}
.diamond::after {
  content: '';
  position: absolute;
  top: -13%;
  left: -8%;
  width: 85%;
  height: 85%;
  background-color: #e6eff6;
  clip-path: polygon(70% 24%, 87% 42%, 36% 92%, 20% 75%);
}
.star {
  margin-left: 0.2rem;
  width: 1.3rem;
  height: 1.1rem;
  position: relative;
}

.counter-star {
  margin-left: 0.7rem;
}
.counter-star .counter-text {
  margin-right: 0.5rem;
}

.avatar {
  width: 15vw;
  height: 15vw;
  max-width: 100px;
  max-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  box-shadow:
    inset 3px 3px 3px rgb(204, 218, 234),
    inset -4px -4px 5px rgba(255, 255, 255);
}
.avatar-border {
  width: 87%;
  height: 87%;
  position: absolute;
  background: #e6eff6;
  border-radius: 50%;
  box-shadow:
    3px 3px 3px rgb(204, 218, 234),
    -4px -4px 5px rgba(255, 255, 255);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  border-radius: 50%;
}
.container-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 2rem 0rem 2rem;
  margin-bottom: -1rem;
  box-sizing: border-box;
}

.container-actions h2 {
  flex-grow: 1;
  text-align: center;
  padding-left: 100px;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  z-index: 1;
}

.footer-grid {
  background-color: #e5f0f4;
  padding: 10px 0;
  max-width: 864px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  width: 100%;
  height: 60px;
  align-items: center; /* Garante que os itens fiquem alinhados no centro */
}

.my-cards {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden; /* Garante que nada saia da div */
}

.footer img {
  max-width: 30%;
  object-fit: contain; /* Mantém a proporção correta */
  transform: translateY(-0.4rem);
}

.counter-card {
  position: absolute;
  left: 0;
  bottom: 3px;
  background: #637796;
  width: 40%;
  border-radius: 0 20px 0 5px;
  font-size: 0.8rem;
  height: 10%;
  font-weight: bolder;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.footer-background {
  box-shadow: 0px 18px 60px 19px rgb(164 202 241);
  background: #e5f0f4;
  width: 100%;
  display: flex;
  justify-content: center;
}

.edit-buttons {
  position: absolute;
  left: 6%;
  bottom: 8%;
  width: 88%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #8a9ab2;
  border-radius: 2rem;
  box-shadow: inset 2px 3px 2px rgb(204, 218, 234);
}
/* .edit-buttons button {
  font-size: 28px;
  font-weight: 200;
} */
.button-remove {
  background-color: transparent;
  color: #fff;
  border: none;
  padding: calc(0.3rem + 12%) 23% calc(0.3rem + 12%) 23%;
  border-radius: 2rem 0 0 2rem;
  position: relative;
  cursor: pointer;
}
.button-remove::after {
  content: '_';
  position: absolute;
  font-size: 23px;
  font-weight: 200;
  left: 38%;
  bottom: 41%;
}
.button-add {
  background-color: transparent;
  color: #fff;
  border: none;
  padding: calc(0.3rem + 12%) 23% calc(0.3rem + 12%) 23%;
  border-radius: 0 2rem 2rem 0;
  position: relative;
  border-left: 1px solid;
  cursor: pointer;
}
.button-add::after {
  content: '+';
  position: absolute;
  font-size: 25px;
  font-weight: 200;
  right: 38%;
  bottom: 50%;
  transform: translate(25%, 50%);
}
.counter-edit {
  position: absolute;
  width: 100%;
  bottom: 51%;
  font-size: calc(1rem + 2.5vw);
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
}
.edit-cards {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #00000052;
  border-radius: 5px;
}
</style>
