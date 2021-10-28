<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Treatment Details</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div class="ui container">
      <div class="ui vertical segment">
        <h3 class="ui header">
          {{ patientName }} (<span class="ui green text">{{ treatment.status }}</span>)
        </h3>
        <p>
            {{ treatment.diagnosis }}
        </p>
        <div id="treatment_overview" class="ui two column grid mt-20">
          <div class="column">
            <h4 class="ui header">
              <i class="blue calendar alternate outline icon"></i>
              <div class="content">
                {{ formatDateTime(treatment.start_date) }}
                <div class="sub header">Start Date</div>
              </div>
            </h4>
          </div>
          <div class="column">
            <h4 class="ui header">
              <i class="teal money bill alternate icon"></i>
              <div class="content">
                {{ totalPrice }}
                <div class="sub header">Total Price</div>
              </div>
            </h4>
          </div>
          <div class="column">
            <h4 class="ui header">
              <i class="blue calendar alternate icon"></i>
              <div class="content">
                {{ formatDateTime(treatment.end_date) }}
                <div class="sub header">End Date</div>
              </div>
            </h4>
          </div>
          <div class="column">
            <h4 class="ui header">
              <i class="teal hand holding usd icon"></i>
              <div class="content">
                {{ totalPaid }}
                <div class="sub header">Paid</div>
              </div>
            </h4>
          </div>
        </div>
      </div>
      <div class="ui vertical segment mt-5">
        <h4 class="ui header">Extra Info</h4>
        <div class="treatment_container">
          <div class="ui extra_info_segment segment">
            {{ treatment.extra_info }}
          </div>
        </div>
      </div>
    </div>
  </ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/vue'
import { defineComponent } from 'vue'
import { DateTime } from 'luxon'
import { productApi } from '../../api/product.js'
import { paymentApi } from '../../api/payment.js'

export default defineComponent({
    name: 'Treatment',
    props: {
        treatment: {type: Object, default: null}
    },
    components: { IonContent, IonHeader, IonTitle, IonToolbar },
    data() {
      return {
        products: [],
        payments: []
      }
    },
    mounted() {
      this.refresh()
    },
    methods: {
      async refresh() {
        this.products = await productApi.getForTreatment(this.treatment.id)
        this.payments = await paymentApi.getForTreatment(this.treatment.id)
      },

      formatDateTime(dateTime) {
        if(!dateTime) {
          return '-'
        }
        return DateTime.fromISO(dateTime).toLocaleString(DateTime.DATE_MED)
      }
    },
    computed: {
      patientName: function() {
        return `${this.treatment.patient.first_name} ${this.treatment.patient.last_name}`
      },

      totalPrice: function() {
        let totalPrice = 0;

        this.products.forEach(p => {
          totalPrice += p.quantity * p.price
        })

        return totalPrice
      },

      totalPaid: function() {
        let totalPaid = 0;

        this.payments.forEach(p => {
          totalPaid += p.amount
        })

        return totalPaid
      }
    }
})
</script>