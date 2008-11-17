{
  # Element adds a DOM element to the layout from a variety of sources.
  #
  # Defaults
  # ========
      :id => :element   # The ID asigned to your element
  #   :transition => {
  #     :in  => :show,  # These options take arrays for simultaneous effects
  #     :out => :hide   # :fade_in, :fade_out, :slide_from_top, :slide_to_top, :slide_from_bottom, :slide_to_bottom
  #   }
  #
  # Options
  # =======
  #   :close => '.close',       # CSS selector for a link to hide the element
  #   :show  => true,           # Show on instanciation?
  #
  #   Inject from
  #   ===========
  #     :element  => '#id',     # Selector or DOM element
  #     :url      => '/action', # URL to pull and render HTML from
  #     :template => '#id',     # Selector or DOM textarea element (JST)
  #
  #   Inject to
  #   =========
  #     :inject => '#id'        # Selector or DOM element (default: document.body)
}