<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="tertiary" @click="openNewPatient">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-searchbar ref="search" type="search" placeholder="Enter patient name..." @ionInput="handleSearch" clear-icon="undefined"></ion-searchbar>
      <ion-list>
        <ion-item detail="true" button v-for="p in patients" :key="p" @click="handlePatientSelect(p)">
          <ion-avatar slot="start">
            <img src="../images/icon.png">
          </ion-avatar>
          <ion-label>
            <h2>{{p.first_name}} {{p.last_name}}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { addOutline } from 'ionicons/icons';
import NewPatient from './new_entry/new_patient.vue';

export default defineComponent({
  name: 'Patients',
  props: {
    title: {type: String, default: 'Patients'},
    callback: {type: Function, default: null}
  },
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  setup() {
    return {
      addOutline
    }
  },
  data() {
    return {
      patients: [
        {id: 1, first_name: 'dummy', last_name: 'dummy', city: null, extra_info: null, dob: null, phone_nr: null},
        {id: 2, first_name: 'ad', last_name: 'dummy', city: null, extra_info: null, dob: null, phone_nr: null},
        {id: 3, first_name: 'hahaha', last_name: 'dummy', city: null, extra_info: null, dob: null, phone_nr: null},
        {id: 4, first_name: '123456789', last_name: 'dummy', city: null, extra_info: null, dob: null, phone_nr: null},
        {id: 5, first_name: 'qwe', last_name: 'dummy', city: null, extra_info: null, dob: null, phone_nr: null}
      ]
    }
  },
  ionViewDidEnter() {
    this.setSearchFocus();
  },
  mounted() {
    setTimeout(() => {
      this.setSearchFocus();
    }, 400)
  },
  methods: {
    async handleSearch(event) {
      const searchName = event.target.value;
      // to do
    },

    async handlePatientSelect(patient) {
      if(this.callback)
      {
        this.callback(patient);
      }
    },

    async setSearchFocus() {
      this.$refs.search.setFocus();
    },

    async openNewPatient()
    {
      const modal = await modalController.create({
        component: NewPatient,
        componentProps: {
          cancelCallback: () => this.closeModal(),
          addCallback: () => this.addPatient()
        }
      });

      return modal.present();
    },

    async closeModal()
    {
      modalController.dismiss();
    },

    async addPatient()
    {
      this.closeModal();
    }
  }
});
</script>