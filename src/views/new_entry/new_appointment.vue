<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>New Appointment</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <form>
      <ion-item ref="date_item">
          <ion-label position="stacked">Date *</ion-label>
          <ion-datetime display-format="MMM DD, YYYY" picker-format="DD MMM YYYY" placeholder="Select date..." min="2021-01-01" max="2050-01-01" ref="date"></ion-datetime>
      </ion-item>
      <ion-item ref="time_item">
          <ion-label position="stacked">Time *</ion-label>
          <ion-datetime display-format="HH:mm" placeholder="Select time..." ref="time"></ion-datetime>
      </ion-item>
      <ion-item ref="patient_item">
        <ion-label position="stacked">Patient *</ion-label>
        <ion-input @ionFocus="openSelectPatient" :value="patientName" placeholder="Enter patient name..." inputmode="none"></ion-input>
      </ion-item>
      <ion-item ref="treatment_item">
        <ion-label position="stacked">Treatment *</ion-label>
        <ion-input @ionFocus="openSelectTreatment" :value="treatmentDiagnosis" placeholder="Enter treatment name..." inputmode="none"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Actions</ion-label>
        <ion-textarea placeholder="Enter actions..." rows="5" ref="actions"></ion-textarea>
      </ion-item>
    </form>
  </ion-content>
  <ion-footer>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button color="danger" fill="solid" expand="block" @click="handleCancel">Cancel</ion-button>
          </ion-col>
          <ion-col>
            <ion-button color="success" fill="solid" expand="block" @click="handleAdd">Add</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
  </ion-footer>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import Patients from '../patients.vue'
import Treatments from '../treatments.vue'

export default defineComponent({
  name: 'NewAppointment',
  props: {
    cancelCallback: {type: Function, default: null},
    addCallback: {type: Function, default: null}
  },
  data() {
    return {
      content: 'Content',
      patient: null,
      treatment: null
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar },
  methods: {
    async openSelectPatient() {
      const modal = await modalController.create({
        component: Patients,
        componentProps: {
          title: 'Select Patient',
          callback: (patient) => this.getSelectedPatient(patient)
        }
      });

      return modal.present();
    },
    
    async openSelectTreatment() {
      const modal = await modalController.create({
        component: Treatments,
        componentProps: {
          callback: (treatment) => this.getSelectedTreatment(treatment)
        }
      });

      return modal.present();
    },

    async getSelectedPatient(patient) {
      modalController.dismiss();

      this.patient = patient;
    },

    async getSelectedTreatment(treatment) {
      modalController.dismiss();

      this.treatment = treatment;
    },

    async handleCancel()
    {
      this.cancelCallback();
    },

    async handleAdd()
    {
      if(this.verifyForm()) {
        this.addCallback({
          date: this.$refs.date.value,
          time: this.$refs.time.value,
          actions: this.$refs.actions.value,
          patient_id: this.patient.id,
          treatment_id: this.treatment.id
        });
      }
    },

    verifyForm() {
      const valid = this.$refs.date.value && this.$refs.time.value && this.patient?.id && this.treatment?.id;

      this.resetVerify();

      if(!valid) {
        if(!this.$refs.date.value) {
          this.$refs.date_item.classList.add('field-invalid');
        }

        if(!this.$refs.time.value) {
          this.$refs.time_item.classList.add('field-invalid');
        }

        if(!this.patient) {
          this.$refs.patient_item.classList.add('field-invalid');
        }

        if(!this.treatment) {
          this.$refs.treatment_item.classList.add('field-invalid');
        }
      }

      return valid;
    },
    
    resetVerify() {
      this.$refs.date_item.classList.remove('field-invalid');
      this.$refs.time_item.classList.remove('field-invalid');
      this.$refs.patient_item.classList.remove('field-invalid');
      this.$refs.treatment_item.classList.remove('field-invalid');
    }
  },
  computed: {
    patientName: function() {
      return this.patient === null ? '' : `${this.patient.first_name} ${this.patient.last_name}`;
    },
    treatmentDiagnosis: function() {
      return this.treatment === null ? '' : this.treatment.diagnosis;
    }
  }
});
</script>