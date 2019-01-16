// @flow
/*::
type ErrorWithStatus = Error & {
  'status'?: integer,
  'responseText'?: string
}; */


/** @function */
export default async( url/*: string*/ )/*: Promise<string>*/ => {
  url = 'https://www.interaction-design.org' + url;

  let response/*: Response*/ = await fetch( url, { 'method': 'GET' });
  if( response.ok ) return response.text();

  let error/*: ErrorWithStatus*/ = new Error( response.statusText );
  error.status = response.status;
  try {
    error.responseText = await response.text();
  }
  catch ( error ) {}

  throw error;
};
