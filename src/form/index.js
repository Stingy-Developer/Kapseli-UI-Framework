const ajaxable = require("ajaxable");
const onChange = require("on-change");
import { Event } from "../event/index";

class AJAXForm {
  constructor(config) {
    this.forms = onChange(config.forms ? config.forms : [], () => {
      this.init();
    });
    this.ajaxForms = [];
    this.config = config;
    this.event = new Event();
  }

  init() {
    this.forms.forEach((form) => {
      if (!this.get(form.id).length > 0) {
        ["start", "end", "response", "error"].forEach((label) => {
          this.event.register(`form:${form.id}:${label}`);
        });

        let ajaxForm = ajaxable("#" + form.id, form.options)
          .onStart(function (params) {
            // Make stuff before each request, eg. start 'loading animation',
            this.event.run(`form:${form.id}:start`, params);
          })
          .onEnd(function (params) {
            // Make stuff after each request, eg. stop 'loading animation'
            this.event.run(`form:${form.id}:end`, params);
          })
          .onResponse(function (res, params) {
            // Make stuff after on response of each request
            this.event.run(`form:${form.id}:response`, [res, params]);
          })
          .onError(function (err, params) {
            // Make stuff on errors
            this.event.run(`form:${form.id}:error`, [err, params]);
          });

        this.ajaxForms.push({
          ...form,
          ajaxForm: ajaxForm,
          isInitilazed: true,
        });
      } else {
        this.ajaxForms.push(form);
      }
    });
  }

  get(id) {
    return this.ajaxForms.filter((form) => form.id === id);
  }

  submit(id) {
    let form = this.get(id);
    if (form.length > 0) {
      try {
        form[0].ajaxForm.submit();
      } catch (error) {
        console.error(`FormError: '${id}' form => ${error}`);
      }
    } else {
      console.error(`FormError: '${id}' form => This form is not found!`);
    }
  }
}

export { AJAXForm };
