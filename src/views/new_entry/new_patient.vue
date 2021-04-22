<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>New Patient</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-item>
            <ion-label position="stacked">First Name</ion-label>
            <ion-input placeholder="Enter first name..."></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Last Name</ion-label>
            <ion-input placeholder="Enter last name..."></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">City</ion-label>
            <ion-input placeholder="Enter city..."></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Date of Birth</ion-label>
            <ion-datetime display-format="MMM DD, YYYY" picker-format="YYYY MMM DD" placeholder="Select date..." max="2021-01-01"></ion-datetime>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Phone Number</ion-label>
            <ion-input inputmode="tel" type="tel" placeholder="Enter phone number..."></ion-input>
        </ion-item>
        <ion-item>
            <ion-label position="stacked">Extra Info</ion-label>
            <ion-textarea placeholder="Enter extra information..." rows="5"></ion-textarea>
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
            if(this.cancelCallback)
            {
                this.cancelCallback();
            }
        },

        async handleAdd() 
        {
            if(this.addCallback)
            {
                this.addCallback();
            }
        }
    }
});
</script>