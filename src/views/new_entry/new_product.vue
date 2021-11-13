<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>New Product</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item ref="product_name_item">
      <ion-label position="stacked">Product Name</ion-label>
      <ion-input ref="product_name" type="text" placeholder="Enter product name..."></ion-input>
    </ion-item>
    <ion-item ref="quantity_item">
      <ion-label position="stacked">Quantity</ion-label>
      <ion-input ref="quantity" type="number" inputmode="numeric" min="1" value="1" placeholder="Enter quantity..."></ion-input>
    </ion-item>
    <ion-item ref="price_item">
      <ion-label position="stacked">Price</ion-label>
      <ion-input ref="price" type="numeric" inputmode="decimal" min="0.00" value="0.00" placeholder="Enter price..."></ion-input>
    </ion-item>
  </ion-content>
  <ion-footer>
      <ion-grid>
          <ion-row>
              <ion-col>
                  <ion-button color="danger" fill="solid" expand="block" @click="handleCancel">Cancel</ion-button>
              </ion-col>
              <ion-col>
                  <ion-button color="success" fill="solid" expand="block" @click="handleAdd">Add</ion-button>
              </ion-col>
          </ion-row>
      </ion-grid>
  </ion-footer>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, modalController } from '@ionic/vue'
import { defineComponent } from 'vue'
import { Product } from '../../models/product.js'

export default defineComponent({
    name: 'NewProduct',
    props: {
        cancelCallback: {type: Function, default: null},
        addCallback: {type: Function, default: null}
    },
    components: { IonContent, IonHeader, IonTitle, IonToolbar },
    methods: {
        async handleCancel() {
            this.cancelCallback();
        },

        async handleAdd() {
            if(this.verifyForm()) {
                const product_name = this.$refs.product_name.value
                const quantity = this.$refs.quantity.value
                const price = this.$refs.price.value

                const product = new Product(product_name, quantity, price)

                this.addCallback(product)
            }
        },

        verifyForm() {
            this.resetVerify()

            const productName = this.$refs.product_name.value
            const quantity = this.$refs.quantity.value
            const price = this.$refs.price.value

            const valid = productName && quantity && price

            if(!valid) {
                if(!productName) {
                    this.$refs.product_name_item.classList.add('field-invalid')
                }

                if(!quantity) {
                    this.$refs.quantity_item.classList.add('field-invalid')
                }

                if(!price) {
                    this.$refs.price_item.classList.add('field-invalid')
                }
            }

            return valid
        },

        resetVerify() {
            this.$refs.product_name_item.classList.remove('field-invalid')
            this.$refs.quantity_item.classList.remove('field-invalid')
            this.$refs.price_item.classList.remove('field-invalid')
        }
    }
})
</script>
