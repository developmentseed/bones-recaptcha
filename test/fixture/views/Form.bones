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
            recaptcha_challenge_field: this.$('form input[name="recaptcha_challenge_field"]').val(),
            recaptcha_response_field: this.$('form input[name="recaptcha_response_field"]').val()
        };

        Backbone.sync('create', data, function() {
            console.warn('success');
        }, function() {
            console.warn('error');
        });
        return false;
    }
});
