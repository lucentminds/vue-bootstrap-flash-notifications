/* global describe:false */
/* global expect:false */
/* global it:false */

import { shallowMount } from '@vue/test-utils';
import FlashNotification from '@/components/flash-notification.vue';
jest.useFakeTimers();

describe('flash-notification.vue', () => {


   it('renders props.notification when passed', () => {
      const c_msg = 'Test success!';
      const o_note = {
         type: 'success',
         message: c_msg
      };
      const wrapper = shallowMount(FlashNotification, {
         propsData: { 
            notification: o_note
         }
      });
      expect(wrapper.text()).toMatch( c_msg );
   });


});
