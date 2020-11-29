import data       from '../json/msg.json'             // You can import JSON w/ @rollup/plugin-json
import dialogHTML from '../templates/dialog.html'     // You can import strings w/ rollup-plugin-string

import '../sass/dialog.scss';                         // Import the scss file so Rollup picks it up.

/**
 * Basic dialog extension w/ static show method
 */
export default class DemoDialog extends Dialog
{
   constructor(data, options)
   {
      super(data, options);
   }

   /**
    * This is where you would add any custom listener code in your dialog.
    *
    * @param html
    *
    * @override
    */
   activateListeners(html)
   {
      super.activateListeners(html);
   }

   /**
    * Convenience method to show dialog and return a Promise resolved when the button is clicked.
    *
    * @returns {Promise<unknown>}
    */
   static async show()
   {
      return new Promise((resolve) =>
      {
         new DemoDialog({
            title: 'Demo Rollup Dialog',
            content: Handlebars.compile(dialogHTML)(data),
            buttons: {
               ok: {
                  label: "Ok",
                  callback: async () =>
                  {
                     resolve(`Dialog OK clicked`);
                  }
               },
               error: {
                  label: "Throw Error",
                  callback: async () =>
                  {
                     throw new Error('Error to test stack trace of minified code.');
                  }
               }
            },
            default: "ok"
         }, { id: `DemoRollupDialog`}).render(true);
      });
   }
}