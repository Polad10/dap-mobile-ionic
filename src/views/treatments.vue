<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="tertiary" @click="openNewTreatment">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-searchbar @ionFocus="openPatientSelect" @ionClear="clearPatient" :value="patientName" placeholder="Select patient..." inputmode="none" :search-icon="personOutline" ></ion-searchbar>
      <treatment-list :patient="patient" @treatment-selected="handleTreatmentSelect"></treatment-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { addOutline, personOutline } from 'ionicons/icons';
import NewTreatment from './new_entry/new_treatment.vue';
import Patients from './patients.vue';
import { userMessage } from '../helpers/user_message.js';
import TreatmentList from './components/treatment_list.vue';

export default defineComponent({
  name: 'Treatments',
  props: {
    title: {type: String, default: 'Treatments'},
    callback: {type: Function, default: null}
  },
  data() {
    return {
      patient: null
    }
  },
  components: { IonPage, IonContent, IonHeader, IonTitle, TreatmentList },
  setup() {
    return {
      addOutline,
      personOutline
    }
  },
  methods: {
    async openPatientSelect() {
      const modal = await modalController.create({
        component: Patients,
        componentProps: {
          title: 'Select Patient',
          callback: (patient) => this.handlePatientSelect(patient)
        }
      });

      return modal.present();
    },

    async handlePatientSelect(patient) {
      this.setPatient(patient);

      this.closeModal();
    },

    async clearPatient() {
      this.setPatient(null);
    },

    setPatient(value) {
      this.patient = value;

      this.refresh();
    },

    async closeModal() {
      modalController.dismiss();
    },

    async openNewTreatment() {
      const modal = await modalController.create({
        component: NewTreatment,
        componentProps: {
          cancelCallback: () => this.closeModal(),
          addCallback: () => this.handleTreatmentAdded()
        }
      });

      return modal.present();
    },

    async handleTreatmentAdded() {
      userMessage.toast('New treatment created!', 'success');

      this.refresh();
      this.closeModal();
    },

    async handleTreatmentSelect(diagnosis) {
      this.callback(diagnosis);
    },
  },

  computed: {
    patientName: function() {
      return this.patient === null ? '' : `${this.patient.first_name} ${this.patient.last_name}`;
    }
  }
});
</script>