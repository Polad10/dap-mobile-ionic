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
        <ion-item detail="true" button v-for="t in treatments" :key="t" @click="handleTreatmentSelect(t)">
          <ion-label>
            <h2>{{t.diagnosis}}</h2>
            <h3>Start date: {{t.start_date}}</h3>
            <p>{{t.extra_info}}</p>
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
import NewTreatment from './new_entry/new_treatment.vue';

export default defineComponent({
  name: 'Treatments',
  props: {
    callback: {type: Function, default: null}
  },
  data() {
    return {
      treatments: [
        {id: 1, start_date: '2020-08-20T00:00:00.000Z', end_date: null, diagnosis: 'dummy', extra_info: null, status: 'Ongoing', patient_id: 1}
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