controller = Backbone.Controller.extend({
    routes: {
        '': 'captcha',
        '/': 'captcha'
    },

    captcha: function() {
        if (this.res) this.res.send(new views.Form().el);
        else new views.Form({ el: $('#backbone-Form') });
    }
});
