<template>
   <div class="notification" ref="notification">
      <div :class="`flash-notification alert alert-${notification.type}`">
         {{notification.message}}
      </div>
   </div>
</template>

<script>

export default {
   props:{
      notification: Object,
   },

   data(){
      return {
         timeout: 0
      }
   },

   methods: {

   },// methods{}

   mounted(){
      const note = this.$refs.notification;
      
      clearTimeout( this.timeout );

      this.timeout = setTimeout(() => {
         this.flash_notification_remove( this.notification.id );
         note.classList.add( '--closed' );
      }, 2000 );
   },

   beforeDestroy(){
      clearTimeout( this.timeout );
   }
}
</script>


<style scoped>
.notification
{
   max-height: 1024px;
   overflow: hidden;
   transition-property: all;
   transition-duration: 5s;
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}
.notification.--closed
{
   max-height: 0;
}
</style>
