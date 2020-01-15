# vue-bootstrap-flash-notifications
Vue plugin to make it easy to add bootstrap styled alerts into flash notifications for your project.

## Install
```shell
yarn add https://github.com/lucentminds/vue-bootstrap-flash-notifications
```

or

```shell
npm install --save https://github.com/lucentminds/vue-bootstrap-flash-notifications
```


## Useage
Import and use the plugin. Make sure the bootstrap css is included somewhere in your project too.
```js
// Import bootstrap css.
import 'bootstrap/dist/css/bootstrap.css';

// Import plugin.
import VueBootstrapFlashNotifications from 'vue-bootstrap-flash-notifications';

// Use plugin.
Vue.use(VueBootstrapFlashNotifications);
```

Add the tag wherever you want to see the flash notifications.
```html
<vue-bootstrap-flash-notifications></vue-bootstrap-flash-notifications>
```

Create a notification from your Vue component using the global function. Notification type should follow whatever bootstrap alert types are.
```js
   this.flash_notification_add( 'primary', 'Look at this!');
   this.flash_notification_add( 'secondary', 'Meh.');
   this.flash_notification_add( 'success', 'Good job!');
   this.flash_notification_add( 'warning', 'Be careful!');
   this.flash_notification_add( 'danger', 'Oh noes!');
```

## Custom tag name

You do not have to use the full `vue-bootstrap-flash-notifications` html tag name to make this work. Simply define your own tag name when you use the plugin like this...

```js
...

// Use plugin.
Vue.use(VueBootstrapFlashNotifications,{
   tag_name: 'my-notifications'
});
```

Now you can use your custom tag called `my-notifications` like so...
```html
<my-notifications></my-notifications>
```
