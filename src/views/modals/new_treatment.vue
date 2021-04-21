<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>New Treatment</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-item>
            <ion-label position="stacked">Date</ion-label>
            <ion-datetime display-format="MMM DD, YYYY" picker-format="DD MMM YYYY" placeholder="Select start date..." min="2021-01-01" max="2050-01-01"></ion-datetime>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Patient</ion-label>
            <ion-input @ionFocus="openSelectPatient" placeholder="Select patient..." inputmode="none" ref="patient"></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Diagnosis</ion-label>
            <ion-textarea placeholder="Enter diagnosis..." rows="5"></ion-textarea>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Extra Info</ion-label>
            <ion-textarea placeholder="Enter extra info..." rows="5"></ion-textarea>
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

export default defineComponent({
    name: 'NewTreatment',
    props: {
        cancelCallback: {type: Function, default: null},
        addCallback: {type: Function, default: null}
    },
    components: { IonContent, IonHeader, IonTitle, IonToolbar },
    methods: {
        async openSelectPatient() {
            const modal = await modalController.create({
                component: Patients,
                componentProps: {
                    title: 'Select Patient',
                    callback: (name) => this.getSelectedPatient(name)
                }
            });

            return modal.present();
        },

        async getSelectedPatient(name) {
            modalController.dismiss();

            this.$refs.patient.value = name;
        },

        async handleCancel() {
            this.cancelCallback();
        },

        async handleAdd() {
            this.addCallback();
        }
    }
});
</script>