<template>
   <div class="notification" ref="notification">
      <div :class="`notification__alert alert alert-${notification.type}`">
         <div class="notification__text">
            {{notification.message}}
         </div>
         <div class="notification__icon-close" title="Close this notification" @click="close_notification()">
            <i>&times;</i>
         </div>
      </div>
   </div>
</template>

<script>

export default {
   props:{
      notification: Object,
   },// /props{}

   data(){
      return {
         timeout: 0,
      };
   },// /date()

   computed:{
      flash_notifications(){
         return this.flash_notification_state.flash_notifications;
      },// /flash_notifications()
   },// /computed{}

   methods: {
      close_notification(){
         const note = this.$refs.notification;
         this.flash_notification_remove( this.notification.id );
         note.classList.add( '--closed' );
      },// /close_notification()

   },// methods{}

   mounted(){
      console.info( 'mounted....');
      
      // clearTimeout( this.timeout );

      // this.timeout = setTimeout(() => {
      //    this.flash_notification_remove( this.notification.id );
      //    note.classList.add( '--closed' );
      // }, 2000 );
   },// /mounted()

   beforeDestroy(){
      clearTimeout( this.timeout );
   },// /beforeDestroy()
};
</script>


<style scoped>
/* 
.notification
{
   max-height: 1024px;
   opacity: 1;
   overflow: hidden;
   transition-property: opacity;
   transition-duration: 5s;
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
} */

.notification.--closed
{
   /* opacity: 0; */
   display: none;
}

.notification__alert
{
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100%;
   padding: 0;
   /* padding: 1em; */
}

.notification__text
{
   padding: 0.5em 1em 0.5em 1em;
}

.notification__icon-close
{
   padding: 0.5em 1em 0.5em 1em;
   cursor: pointer;
}

.notification__icon-close i
{
   font-weight: bold;
   font-size: 1.5em;
}

.notification__icon-close:hover
{
   background-color: rgba( 0, 0, 0, 0.25 );
}
</style>
