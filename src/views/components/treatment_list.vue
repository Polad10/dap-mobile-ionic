<template>
	<add-button @add-new="openNewTreatment"></add-button>
    <ion-list>
        <ion-item detail="true" button v-for="t in treatments.slice(0, treatmentIndex)" :key="t.id" @click="$emit('treatment-selected', t)">
            <ion-label>
                <h2>{{t.diagnosis}}</h2>
                <h3>Start date: {{toISODate(t.start_date)}}</h3>
                <p>{{t.extra_info}}</p>
            </ion-label>
        </ion-item>
    </ion-list>
    <ion-infinite-scroll @ionInfinite="handleScroll($event)" threshold="100px" id="infinite-scroll" :disabled="loadDisabled">
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more data..."></ion-infinite-scroll-content>
    </ion-infinite-scroll>
</template>

<script>
import { modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { treatmentApi } from '../../api/treatment.js';
import { datetime } from '../../helpers/datetime.js';
import NewTreatment from '../new_entry/new_treatment.vue';
import { userMessage } from '../../helpers/user_message.js';
import AddButton from './add_button.vue';

export default defineComponent({
    name: 'TreatmentList',
    props: {
        patient: {type: Object, default: null}
    },
	components: { AddButton },
    data() {
        return {
            treatments: [],
            treatmentIndex: 0,
            loadSize: 8,
            loadDisabled: false
        }
    },
    mounted() {
        this.refresh();
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

        async closeModal() {
            modalController.dismiss();
        },

        toISODate(date) {
            return datetime.toISODate(date);
        }
    }
})
</script>