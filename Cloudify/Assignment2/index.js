//  const baseUrl_Shopify = "https://Cloudify.myshopify.com/admin/api/2023-04/"
 
 
import shopifyAPI from 'shopify-node-api';


var Shopify = new shopifyAPI({
  shop: 'Cloudify', // MYSHOP.myshopify.com
  shopify_api_key: 'b30e1e4dede0035ba4a7250aa965e66a',
  access_token: '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' 
})

var auth_url = Shopify.buildAuthURL();
console.log(auth_url)

var post_data = {
  "product": {
    "title": "Burton Custom Freestlye 151",
    "body_html": "<strong>Good snowboard!</strong>",
    "vendor": "Burton",
    "product_type": "Snowboard",
    "variants": [
      {
        "option1": "First",
        "price": "10.00",
        "sku": 123
      },
      {
        "option1": "Second",
        "price": "20.00",
        "sku": "123"
      }
    ]
  }
}

Shopify.post('https://cloudify.myshopify.com/admin/api/2023-04/products.json', post_data, function(err, data, headers){
  console.log(data);
});