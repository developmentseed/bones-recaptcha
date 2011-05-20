view = Backbone.View.extend({
    events: {
        'click #submit': 'submit'
    },

    initialize: function(options) {
        _.bindAll(this, 'render', 'submit');
        this.render();
    },

    render: function() {
        if (Bones.server) this.el = templates['Form']();
        return this;
    },

    submit: function() {
        var data = {
            url: '/recaptcha-submit',
            recaptcha_challenge_field: Recaptcha.get_challenge(),
            recaptcha_response_field: Recaptcha.get_response()
        };

        Backbone.sync('create', data, function() {
            // Success!
        }, function() {
            Recaptcha.reload();
        });
        return false;
    }
});
