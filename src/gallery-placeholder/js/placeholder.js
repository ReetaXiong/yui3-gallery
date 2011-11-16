// Plugin to support word counting
//
// 1. include this js file
// 2. YUI().use('placeholder', function (Y) { ...
// 3. Y.Manager.Placeholder.install('css rule to scan and init placeholder support'); // when run under IE, this still install placeholder behavior in scaned nodes
//
YUI().add('placeholder', function (Y) {
    var nativeSupport = ('placeholder' in document.createElement('input')),
        handleFocus = function () {
            this.removeClass('placeholder');
            this.setStyle('color', '#999');  
            
            if (this.get('value') === this.getAttribute('placeholder')) {
                this.set('value', '');
            }
        },
        handleBlur = function () {
            var v = this.get('value'),
                p = this.getAttribute('placeholder');

            if (v === p || v === '') {              
                this.setStyle('color', '#ccc');
            }
            
            if ((v === '') || (v === p)) {
                this.addClass('placeholder');
                this.set('value', p);
            }
        },
        installPH = function (O) {
            // only install once
            if (O.getAttribute('phok') === 1) {
                return;
            }
            O.setAttribute('phok', 1);

            // if no placeholder, stop
            var txtPH = O.getAttribute('placeholder');
            if (!txtPH) {
                return;
            }

            // handle focus, blur
            O.on('focus', handleFocus, O);
            O.on('blur', handleBlur, O);

            // if is already focused, run handleFocus 1 time
            if (O.compareTo(document.activeElement)) {
                handleFocus.call(O);
            } else {
                handleBlur.call(O);
            }
        };

    Y.namespace('Manager').Placeholder = {
        install: function (R) {
            if (nativeSupport) {
                return;
            }

            var nodes = R.each ? R : Y.all(R);
            if (!nodes) {
                return;
            }
            nodes.each(installPH);
        }
    };

}, '0.0.1', {
    requires: ['event', 'node']
});
