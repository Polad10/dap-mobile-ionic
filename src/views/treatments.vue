<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Select Treatment</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="tertiary" @click="openNewTreatment">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-searchbar @ionFocus="openPatientSelect" @ionClear="clearPatient" :value="patientName" placeholder="Select patient..." inputmode="none" :search-icon="personOutline" ></ion-searchbar>
      <ion-list>
        <ion-item detail="true" button v-for="t in treatments.slice(0, treatmentIndex)" :key="t.id" @click="handleTreatmentSelect(t)">
          <ion-label>
            <h2>{{t.diagnosis}}</h2>
            <h3>Start date: {{toISODate(t.start_date)}}</h3>
            <p>{{t.extra_info}}</p>
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
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { addOutline, personOutline } from 'ionicons/icons';
import NewTreatment from './new_entry/new_treatment.vue';
import Patients from './patients.vue';
import { treatmentApi } from '../api/treatment.js';
import { datetime } from '../helpers/datetime.js';
import { userMessage } from '../helpers/user_message.js';

export default defineComponent({
  name: 'Treatments',
  props: {
    callback: {type: Function, default: null}
  },
  data() {
    return {
      patient: null,
      treatments: [],
      treatmentIndex: 0,
      loadSize: 5,
      loadDisabled: false
    }
  },
  mounted() {
    this.refresh();
  },
  components: { IonPage, IonContent, IonHeader, IonTitle, IonToolbar },
  setup() {
    return {
      addOutline,
      personOutline
    }
  },
  methods: {
    async refresh() {
      if(this.patient) {
        this.treatments = await treatmentApi.getForPatient(this.patient.id);
      }
      else {
        this.treatments = await treatmentApi.getAll();
      }

      this.treatmentIndex = 0;
      this.loadNextTreatments();
    },

    async loadNextTreatments() {
      this.treatmentIndex += this.loadSize;

      if(this.treatmentIndex >= this.treatments.length - 1) {
        this.loadDisabled = true;
      }
    },

    async handleScroll(event) {
      setTimeout(() => {
        this.loadNextTreatments();
        event.target.complete();
      }, 100);
    },

    async handleTreatmentSelect(diagnosis) {
      this.callback(diagnosis);
    },

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

    async openNewTreatment() {
      const modal = await modalController.create({
        component: NewTreatment,
        componentProps: {
          cancelCallback: () => this.closeModal(),
          addCallback: () => this.handleTreatmentAdded()
        }
      });

      return modal.present();
    },

    async handleTreatmentAdded() {
      userMessage.toast('New treatment created!', 'success');

      this.refresh();
      this.closeModal();
    },

    toISODate(date) {
      return datetime.toISODate(date);
    }
  },

  computed: {
    patientName: function() {
      return this.patient === null ? '' : `${this.patient.first_name} ${this.patient.last_name}`;
    }
  }
});
</script>