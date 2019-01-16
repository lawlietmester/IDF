// @flow
import ajax from './tools/ajax';
import articleUrlToArticleName from './tools/articleUrlToArticleName';
import htmlFragmentToElements from './tools/htmlFragmentToElements';


/** @function */
export default async( partnerName/*: string*/ )/*: Promise<InitialData>*/ => {
  let url/*: string*/ = '/widgets/articles?ep=' + partnerName; // `ep` is the slug for the given "ep" (Educational Partner)
  let html/*: string*/ = await ajax( url );
  let element/*: HTMLElement*/ = htmlFragmentToElements( html )[ 0 ];

  let lastArticleName/*: string*/ = ( () => {
    let nameHolder/*: HTMLElement | null*/ =
      element.querySelector( 'li.article:last-child a.article__link' );
    if( !nameHolder ) {
      throw new Error(
        'Last article name holder not found. Looks like backend code changed'
      );
    }

    // flow ignore next line
    return articleUrlToArticleName( nameHolder.href );
  })();

  return { element, lastArticleName };
};
