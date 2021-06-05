<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>New Treatment</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-item ref="date_item">
            <ion-label position="stacked">Date *</ion-label>
            <ion-datetime display-format="MMM DD, YYYY" picker-format="DD MMM YYYY" placeholder="Select start date..." min="2021-01-01" max="2050-01-01" ref="date"></ion-datetime>
        </ion-item>
        <ion-item ref="patient_item">
            <ion-label position="stacked">Patient *</ion-label>
            <ion-input @ionFocus="openSelectPatient" :value="patientName" placeholder="Select patient..." inputmode="none"></ion-input>
        </ion-item>
        <ion-item ref="diagnosis_item">
            <ion-label position="stacked">Diagnosis *</ion-label>
            <ion-textarea placeholder="Enter diagnosis..." rows="5" ref="diagnosis"></ion-textarea>
        </ion-item>
        <ion-item ref="extra_item">
            <ion-label position="stacked">Extra Info</ion-label>
            <ion-textarea placeholder="Enter extra info..." rows="5" ref="extra"></ion-textarea>
        </ion-item>
    </ion-content>
    <ion-footer>
        <ion-grid>
          <ion-row>
            <ion-col >
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
import Patients from '../patients.vue';
import { treatmentApi } from '../../api/treatment.js';

export default defineComponent({
    name: 'NewTreatment',
    props: {
        cancelCallback: {type: Function, default: null},
        addCallback: {type: Function, default: null}
    },
    data() {
        return {
            patient: null
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

        async getSelectedPatient(patient) {
            modalController.dismiss();

            this.patient = patient;
        },

        async handleCancel() {
            this.cancelCallback();
        },

        async handleAdd() {
            if(this.verifyForm()) {
                const date = this.$refs.date.value;
                const diagnosis = this.$refs.diagnosis.value;
                const extraInfo = this.$refs.extra.value;
                const patientId = this.patient.id;

                const success = await treatmentApi.create(date, diagnosis, extraInfo, patientId);

                if(success) {
                    this.addCallback();
                }
            }
        },

        verifyForm() {
            const valid = this.$refs.date.value && this.$refs.diagnosis.value && this.patient?.id;

            this.resetVerify();

        if(!valid) {
            if(!this.$refs.date.value) {
            this.$refs.date_item.classList.add('field-invalid');
            }

            if(!this.$refs.diagnosis.value) {
            this.$refs.diagnosis_item.classList.add('field-invalid');
            }

            if(!this.patient) {
            this.$refs.patient_item.classList.add('field-invalid');
            }
        }

            return valid;
        },

        resetVerify() {
            this.$refs.date_item.classList.remove('field-invalid');
            this.$refs.patient_item.classList.remove('field-invalid');
            this.$refs.diagnosis_item.classList.remove('field-invalid');
        }
    },
    computed: {
        patientName: function() {
            return this.patient === null ? '' : `${this.patient.first_name} ${this.patient.last_name}`;
        },
    }
});
</script>