// @flow
import ajax from './tools/ajax';
import articleUrlToArticleName from './tools/articleUrlToArticleName';
import htmlFragmentToElements from './tools/htmlFragmentToElements';


/** @method */
export default async function()/*: Promise<void>*/ {
  if( this._articlesLoading ) return;

  this._articlesLoading = true;

  let url/*: string*/ =
    `/widgets/articles/load-more/${this._lastArticleName}?ep=${this._partnerName}`;
  let html/*: string*/ = await ajax( url );

  let newArticles/*: Array<HTMLElement>*/ = htmlFragmentToElements( html );
  let lastArticle/*: HTMLElement*/ = newArticles.slice( -1 )[ 0 ];
  let lastArticleLink = lastArticle.querySelector( 'a.article__link' );
  if( !lastArticleLink ) throw new Error( 'No <a> found in fragment' );

  // flow ignore next line
  let lastArticleName/*: string*/ = articleUrlToArticleName( lastArticleLink.href );

  newArticles.forEach( element => {
    this._articlesElement.appendChild( element );
  });

  this._lastArticleName = lastArticleName;
  this._articlesLoading = false;
}
