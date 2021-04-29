<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Patient Details</ion-title>
    </ion-toolbar>
  </ion-header>
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

      <h3 class="patient_name">Amelia Kezia</h3>
      <p class="patient_occupation">
        Patient
      </p>
    </div>
  </div>
  <div class="ui mt-0 mb-0 pointing secondary three item menu">
    <div class="menu_item item active" data-tab="about">
      <i class="large user icon mr-0"></i>
      <div class="menu_text">About</div>
    </div>
    <div class="menu_item item" data-tab="treatments">
      <i class="large tooth icon mr-0"></i>
      <div class="menu_text">Treatments</div>
    </div>
    <div class="menu_item item" data-tab="appointments">
      <i class="large tablets icon mr-0"></i>
      <div class="menu_text">Appointments</div>
    </div>
  </div>
  <div class="ui container">
    <div class="ui active tabs_segment tab segment" data-tab="about">
      <div class="tabs_segment_title">
        <span class="ui medium text">Patient Info</span>
        <button class="compact ui small basic right floated  icon button">
          <i class="edit icon"></i>
        </button>
      </div>
      <div class="ui tabs_list relaxed divided list">
        <div class="item">
          <i class="large home middle aligned icon"></i>
          <div class="content">
            <div class="header">City</div>
            Eindhoven
          </div>
        </div>
        <div class="item">
          <i class="large calendar alternate outline middle aligned icon"></i>
          <div class="content">
            <div class="header">Date of Birth</div>
            4 August 1997
          </div>
        </div>
        <div class="item">
          <i class="large phone alternate middle aligned icon"></i>
          <div class="content">
            <div class="header">Phone Number</div>
            +31615555060
          </div>
        </div>
        <div class="item">
          <i class="large info middle aligned icon"></i>
          <div class="content">
            <div class="header">Extra Info</div>
            An excellent companion
          </div>
        </div>
      </div>
    </div>
    <div class="ui tab" data-tab="treatments">
      <ion-list>
        <ion-item detail="true">
          <ion-label>Input</ion-label>
        </ion-item>
        <ion-item detail="true">
          <ion-label>Input</ion-label>
        </ion-item>
        <ion-item detail="true">
          <ion-label>Input</ion-label>
        </ion-item>
        <ion-item detail="true">
          <ion-label>Input</ion-label>
        </ion-item>
      </ion-list>
    </div>
    <!-- <div class="ui large divided selection tab list" data-tab="treatments">
      <div class="item">
        <div class="right floated content">
          <div class="ui button">Add</div>
        </div>
        <img class="ui avatar image" src="../../images/bear.jpg" />
        <div class="middle aligned content">
          <div class="header">Snickerdoodle</div>
          An excellent companion
        </div>
      </div>
      <div class="item">
        <div class="right floated middle aligned content">
          <i class="cloud icon"></i>
        </div>
        <img class="ui avatar image" src="../../images/bear.jpg" />
        <div class="middle aligned content">
          <div class="header">Poodle</div>
          A poodle, its pretty basic
        </div>
      </div>
      <div class="item">
        <div class="right floated content">
          <button class="ui basic icon button">
            <i class="cloud icon"></i>
          </button>
        </div>
        <img class="ui avatar image" src="../../images/bear.jpg" />
        <div class="middle aligned content">
          <div class="header">Paulo</div>
          He's also a dog
        </div>
      </div>
    </div> -->
    <div class="ui tab segment" data-tab="appointments">
      <p>appointments</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  mounted() {
    setTimeout(() => {
      window.$(".menu .item").tab();
    }, 400);
  },
});
</script>
