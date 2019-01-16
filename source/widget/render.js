// @flow
import insertStyle from './tools/insertStyle';
import cssFonts from './css/fonts.css';
import cssMain from './css/main.css';


/** @method */
export default async function(
  parentElement/*::?: HTMLElement*/ = this._parentElement
)/*: Promise<void>*/ {
  if( !( parentElement instanceof HTMLElement ) ) {
    throw new TypeError( '".render" called without argument, specify any HTMLElement' );
  }
  if( parentElement !== this._parentElement ) this._parentElement = parentElement;

  let element = await this._initialDataReceived;

  // Clear sky
  Array.from( this._parentElement.childNodes ).forEach( node => {
    this._parentElement.removeChild( node );
  });

  // Apply styles
  insertStyle( cssFonts + cssMain );

  // Add event listeners
  let loadButton/*: HTMLElement | null*/ =
    element.querySelector( '.articlesWidget__loadMore button' );
  if( loadButton ) loadButton.addEventListener( 'click', this._loadArticles );

  // Insert widget in HTML
  console.log( element );
  parentElement.appendChild( element );
};
