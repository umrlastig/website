jQuery(function($) {

  // language
	// Hide Language En when the web page loads
  $('.lang-fr').hide();
	$('.lang-en').show();
  $('.selectpicker').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    if(previousValue == 'English'){
      // find all content with .lang-en under the div post-content and hide it
      $(".lang-en").fadeToggle('slow',function() {
        // find all content with .lang-fr under the div post-content and show it
        $(".lang-fr").show(); });
    }
    else {
      // find all content with .lang-fr under the div post-content and hide it
      $('.lang-fr').fadeToggle('slow',function() {
        // find all content with .lang-en under the div post-content and show it
          $('.lang-en').show();});
    }
  });

});
