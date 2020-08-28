import Vue from 'vue';
import Main from './Main';


class PluginStore {

   constructor (data = {}) {
      this.storeVM = new Vue({ data });
   }
   
   get state () {
      return this.storeVM.$data;
   }
}// /PluginStore()

const pluginStoreInstance = new PluginStore({
   // Determines temporary notifications from the web ui.
   flash_notifications: {},
});

var MAIN = null;

const VueBootstrapFlashNotification = {
   Store: PluginStore,
   
   install: function( Vue, options ){
      const o_settings = Object.assign( {
         tag_name: 'vue-bootstrap-flash-notifications'
      }, options );

      const ooga = Vue.component( o_settings.tag_name, Main );
      Vue.mixin({
         beforeCreate(){
            // Provide access to the plugin data.
            this.$flash_notifications_store = pluginStoreInstance;
         },// /beforeCreate()

         computed: {
            flash_notification_state (){
               return this.$flash_notifications_store.state;
            },// /flash_notification_state()

            flash_notification_state_flash_notifications (){
               return this.$flash_notifications_store.state.flash_notifications;
            },// /flash_notification_state_flash_notifications()
         },// /computed{}

         methods: {
            flash_notification_add( c_type, c_message ){
               const o_notification = {
                  type: c_type,
                  message: c_message
               };

               const c_id = ''.concat( Math.floor( Math.random() * 10000000 ) );
               const o_note = Object.assign({
                  id: c_id
               }, o_notification );
               
               Vue.set( this.$flash_notifications_store.state.flash_notifications, c_id, o_note );

               // Sometimes the main component does not notice the state changes.
               if( MAIN ){
                  MAIN.$forceUpdate();
               }
            },// /flash_notification_add()

            flash_notification_remove( c_id ){
               delete this.$flash_notifications_store.state.flash_notifications[ c_id ];

               // Sometimes the main component does not notice the state changes.
               if( MAIN ){
                  MAIN.$forceUpdate();
               }
            },// /flash_notification_remove()

            /**
             * 
             * @param {object} o_main_component Instance of main flash-notication component. There should only be one.
             * @param {string} c_key A unlikely accidental string to identify the caller of this function.
             */
            flash_notification_register_main_component( o_main_component, c_key ){
               // This just keeps anything else from breaking this component.
               if( c_key != 'dc9ec4e9-1c05-4aae-b0d6-310c960c3b1f' ){
                  return;
               }

               MAIN = o_main_component;
            },// /flash_notification_register_main_component()
         }
      });
      
   }// /install()

};// /VueBootstrapFlashNotification{}

export default VueBootstrapFlashNotification;
