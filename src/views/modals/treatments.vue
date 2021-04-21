<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Select Treatment</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-fab vertical="top" horizontal="end" slot="fixed" edge>
        <ion-fab-button color="tertiary" @click="openNewTreatment">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-list>
        <ion-item detail="true" button v-for="t in treatments" :key="t" @click="handleTreatmentSelect(t.diagnosis)">
          <ion-label>
            <h2>{{t.diagnosis}}</h2>
            <h3>Start date: {{t.startDate}}</h3>
            <p>{{t.extraInfo}}</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { addOutline } from 'ionicons/icons';
import NewTreatment from './new_treatment.vue';

export default defineComponent({
  name: 'Treatments',
  props: {
    callback: {type: Function, default: null}
  },
  data() {
    return {
      treatments: [
        {diagnosis: 'diagnosis1', startDate: '2020-01-01', extraInfo: 'extra blab blala lbal'},
        {diagnosis: 'diagnosis2', startDate: '2020-02-01'},
        {diagnosis: 'diagnosis3', startDate: '2020-03-01', extraInfo: 'extra blab blala lbal'},
        {diagnosis: 'diagnosis4', startDate: '2020-04-01'},
        {diagnosis: 'diagnosis5', startDate: '2020-05-01'},
        {diagnosis: 'diagnosis6', startDate: '2020-06-01', extraInfo: 'extra blab blala lbal'},
      ]
    }
  },
  components: { IonPage, IonContent, IonHeader, IonTitle, IonToolbar },
  setup() {
    return {
      addOutline
    }
  },
  methods: {
    async handleTreatmentSelect(diagnosis) {
      this.callback(diagnosis);
    },

    async openNewTreatment() {
      const modal = await modalController.create({
        component: NewTreatment,
        componentProps: {
          cancelCallback: () => this.closeModal(),
          addCallback: () => this.addTreatment()
        }
      });

      return modal.present();
    },

    async closeModal() {
      modalController.dismiss();
    },

    async addTreatment() {
      this.closeModal();
    }
  }
});
</script>