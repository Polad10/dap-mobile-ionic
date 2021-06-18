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
      <i class="large calendar check outline icon"></i>
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
    <div
      id="treatment_list"
      class="ui large divided selection tab list"
      data-tab="treatments"
    >
      <div class="item">
        <div class="list_icon right floated content">
          <i class="angle right icon"></i>
        </div>
        <div class="middle aligned content">
          <div class="header">Snickerdoodle</div>
          An excellent companion
        </div>
      </div>
      <div class="item">
        <div class="list_icon right floated content">
          <i class="angle right icon"></i>
        </div>
        <div class="middle aligned content">
          <div class="header">Poodle</div>
          A poodle, its pretty basic
        </div>
      </div>
      <div class="item">
        <div class="list_icon right floated content">
          <i class="angle right icon"></i>
        </div>
        <div class="middle aligned content">
          <div class="header">Paulo</div>
          He's also a dog
        </div>
      </div>
    </div>
    <div class="ui tab segment" data-tab="appointments">
      <p>appointments</p>
    </div>
  </div>

  <div class="ui overlay fullscreen modal">
    <div class="header">Header</div>
    <div class="content">
      <div class="ui vertical segment pt-0 mt-10 pb-20">
        <h3 class="ui header">
          Patient Name
          <div class="sub header">
            Diagnosis Diagnosis Diagnosis Diagnosis Diagnosis Diagnosis
            Diagnosis Diagnosis
          </div>
        </h3>
        <div id="treatment_overview" class="ui two column grid mt-20">
          <div class="column">
            <h4 class="ui header">
              <i class="blue calendar alternate outline icon"></i>
              <div class="content">
                17 Feb 2020
                <div class="sub header">Start Date</div>
              </div>
            </h4>
          </div>
          <div class="column">
            <h4 class="ui header">
              <i class="teal dollar sign icon"></i>
              <div class="content">
                12.500
                <div class="sub header">Price left to be paid</div>
              </div>
            </h4>
          </div>
          <div class="column">
            <h4 class="ui header">
              <i class="blue calendar alternate icon"></i>
              <div class="content">
                20 Feb 2020
                <div class="sub header">End Date</div>
              </div>
            </h4>
          </div>
          <div class="column">
            <h4 class="ui header">
              <i class="teal hospital outline icon"></i>
              <div class="content">
                Ongoing
                <div class="sub header">Treatment Status</div>
              </div>
            </h4>
          </div>
        </div>
      </div>
      <div class="ui vertical segment mt-5">
        <h4 class="ui header">
          Extra Info
        </h4>
        <div class="treatment_container">
          <div class="ui extra_info_segment segment">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in
            porttitor ante. Pellentesque finibus lorem eget tempor fringilla.
            Maecenas facilisis, arcu at ultrices ultrices, libero nisl posuere
            urna, at tempor metus mauris faucibus erat.
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui approve button">Approve</div>
      <div class="ui button">Neutral</div>
      <div class="ui cancel button">Cancel</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  mounted() {
    setTimeout(() => {
      window.$(".menu .item").tab();
      window
        .$(".overlay.fullscreen.modal")
        .modal("attach events", "#treatment_list .item", "show");
    }, 400);
  },
});
</script>
