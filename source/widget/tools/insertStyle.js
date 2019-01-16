// @flow
/** Add CSS to page
@function
@param css - like '.class{ display: block; }' */
export default ( css/*: string*/ )/*: void*/ => {
  let head = document.head || document.getElementsByTagName( 'head' )[ 0 ];
  let style = document.createElement( 'style' );

  style.type = 'text/css';
  // flow ignore next line
  if( style.styleSheet ) style.styleSheet.cssText = css;
  else style.appendChild( document.createTextNode( css ) );

  head.appendChild( style );
};
