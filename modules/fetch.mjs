import fetch from 'node-fetch';
export {fetch_file};
async function fetch_file(url, callback){
  var res = await fetch(url);
  var data = res.json();
  return data;
}
