<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Patient Details</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content scrollY="false">
    <div class="ui inverted vertical center aligned segment">
      <div class="ui patient_details_container text container">
        <div class="ui image">
          <div class="floating ui grey circular icon label">
            <i class="pencil alternate icon"></i>
          </div>
          <img
            class="ui tiny avatar image"
            src="../../images/default-avatar.png"
          />
        </div>

        <h3 class="patient_name">{{ patient.first_name }} {{ patient.last_name }}</h3>
        <p class="patient_occupation">Patient</p>
      </div>
    </div>

    <div id="tabs" class="ui mt-0 mb-0 pointing secondary three item menu">
      <div id="about_tab" class="menu_item item active" data-tab="about">
        <i class="large user icon mr-0"></i>
        <div class="menu_text">About</div>
      </div>
      <div id="treatments_tab" class="menu_item item" data-tab="treatments">
        <i class="large tooth icon mr-0"></i>
        <div class="menu_text">Treatments</div>
      </div>
      <div id="appointments_tab" class="menu_item item" data-tab="appointments">
        <i class="large calendar check outline icon"></i>
        <div class="menu_text">Appointments</div>
      </div>
    </div>

    <div id="about_section">
      <about-patient :patient="patient"></about-patient>
    </div>

    <div id="treatments_section" style="overflow: auto; height: 63%">
      <treatment-list
        :patient="patient"
        class="ui tab segment"
        data-tab="treatments"
        @treatment-selected="handleTreatmentSelect"
      ></treatment-list>
    </div>

    <div id="appointments_section" style="overflow: auto; height: 63%">
      <appointment-list :patient="patient"></appointment-list>
    </div>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import TreatmentList from "../components/treatment_list.vue";
import AppointmentList from "../components/appointment_list.vue";
import AboutPatient from "../components/about_patient.vue"
import Treatment from './treatment.vue'
import { modalController } from "@ionic/core";

export default defineComponent({
  name: "Patient",
  props: {
    patient: { type: Object, default: null },
  },
  components: { TreatmentList, AppointmentList, AboutPatient },
  mounted() {
    this.$nextTick(() => {
      this.showSection('about')
      window.$("#tabs").on("click", ".menu_item", this.handleTabSelection);
    });
  },
  methods: {
    async handleTabSelection(e) {
      const tabName = window.$(e.currentTarget).data('tab');

      this.showSection(`${tabName}`)
    },

    async handleTreatmentSelect(treatment) {
      const modal = await modalController.create({
        component: Treatment,
        componentProps: {
          treatment: treatment
        }
      })

      return modal.present();
    },

    showSection(sectionName) {
      const active = 'active'

      window.$('#about_tab').removeClass(active)
      window.$('#appointments_tab').removeClass(active)
      window.$('#treatments_tab').removeClass(active)

      window.$('#about_section').hide()
      window.$('#appointments_section').hide()
      window.$('#treatments_section').hide()

      window.$(`#${sectionName}_tab`).addClass(active)
      window.$(`#${sectionName}_section`).show()
    }
  }
});
</script>
