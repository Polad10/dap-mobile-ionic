<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-searchbar @ionFocus="openPatientSelect" @ionClear="clearPatient" :value="patientName" placeholder="Select patient..." inputmode="none" :search-icon="personOutline" ></ion-searchbar>
      <treatment-list :patient="patient" @treatment-selected="handleTreatmentSelect"></treatment-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonTitle, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { personOutline } from 'ionicons/icons';
import Patients from './patients.vue';
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