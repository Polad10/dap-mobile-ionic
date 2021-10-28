<template>
  <div class="ui tabs_list relaxed divided list">
    <div class="item">
      <i class="large home middle aligned icon"></i>
      <div class="content">
        <div class="header">City</div>
        {{ patient.city }}
      </div>
    </div>
    <div class="item">
      <i class="large calendar alternate outline middle aligned icon"></i>
      <div class="content">
        <div class="header">Date of Birth</div>
        {{ birthDate }}
      </div>
    </div>
    <div class="item">
      <i class="large phone alternate middle aligned icon"></i>
      <div class="content">
        <div class="header">Phone Number</div>
        {{ patient.phone_number }}
      </div>
    </div>
    <div class="item">
      <i class="large info middle aligned icon"></i>
      <div class="content">
        <div class="header">Extra Info</div>
        {{ patient.extra }}
      </div>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import { DateTime } from 'luxon'

export default defineComponent({
    name: 'AboutPatient',
    props: {
        patient: {type: Object, default: null}
    },
    computed: {
        birthDate: function() {
            if(this.patient.dob) {
                return DateTime.fromISO(this.patient.dob).toLocaleString(DateTime.DATE_FULL)
            }

            return '';
        }
    }
})

</script>