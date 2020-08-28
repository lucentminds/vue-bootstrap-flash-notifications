<template>
   <div class="flash-notifications">
      <flash-notification class="flash-notification" v-for="note in flash_notifications" :key="note.id" :notification="note"></flash-notification>
   </div>
</template>

<script>
import FlashNotification from './components/flash-notification';

export default {
   name: 'flash_notifications_main',

   components: {
      FlashNotification,
   },// /components{}

   computed:{
      flash_notifications(){
         return this.$flash_notifications_store.state.flash_notifications;
      },// /flash_notifications()
   },// /computed{}

   mounted(){
      this.flash_notification_register_main_component( this, 'dc9ec4e9-1c05-4aae-b0d6-310c960c3b1f' );
   },// /mounted()
};
</script>