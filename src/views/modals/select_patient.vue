<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Select Patient</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-searchbar ref="search" type="search" placeholder="Enter patient name..." @ionInput="handleSearch"></ion-searchbar>
    <ion-list>
      <ion-item detail="true" button v-for="p in patients" :key="p" @click="handlePatientSelect(p.firstName + ' ' + p.lastName)">
        <ion-avatar slot="start">
          <img src="../../images/icon.png">
        </ion-avatar>
        <ion-label>
          <h2>{{p.firstName}} {{p.lastName}}</h2>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SelectPatient',
  props: {
    callback: {type: Function, default: null}
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
  components: { IonContent, IonHeader, IonTitle, IonToolbar },
  mounted() {
    setTimeout(() => {
      this.$refs.search.setFocus();
    }, 400);
  },
  methods: {
    async handleSearch(event) {
      const searchName = event.target.value;
      // to do
    },

    async handlePatientSelect(name) {
      this.callback(name);
    }
  }
});
</script>