<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>New Appointment</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
        <ion-label>Date</ion-label>
        <ion-datetime display-format="MMM DD, YYYY" picker-format="DD MMM YYYY" placeholder="Select date..." min="2021-01-01" max="2050-01-01"></ion-datetime>
    </ion-item>
    <ion-item>
        <ion-label>Time</ion-label>
        <ion-datetime display-format="HH:mm" placeholder="Select time..."></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Patient</ion-label>
      <ion-input @ionFocus="openSelectPatient" placeholder="Enter patient name..." inputmode="none" ref="patient"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Treatment</ion-label>
      <ion-input @ionFocus="openSelectTreatment" placeholder="Enter treatment name..." inputmode="none" ref="treatment"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Actions</ion-label>
      <ion-textarea placeholder="Enter actions..." rows="5"></ion-textarea>
    </ion-item>
  </ion-content>
      <ion-footer>
        <ion-grid>
          <ion-row>
            <ion-col >
              <ion-button color="danger" fill="solid" expand="block" @click="handleCancel">Cancel</ion-button>
            </ion-col>
            <ion-col>
              <ion-button color="success" fill="solid" expand="block" @click="handleAddAppointment">Add</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
    </ion-footer>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import Patients from '../patients.vue'
import SelectTreatment from './select_treatment.vue'

export default defineComponent({
  name: 'NewAppointment',
  props: {
    cancelCallback: {type: Function, default: null},
    addAppointmentCallback: {type: Function, default: null}
  },
  data() {
    return {
      content: 'Content',
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar },
  methods: {
    async openSelectPatient() {
      const modal = await modalController.create({
        component: Patients,
        componentProps: {
          callback: (name) => this.getSelectedPatient(name)
        }
      });

      return modal.present();
    },
    
    async openSelectTreatment() {
      const modal = await modalController.create({
        component: SelectTreatment,
        componentProps: {
          callback: (diagnosis) => this.getSelectedTreatment(diagnosis)
        }
      });

      return modal.present();
    },

    async getSelectedPatient(name) {
      modalController.dismiss();

      this.$refs.patient.value = name;
    },

    async getSelectedTreatment(diagnosis) {
      modalController.dismiss();

      this.$refs.treatment.value = diagnosis;
    },

    async handleCancel()
    {
      this.cancelCallback();
    },

    async handleAddAppointment()
    {
      this.addAppointmentCallback();
    }
  }
});
</script>