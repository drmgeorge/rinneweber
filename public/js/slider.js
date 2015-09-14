$(function(){

	//RIGHT EAR
   $( "#right-conductive-loss" ).slider({
      range: "max",
      min: 0,
      max: 100,
      slide: function( event, ui ) {
        $( "#right-conductive-amount" ).val( ui.value );
      }
    });
    $( "#right-conductive-amount" ).val( $( "#right-conductive-loss" ).slider( "value" ) );

   $( "#right-cochlear-function" ).slider({
      range: "max",
      min: 0,
      max: 100,
      value: 100,
      slide: function( event, ui ) {
        $( "#right-cochlear-function-amount").val( ui.value );
      }
    });
    $( "#right-cochlear-function-amount" ).val( $( "#right-cochlear-function" ).slider( "value" ) );


    //LEFT EAR
   $( "#left-conductive-loss" ).slider({
      range: "max",
      min: 0,
      max: 100,
      slide: function( event, ui ) {
        $( "#left-conductive-amount" ).val( ui.value );
      }
    });
    $( "#left-conductive-amount" ).val( $( "#left-conductive-loss" ).slider( "value" ) );

   $( "#left-cochlear-function" ).slider({
      range: "max",
      min: 0,
      max: 100,
      value: 100,
      slide: function( event, ui ) {
        $( "#left-cochlear-function-amount").val( ui.value );
      }
    });
    $( "#left-cochlear-function-amount" ).val( $( "#left-cochlear-function" ).slider( "value" ) )
});
