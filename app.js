import { fetch_file } from './modules/fetch.mjs';
import { process_catalog } from './modules/processing.mjs';
import fetch from 'node-fetch';

// These will live inside collection_body.item[]
var example_folder = {
  "name": "Folder Name",
  "item": [
  ]
}

// This isn't used yet... might scrap it
function forEachFeature(api_name, feature){
  feature_array = Object.entries(feature);
  for(i=0;i<feature_array.length;i++){
    feature_name = feature_array[i][0]
    feature_url = feature_array[i][1].openAPI

    fetch_json.fetch_json(api_name,feature_name,feature_url)
  }
}

var catalog = await fetch_file("https://api.hubspot.com/api-catalog-public/v1/apis");

process_catalog(catalog);
