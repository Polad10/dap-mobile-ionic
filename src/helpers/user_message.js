import { toastController, alertController  } from '@ionic/vue'

async function toast(msg, color, position = 'bottom') {
    const toast = await toastController.create({
        message: msg,
        duration: 2000,
        color: color,
        position: position
      });

      return toast.present();
}

async function promptPayment(callback) {
    const alert = await alertController.create({
        header: 'Payment (optional)',
        inputs: [
            {
                name: 'amount',
                placeholder: 'Enter the amount...',
                type: 'number',
                min: 0
            }
        ],
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel'
            },
            {
                text: 'Confirm',
                handler: result => callback(result.amount)
            }
        ]
    });

    return alert.present();
}

const userMessage = {
    toast: toast,
    promptPayment: promptPayment
}

export { userMessage }