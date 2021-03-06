<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Select Treatment</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-list>
      <ion-item detail="true" button v-for="t in treatments" :key="t" @click="handleTreatmentSelect(t.diagnosis)">
        <ion-label>
          <h2>{{t.diagnosis}}</h2>
          <h3>Start date: {{t.startDate}}</h3>
          <p>{{t.extraInfo}}</p>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SelectTreatment',
  props: {
    callback: {type: Function, default: null}
  },
  data() {
    return {
      treatments: [
        {diagnosis: 'diagnosis1', startDate: '2020-01-01', extraInfo: 'extra blab blala lbal'},
        {diagnosis: 'diagnosis2', startDate: '2020-02-01'},
        {diagnosis: 'diagnosis3', startDate: '2020-03-01', extraInfo: 'extra blab blala lbal'},
        {diagnosis: 'diagnosis4', startDate: '2020-04-01'},
        {diagnosis: 'diagnosis5', startDate: '2020-05-01'},
        {diagnosis: 'diagnosis6', startDate: '2020-06-01', extraInfo: 'extra blab blala lbal'},
      ]
    }
  },
  components: { IonContent, IonHeader, IonTitle, IonToolbar },
  methods: {
    async handleTreatmentSelect(diagnosis) {
      this.callback(diagnosis);
    }
  }
});
</script>