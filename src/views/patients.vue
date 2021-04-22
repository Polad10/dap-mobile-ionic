<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-fab vertical="top" horizontal="end" slot="fixed" edge>
        <ion-fab-button color="tertiary" @click="openNewPatient">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-searchbar ref="search" type="search" placeholder="Enter patient name..." @ionInput="handleSearch" clear-icon="undefined"></ion-searchbar>
      <ion-list>
        <ion-item detail="true" button v-for="p in patients" :key="p" @click="handlePatientSelect(p.firstName + ' ' + p.lastName)">
          <ion-avatar slot="start">
            <img src="../images/icon.png">
          </ion-avatar>
          <ion-label>
            <h2>{{p.firstName}} {{p.lastName}}</h2>
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
        {firstName: 'Polad', lastName: 'Mammadov'},
        {firstName: 'Faxri', lastName: 'Imanov'},
        {firstName: 'Fuad', lastName: 'Imanov'},
        {firstName: 'Amelia', lastName: 'Kezia'},
        {firstName: 'Emin', lastName: 'Mammadov'},
        {firstName: 'Farid', lastName: 'Mammadov'},
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

    async handlePatientSelect(name) {
      if(this.callback)
      {
        this.callback(name);
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