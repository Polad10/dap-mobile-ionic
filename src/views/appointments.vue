<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-fab vertical="top" horizontal="end" slot="fixed" edge>
        <ion-fab-button color="tertiary" @click="openNewAppointment">
           <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-list>
        <ion-item-group v-for="appointment in appointments.slice(0, appointmentIndex)" :key="appointment.date">
          <ion-list-header color="light">
            <h5>{{ appointment.date }}</h5>
          </ion-list-header>
          <ion-item-sliding v-for="info in appointment.infos" :key="info.id">
            <ion-item-options>
              <ion-item-option color="success" @click="processAppointment(info)">Done</ion-item-option>
              <ion-item-option color="danger" @click="cancelAppointment(info)">Cancel</ion-item-option>
            </ion-item-options>
            <ion-item>
            <ion-label color="medium" position="fixed">{{ info.time }}</ion-label>
            <ion-label class="ion-text-wrap ion-margin-end">
              <h2>{{ combine(info.treatment.patient.first_name, info.treatment.patient.last_name) }}</h2>
              <h3>{{ info.treatment.diagnosis }}</h3>
              <p>{{ info.actions }}</p>
            </ion-label>
          </ion-item>
          </ion-item-sliding>
        </ion-item-group>
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
import { 
  IonContent, 
  IonInfiniteScroll, 
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  modalController
 } from '@ionic/vue';

import { 
  ellipsisHorizontalOutline,
  checkmarkOutline,
  closeOutline,
  checkmarkCircleOutline,
  addOutline
 } from 'ionicons/icons'
 
import { defineComponent } from 'vue';
import NewAppointment from './new_entry/new_appointment.vue';
import { appointmentApi } from '../api/appointment.js';
import { paymentApi } from '../api/payment.js';
import { helper } from '../helpers/helper.js';
import { userMessage } from '../helpers/user_message.js';
import { datetime } from '../helpers/datetime.js';

export default defineComponent({
  name: 'Appointments',
  props: {
    title: {type: String, default: 'Appointments'}
  },
  components: {
    IonContent, 
    IonInfiniteScroll, 
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonFab,
    IonFabButton,
    IonIcon
  },
  data() {
    return {
      appointments: [],
      appointmentIndex: 0,
      loadSize: 5,
      loadDisabled: false
    }
  },
  mounted() {
    this.refresh();
  },
  setup() {
    return {
      ellipsisHorizontalOutline,
      checkmarkOutline,
      closeOutline,
      checkmarkCircleOutline,
      addOutline
    }
  },
  methods: {
    async openNewAppointment() {
      const modal = await modalController.create({
        component: NewAppointment,
        componentProps: {
          cancelCallback: () => this.closeModal(),
          addCallback: (appointment) => this.addAppointment(appointment)
        }
      });

      return modal.present();
    },

    async closeModal()
    {
      modalController.dismiss();
    },

    async addAppointment(appointment)
    {
      const dt = datetime.combine(appointment.date, appointment.time);
      const success = await appointmentApi.create(dt, appointment.actions, appointment.treatment_id);

      if(success) {
        userMessage.toast('New appointment created!', 'success');

        this.refresh();
      }

      this.closeModal();
    },

    async handleScroll(event) {
      setTimeout(() => {
        this.loadNextAppointments();
        event.target.complete();
      }, 100);
    },

    async refresh() {
      appointmentApi.getUpcoming().then((result) => {
        this.appointments = helper.groupBy(result, 'date');

        this.appointmentIndex = 0;
        this.loadNextAppointments();
      });
    },

    async loadNextAppointments() {
      this.appointmentIndex += this.loadSize;

      if(this.appointmentIndex >= this.appointments.length - 1) {
        this.loadDisabled = true;
      }
    },

    async processAppointment(appointment) {
      userMessage.promptPayment(async amount => {
        let paymentSuccess = false;
        let appointmentSuccess = false;

        if(amount) {
          paymentSuccess = await paymentApi.create(amount, appointment.datetime, appointment.treatment.id);
        }
        else {
          paymentSuccess = true;
        }

        if(paymentSuccess) {
          appointmentSuccess = await appointmentApi.done(appointment.id);

          if(appointmentSuccess) {
            this.removeAppointment(appointment);
            userMessage.toast('The appointment is finished!', 'success');
          }
        }
      });
    },

    async cancelAppointment(appointment) {
      appointmentApi.cancel(appointment.id).then(success => {
        if(success) {
          this.removeAppointment(appointment);
          userMessage.toast('The appointment is cancelled!', 'danger');
        }
      });
    },

    removeAppointment(appointment) {
      const index = this.appointments.findIndex(a => a.date === appointment.date);
      const appointmentsOnDate = this.appointments[index];
      appointmentsOnDate.infos = appointmentsOnDate.infos.filter(a => a.id !== appointment.id);
      
      if(appointmentsOnDate.infos.length === 0) {
        this.appointments.splice(index, 1);
      }
    },

    combine(firstPart, secondPart) {
      return helper.combine(firstPart, secondPart);
    }
  }
});
</script>