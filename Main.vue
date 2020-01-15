<template>
   <div class="flash-notifications">
      <flash-notification class="flash-notification" v-for="note in flash_notifications" :key="note.id" :notification="note"></flash-notification>
   </div>
</template>

<script>
import FlashNotification from './components/flash-notification';

export default {
   components: {
      FlashNotification
   },
   computed:{
      flash_notifications(){
         return this.$flashNotificationsStore.state.flash_notifications;
      }
   }
}
</script>