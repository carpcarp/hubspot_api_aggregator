import Converter from 'openapi-to-postmanv2';
import fs from 'fs'
import { fetch_file } from './fetch.mjs';
export {process_catalog};

function process_catalog(catalog){
  catalog = catalog
  for(let api of catalog.results){
    let api_name = api.name
    let features = api.features;
    console.log(`API: ${api_name}`)
    process_api(api)
  }

async  function process_api(api){

    let collection_body = {
      "item": [],
      "event": [],
      "variable": [
        {
          "type": "string",
          "value": "https://api.hubapi.com",
          "key": "baseUrl"
        }
      ],
      "info": {
        "name": "",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
        "description": {
          "content": "",
          "type": "text/plain"
        }
      }
    }
    collection_body.info.name = api.name;


    let feature_array = Object.entries(api.features);
    for(let feature of feature_array){

      let feature_name = feature[0];
      let feature_url = feature[1].openAPI;

      let swagger = await fetch_file(feature_url);
      let feature_postman = await convert_openapi_to_postman(swagger);

      var folder = {
        "name": feature_postman.info.name,
        "description": feature_postman.info.description,
        "item": feature_postman.item
      }
      collection_body.item.push(folder)
    }

    let final_colleciton = JSON.stringify(collection_body);
    fs.writeFileSync(`./api_collections/${api.name}.json`, final_colleciton);
    console.log(`Created api_collections/${api.name}.json`)
  }
}

async function convert_openapi_to_postman(swagger){
  let test = await Converter.convert({ type: 'json', data: swagger },
    {folderStrategy: "Tags"}, (err, conversionResult) => {
      if (!conversionResult.result) {
        console.log('Could not convert', conversionResult.reason);
      }
      else {
        let response = conversionResult.output[0].data
        return response
      }
    }
  )
  return test
}
