<template>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="tertiary" @click="$emit('add-new')">
            <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
    </ion-fab>
</template>

<script>
import { defineComponent } from 'vue';
import { addOutline } from 'ionicons/icons';

export default defineComponent({
	name: 'AddButton',
    setup() {
        return {
            addOutline
        }
    }
})
</script>