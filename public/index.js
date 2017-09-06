var app = function(){

  var url = "https://api.punkapi.com/v2/beers";
  makeRequest( url, requestComplete )


}

var makeRequest = function( url, callback ){
  var request = new XMLHttpRequest();
  request.open( 'GET', url );
  request.addEventListener( 'load', callback );
  request.send();
}

var requestComplete = function(){
  if ( this.status !== 200 ) return;
  var jsonString = this.responseText;
  var beers = JSON.parse( jsonString );
  assembleList( beers );
}

var assembleList = function( beers ) {

  var list = document.querySelector( '#beer-list' );

  for ( beer of beers ){

    var entry = createEntry( beer )
    for ( component of entry ) {
      list.appendChild( component );
    }

    list.appendChild( document.createElement( 'hr' ) );

  }


}

var createEntry = function( beer ) {
  var entry = [];
  entry.push( createListItem( { name: beer.name } ) );
  entry.push( createListItem( { image: beer.image_url }) );
  return entry;
}


var createListItem = function( params ) {
  var li = document.createElement( 'li' );
  if ( params.name ) li.innerText = params.name;
  if ( params.image ) {
    var image = document.createElement( 'img' );
    image.src = params.image;
    image.width = '50';
    li.appendChild( image );
  }
  return li;
}

window.addEventListener( 'load', app );