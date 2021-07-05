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
        <ion-item button v-for="p in patients.slice(0, patientIndex)" :key="p.id" @click="handlePatientSelect(p)">
          <ion-avatar slot="start">
            <img src="../images/icon.png">
          </ion-avatar>
          <ion-label>
            <h2>{{ combine(p.first_name, p.last_name) }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-infinite-scroll
        @ionInfinite="handleScroll($event)" 
        threshold="100px" 
        id="infinite-scroll"
        :disabled="loadDisabled"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles"
          loading-text="Loading more data...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { addOutline } from 'ionicons/icons';
import NewPatient from './new_entry/new_patient.vue';
import Patient from './details/patient.vue';
import { patientApi } from '../api/patient.js';
import { helper } from '../helpers/helper.js';
import { searcher } from '../helpers/searcher.js';
import { userMessage } from '../helpers/user_message.js';

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
      allPatients: [],
      patients: [],
      patientIndex: 0,
      loadSize: 10,
      loadDisabled: false
    }
  },
  ionViewDidEnter() {
    this.setSearchFocus();
  },
  mounted() {
    setTimeout(() => {
      this.setSearchFocus();
    }, 400);

    this.refresh();
  },
  methods: {
    async refresh() {
      this.allPatients = await patientApi.getAll();
      this.allPatients.sort((first, second) => {
        const firstFullName = this.combine(first.first_name, first.last_name).toLowerCase();
        const secondFullName = this.combine(second.first_name, second.last_name).toLowerCase();

        if(firstFullName > secondFullName) {
          return 1;
        }
        else if(firstFullName < secondFullName) {
          return -1;
        }

        return 0;
      });
      this.patients = [...this.allPatients];

      this.patientIndex = 0;
      this.loadNextPatients();
    },

    async loadNextPatients() {
      this.patientIndex += this.loadSize;

      if(this.patientIndex >= this.patients.length - 1) {
        this.loadDisabled = true;
      }
    },

    async handleSearch(event) {
      const searchName = event.target.value;
      
      if(!searchName) {
        this.patients = [...this.allPatients];
      }
      else {
        this.patients = searcher.searchPatient(this.allPatients, searchName);
      }
    },

    async handleScroll(event) {
      setTimeout(() => {
        this.loadNextPatients();
        event.target.complete();
      }, 100);
    },

    async handlePatientSelect(patient) {
      if(this.callback) {
        this.callback(patient);
      }
      else {
        const modal = await modalController.create({
          component: Patient,
          componentProps: {
            patient: patient
          }
        });

        return modal.present();
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
          addCallback: () => this.handlePatientAdded()
        }
      });

      return modal.present();
    },

    async closeModal()
    {
      modalController.dismiss();
    },

    async handlePatientAdded()
    {
      userMessage.toast('New patient added!', 'success');

      this.refresh();
      this.closeModal();
    },

    combine(firstPart, secondPart) {
      return helper.combine(firstPart, secondPart);
    }
  }
});
</script>