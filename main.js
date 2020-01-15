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

const VueBootstrapFlashNotification = {
   Store: PluginStore,
   
   install: function( Vue, options ){
      const o_settings = Object.assign( {
         tag_name: 'vue-bootstrap-flash-notifications'
      }, options );

      Vue.component( o_settings.tag_name, Main );
      Vue.mixin({
         beforeCreate(){
            // Provide access to the plugin data.
            this.$flashNotificationsStore = pluginStoreInstance;
         },// /beforeCreate()

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
               
               Vue.set( this.$flashNotificationsStore.state.flash_notifications, c_id, o_note );
            },// /flash_notification_add()

            flash_notification_remove( c_id ){
               delete this.$flashNotificationsStore.state.flash_notifications[ c_id ];
            },// /flash_notification_remove()
         }
      });
      
   }// /install()

};// /VueBootstrapFlashNotification{}

export default VueBootstrapFlashNotification;
