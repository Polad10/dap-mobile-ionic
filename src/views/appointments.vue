<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <appointment-list></appointment-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';
import AppointmentList from './components/appointment_list.vue';

export default defineComponent({
  name: 'Appointments',
  props: {
    title: {type: String, default: 'Appointments'}
  },
  components: { IonContent, IonPage, AppointmentList }
});
</script>