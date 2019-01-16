// @flow
let parser = new DOMParser();


export default ( html/*: string*/ )/*: Array<HTMLElement>*/ => {
  let doc = parser.parseFromString( html, 'text/html' );
  if( !doc.body ) throw new Error( 'No body in document of HTML fragment' );

  return Array.from( doc.body.children );
};
