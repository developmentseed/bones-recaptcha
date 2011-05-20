# ReCAPTCHA for [Bones](https://github.com/developmentseed/bones)
Protects forms with a [reCAPTCHA](http://www.google.com/recaptcha) to prevent machines pretending to be humans from abusing a service.

## Usage

* To add a captcha to a form, add `<%= this.ReCaptcha() %>` to your form template code. 

* Protect your form/model submission endpoint with   
  `this.post('/endpoint-url', servers.ReCaptcha.verifyReCaptcha);`

* When submitting the form via AJAX, make sure you include these fields:

        var data = {
            recaptcha_challenge_field: Recaptcha.get_challenge(),
            recaptcha_response_field: Recaptcha.get_response()
        };

* In the error handler, call `Recaptcha.reload();` to display a new captcha.
