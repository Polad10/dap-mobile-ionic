<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Appointments</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-fab vertical="top" horizontal="end" slot="fixed" edge>
        <ion-fab-button color="tertiary" @click="openNewAppointment">
           <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-list>
        <ion-item-group v-for="item in [1,2]" :key="item">
          <ion-list-header color="light">
            <h5>20-10-2021</h5>
          </ion-list-header>
          <ion-item v-for="i in [1,2,3]" :key="i">
            <ion-label color="medium" position="fixed">21:21</ion-label>
            <ion-label class="ion-text-wrap ion-margin-end">
              <h2>Polad 10</h2>
              <h3>Diagnosis alkdalkdlaskd adasdmasldmalskdlaskdlaklsjdalksjdlaksjdlkasj</h3>
              <p>Actions, asda las das als</p>
            </ion-label>
            <ion-fab horizontal="end">
              <ion-fab-button size="small" color="light">
                <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
              </ion-fab-button>
              <ion-fab-list side="start">
                <ion-fab-button color="success">
                  <ion-icon :icon="checkmarkOutline"></ion-icon>
                </ion-fab-button>
                <ion-fab-button color="danger">
                  <ion-icon :icon="closeOutline"></ion-icon>
                </ion-fab-button>
              </ion-fab-list>
            </ion-fab>
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
  IonPage,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  modalController
 } from '@ionic/vue';

import { 
  ellipsisHorizontalOutline,
  checkmarkOutline,
  closeOutline,
  checkmarkCircleOutline,
  addOutline
 } from 'ionicons/icons'
 
import { defineComponent, ref } from 'vue';
import NewAppointment from './new_entry/new_appointment.vue'

export default defineComponent({
  components: {
    IonContent, 
    IonInfiniteScroll, 
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon
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
      items,
      ellipsisHorizontalOutline,
      checkmarkOutline,
      closeOutline,
      checkmarkCircleOutline,
      addOutline
    }
  },
  methods: {
    async openNewAppointment() {
      const modal = await modalController.create({
        component: NewAppointment,
        componentProps: {
          cancelCallback: () => this.closeModal(),
          addCallback: () => this.addAppointment()
        }
      });

      return modal.present();
    },

    async closeModal()
    {
      modalController.dismiss();
    },

    async addAppointment()
    {
      // to do
      this.closeModal();
    }
  }
});
</script>