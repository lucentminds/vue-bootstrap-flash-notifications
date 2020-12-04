import Vue from 'vue';
import Main from './Main.vue';


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
var PURGE_DEBOUNCE_TIMEOUT = 0;

const force_main_component_update = function(){
   // Sometimes the main component does not notice the state changes.
   if( MAIN ){
      MAIN.$forceUpdate();
   }
};// /force_main_component_update()

const VueBootstrapFlashNotification = {
   Store: PluginStore,
   
   install: function( Vue, options ){
      const o_settings = Object.assign( {
         tag_name: 'vue-bootstrap-flash-notifications',

         /** 
          * Determines if route changes purge stale notifications. By default
          * notifications are visible between route change for at least three
          * seconds. If this is set to false this plugin will not automatically
          * purge stale notifications. The plugin user will have to call the
          * flash_notification_purge method manually somewhere.
          */
         purge_on_route_change: true,
      }, options );

      Vue.component( o_settings.tag_name, Main );
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

         watch: o_settings.purge_on_route_change ?{
            '$route' (){
               // Purge/remove stale flash notifications on route change.
               this.flash_notification_purge();
            }// /'$route'()
         } :null,// /watch()

         methods: {
            flash_notification_add( c_type, c_message ){
               const o_notification = {
                  type: c_type,
                  message: c_message,
                  time_create: new Date(),
               };

               const c_id = ''.concat( Math.floor( Math.random() * 10000000 ) );
               const o_note = Object.assign({
                  id: c_id
               }, o_notification );

               /** 
                * Add the new notification to this plugin's pluginStoreInstance
                * using the c_id as the state key. Eg. state[ c_id ] =  o_note;
                */
               Vue.set( this.$flash_notifications_store.state.flash_notifications, c_id, o_note );

               force_main_component_update();
            },// /flash_notification_add()

            flash_notification_remove( c_id ){
               delete this.$flash_notifications_store.state.flash_notifications[ c_id ];
               force_main_component_update();
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

            flash_notification_purge(){
               clearTimeout( PURGE_DEBOUNCE_TIMEOUT );

               PURGE_DEBOUNCE_TIMEOUT = setTimeout( this.flash_notification_purge_now, 50 );
            },// /flash_notification_purge()

            flash_notification_purge_now(){
               const time_now = new Date();

               clearTimeout( PURGE_DEBOUNCE_TIMEOUT );
               const o_notifications = this.$flash_notifications_store.state.flash_notifications;

               // Loop over each notification.
               for( let c_id in o_notifications ){
                  if( time_now - o_notifications[ c_id ].time_create > 3000 ){
                     delete this.$flash_notifications_store.state.flash_notifications[ c_id ];
                  }
               }// /for();
               
               force_main_component_update();
            },// /flash_notification_purge_now()
         },// /methods{}
      });
      
   }// /install()

};// /VueBootstrapFlashNotification{}

export default VueBootstrapFlashNotification;
