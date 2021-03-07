<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/appointments">
          <ion-icon :icon="readerOutline" />
          <ion-label>Appointments</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tabs/patients">
          <ion-icon :icon="peopleOutline" />
          <ion-label>Patients</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { peopleOutline, readerOutline } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      peopleOutline, 
      readerOutline
    }
  }
}
</script>