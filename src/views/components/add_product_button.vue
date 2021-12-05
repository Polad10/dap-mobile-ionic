<template>
  <ion-button color="tertiary" fill="outline" expand="block" strong="true" @click="handleAddProduct">Add Product</ion-button>
</template>

<script>
import { modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import NewProduct from "../new_entry/new_product.vue";

export default defineComponent({
  name: "AddProductBtn",
  props: {
      addCallback: {type: Function, default: null}
  },
  methods: {
    async handleAddProduct() {
      const modal = await modalController.create({
        component: NewProduct,
        cssClass: "centered-modal",
        componentProps: {
          cancelCallback: this.closeModal,
          addCallback: (product) => {
            this.addCallback(product)
            this.closeModal()
          }
        },
      });
      
      return modal.present();
    },

    async closeModal() {
      modalController.dismiss();
    },
  },
});
</script>
