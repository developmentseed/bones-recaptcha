

servers.Core.augment({
    initialize: function(parent, app) {
        parent.call(this, app);
        templates.ReCaptcha.publicKey = Bones.plugin.config.recaptchaPublicKey;
    }
});
