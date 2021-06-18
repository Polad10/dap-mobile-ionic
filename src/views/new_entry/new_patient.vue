<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>New Patient</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-item ref="firstname_item">
            <ion-label position="stacked">First Name *</ion-label>
            <ion-input placeholder="Enter first name..." ref="first_name"></ion-input>
        </ion-item>
        <ion-item ref="lastname_item">
            <ion-label position="stacked">Last Name *</ion-label>
            <ion-input placeholder="Enter last name..." ref="last_name"></ion-input>
        </ion-item>
        <ion-item ref="city_item">
            <ion-label position="stacked">City</ion-label>
            <ion-input placeholder="Enter city..." ref="city"></ion-input>
        </ion-item>
        <ion-item ref="dob_item">
            <ion-label position="stacked">Date of Birth</ion-label>
            <ion-datetime display-format="MMM DD, YYYY" picker-format="YYYY MMM DD" placeholder="Select date..." max="2021-01-01" ref="dob"></ion-datetime>
        </ion-item>
        <ion-item ref="phone_item">
            <ion-label position="stacked">Phone Number</ion-label>
            <ion-input inputmode="tel" type="tel" placeholder="Enter phone number..." ref="phone"></ion-input>
        </ion-item>
        <ion-item ref="extra_item">
            <ion-label position="stacked">Extra Info</ion-label>
            <ion-textarea placeholder="Enter extra information..." rows="5" ref="extra"></ion-textarea>
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
import { IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/vue';
import { defineComponent } from 'vue';
import { patientApi } from '../../api/patient.js';

export default defineComponent({
    name: 'NewPatient',
    props: {
        cancelCallback: {type: Function, default: null},
        addCallback: {type: Function, default: null}
    },
    components: { IonContent, IonHeader, IonTitle, IonToolbar },
    methods: {
        async handleCancel()
        {
            this.cancelCallback();
        },

        async handleAdd() 
        {
            if(this.verifyForm()) {
                const firstName = this.$refs.first_name.value;
                const lastName = this.$refs.last_name.value;
                const city = this.$refs.city.value;
                const dob = this.$refs.dob.value;
                const phoneNr = this.$refs.phone.value;
                const extraInfo = this.$refs.extra.value;

                const success = await patientApi.create(firstName, lastName, city, dob, phoneNr, extraInfo);

                if(success) {
                    this.addCallback();
                }
            }
        },

        verifyForm() {
            this.resetVerify();

            const valid = this.$refs.first_name.value && this.$refs.last_name.value;

            if(!valid) {
                if(!this.$refs.first_name.value) {
                    this.$refs.firstname_item.classList.add('field-invalid');
                }

                if(!this.$refs.last_name.value) {
                    this.$refs.lastname_item.classList.add('field-invalid');
                }
            }

            return valid;
        },

        resetVerify() {
            this.$refs.firstname_item.classList.remove('field-invalid');
            this.$refs.lastname_item.classList.remove('field-invalid');
        }
    }
});
</script>