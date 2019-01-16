// @flow
import './polyfills';
import getInitialData from './getInitialData';
import loadArticles from './loadArticles';
import render from './render';


/** @class */
window.IdfWidget = class {
  /*::
  _articlesElement: HTMLElement;
  _initialDataReceived: Promise<HTMLElement>;
  _lastArticleName: string;
  _parentElement: HTMLElement;
  _partnerName: string;

  render( parentElement?: HTMLElement ): Promise<void>{
    return Promise.resolve();
  }
  _loadArticles(): Promise<void>{
    return Promise.resolve();
  }
  */
  constructor( params ) {
    if( !params || typeof params !== 'object' ) {
      throw new TypeError( 'Parameters must be specified as object' );
    }
    let {
      // For other frontend developers to make delayed render
      autostart = true,
      'element': parentElement,
      partnerName
    } = params;

    // TODO add support of jQuery and string

    // Paremeters validation
    if( parentElement === undefined ) {
      throw new TypeError( 'Please specify "element" parameter' );
    }
    if( !( parentElement instanceof HTMLElement ) ) {
      throw new TypeError( 'Please specify "element" parameter as a HTMLElement' );
    }

    if( partnerName === undefined ) {
      throw new TypeError( 'Please specify "partnerName" parameter' );
    }
    if( typeof partnerName !== 'string' ) {
      throw new TypeError( 'Please specify "element" parameter as a string' );
    }

    if( typeof autostart !== 'boolean' ) {
      throw new TypeError( 'Please specify "autostart" parameter as a boolean' );
    }

    // Bindind methods // flow ignore next line
    this.render = render.bind( this ); // flow ignore next line
    this._loadArticles = loadArticles.bind( this );

    // Internal variables
    this._initialDataReceived = ( async() => {
      let { element, lastArticleName }/*: InitialData*/ =
        await getInitialData( partnerName );
      this._lastArticleName = lastArticleName;
      {
        let articlesElement/*: HTMLElement | null*/ =
          element.querySelector( 'ul.articlesWidget__articles' );
        if( !articlesElement ) {
          throw new Error( 'Looks like backend code changed' );
        }
        this._articlesElement = articlesElement;
      }

      return element;
    })();
    if( parentElement ) this._parentElement = parentElement;
    this._partnerName = partnerName;

    if( autostart ) this.render();
  }

  /** @method */
  async destroy()/*: Promise<void>*/ {
    let element = await this._initialDataReceived;
    if( element.parentElement ) element.parentElement.removeChild( element );
  }
};
