servers.Route.augment({
    initialize: function(parent, app) {
        parent.call(this, app);
        this.post('/recaptcha-submit', servers.ReCaptcha.verifyReCaptcha);
    }
});
