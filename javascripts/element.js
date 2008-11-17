var El = new Class({
  Implements: [ Events, Options ],
  initialize: function(options) {
    var el; // The DOM element
    
    // Transition out, hide element
    this.hide = function() {
      if (el) this.transition('out');
      // Fire hide event
      this.fireEvent('hide');
    }.bind(this);
    
    // Show element
    this.show = function(opts) {
      if (opts.element || opts.url || opts.template) {
        if (!opts.element)  delete this.options.element;
        if (!opts.url)      delete this.options.url;
        if (!opts.template) delete this.options.template;
      }
      this.setOptions(opts);
      options = this.options;
      
      // Fire show event
      this.fireEvent('show');
      
      // Remove el if exists
      if (el) el.empty();
      
      // Ajax request for HTML
      if (options.url) {
        new Request.HTML({
          url:  options.url,
          data: options.data,
          evalScripts: false,
          onSuccess: function(tree, elements, html, js) {
            // Inject el
            el = this.el = elements[0];
            el.inject(document.body);
            // Transition in
            this.transition('in');
            // Add click->hide event for close class
            if (options.close)
              el.getElements(options.close).addEvent('click', function(e) { e.stop(); this.hide(); }.bind(this));
            eval(js);
            // Fire showed event
            this.fireEvent('showed');
          }.bind(this)
        }).get();
      }
    };
    
    // Combines multiple transitions and applies it to the element
    this.transition = function(in_or_out) {
      var styles = {};
      var transitions = options.transition[in_or_out];
      if ($type(transitions) != 'array') transitions = [ transitions ];
      transitions.each(function(transition) {
        switch (transition) {
          case 'show':
            el.show();
            break;
          case 'hide':
            el.hide();
            break;
          case 'fade_in':
            el.setStyle('opacity', 0);
            styles.opacity = 1;
            break;
          case 'fade_out':
            el.setStyle('opacity', 1);
            styles.opacity = 0;
            break;
          case 'slide_from_top':
            el.setStyle('margin-top', -250);
            styles['margin-top'] = 0;
            break;
          case 'slide_to_top':
            el.setStyle('margin-top', 0);
            styles['margin-top'] = -250;
            break;
          case 'slide_from_bottom':
            el.setStyle('margin-top', 250);
            styles['margin-top'] = 0;
            break;
          case 'slide_to_bottom':
            el.setStyle('margin-top', 0);
            styles['margin-top'] = 250;
            break;
        }
      });
      el.set('morph', { duration: 'long' }).morph(styles);
    };
    
    // Initializer
    this.init = function(opts) {
      window.addEvent('domready', function() {
        // Default options
        this.options = {
          id: 'element',
          transition: { 'in': 'show', 'out': 'hide' }
        };
        this.setOptions(opts);
        options = this.options;
        // Add click->show event for a CSS selector
        if (options.trigger)
          $$(options.trigger).addEvent('click', function(e) { e.stop(); this.show(options); }.bind(this));
        // Show dialog on instanciation
        if (options.show) this.show();
        // Add to Global object
        Global.elements[options.id] = this;
        // Fire init event
        this.fireEvent('init');
        return this;
      }.bind(this));
      return true;
    };
    this.init(options);
  }
});

Element.implement({
  hide: function() {
    this.setStyle('display', 'none');
    return this;
  },
  show: function() {
    this.setStyle('display', '');
    return this;
  }
});

if (!Global) var Global = {};
Global.elements = {};