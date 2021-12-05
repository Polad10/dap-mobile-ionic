<template>
  <ion-list>
    <ion-list-header color="light">
      <h5>
        Products <ion-text v-if="showTotalPrice">( Total: <ion-text color="primary">{{ totalPrice }} ₼ )</ion-text></ion-text>
      </h5>
    </ion-list-header>
    <ion-item-sliding ref="product_slide" v-for="(product, index) in products" :key="product.id">
      <ion-item-options>
        <ion-item-option color="danger" @click="handleRemoveProduct(product, index)">Remove</ion-item-option>
      </ion-item-options>
      <ion-item lines="full">
        <ion-label slot="start">{{ product.name }}</ion-label>
        <ion-label slot="start">{{ product.price }} ₼</ion-label>
        <ion-label slot="end">x {{ product.quantity }}</ion-label>
      </ion-item>
    </ion-item-sliding>
  </ion-list>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProductList',
    props: {
        products: {type: Array, default: () => []},
        showTotalPrice: {type: Boolean, default: false}
    },
    methods: {
        async handleRemoveProduct(product, index) {
            this.$refs.product_slide.closeOpened()

            this.$emit('remove-product', product, index)
        }
    },
    computed: {
        totalPrice: function() {
            let totalPrice = 0

            this.products.forEach(p => totalPrice += p.price * p.quantity)

            return totalPrice
        }
    }
})
</script>
