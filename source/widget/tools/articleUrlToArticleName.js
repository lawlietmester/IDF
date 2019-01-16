// @flow
/** Extract article name from URL
@function */
export default ( articleUrl/*: string*/ )/*: string*/ => (
  articleUrl.split( '?' )[ 0 ].split( '/' ).slice( -1 )[ 0 ]
);
