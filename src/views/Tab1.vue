<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Appointments</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item-group v-for="item in items" :key="item">
          <ion-list-header color="light">
            <h5>20-10-2021</h5>
          </ion-list-header>
          <ion-item v-for="i in [1,2,3]" :key="i">
            <ion-label slot="start" position="fixed" color="medium">21:21</ion-label>
            <ion-avatar slot="start">
              <img src="../images/icon.png">
            </ion-avatar>
            <ion-label>
              <h2>Polad 10</h2>
              <h3>Diagnosis........</h3>
              <p>Actions, asda las das als</p>
            </ion-label>
          </ion-item>
        </ion-item-group>
      </ion-list>

      <ion-infinite-scroll
        @ionInfinite="loadData($event)" 
        threshold="100px" 
        id="infinite-scroll"
        :disabled="isDisabled"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="Loading more data...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { 
  IonContent, 
  IonInfiniteScroll, 
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage
 } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    IonContent, 
    IonInfiniteScroll, 
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
    IonPage
  },
  setup() {
    const isDisabled = ref(false);

    const items = ref([] as number[]);
    const pushData = () => {
      const max = items.value.length + 20;
      const min = max - 20;
      for (let i = min; i < max; i++) {
        items.value.push(i);
      }
    }

    const loadData = (event: any) => {
      setTimeout(() => {
        pushData();
        console.log('Loaded data');
        event.target.complete();

        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (items.value.length == 1000) {
          event.target.disabled = true;
        }
      }, 500);
    }

    pushData();

    return {
      isDisabled,
      loadData,
      items
    }
  }
});
</script>