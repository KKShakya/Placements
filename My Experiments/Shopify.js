//  const baseUrl_Shopify = "https://Cloudify.myshopify.com/admin/api/2023-04/"
 
 
import axios from 'axios';

// Shopify API credentials
const shopifyAPIKey = 'b30e1e4dede0035ba4a7250aa965e66a';
const shopifyAPIPassword = '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';
const shopifyStoreURL = 'https://ca7e85.myshopify.com';

// Pipedrive API token
const pipedriveAPIKey = '3f82194b740197b5f92b3df00574ee36452c03e7';

// Step 1: Get Shopify order
async function getShopifyOrder(orderId) {
  let completeUrl =  `${shopifyStoreURL}/admin/api/2023-04/orders.json`;
  console.log("Shopify url",completeUrl);
  try {
    const response = await axios.get(
     completeUrl,
      {
        auth: {
          username: shopifyAPIKey,
          password: shopifyAPIPassword
        }
      }
    );

    const order = response.data.order;
    console.log(response.data)
    return order;
  } catch (error) {
    throw new Error('Failed to get Shopify order');
  }
}

// Step 2: Find or create person in Pipedrive
async function findOrCreatePersonInPipedrive(email, firstName, lastName, phone) {
  try {
    // Search for person by email
    const searchResponse = await get(
      'https://api.pipedrive.com/v1/persons/find',
      {
        params: {
          term: email,
          api_token: pipedriveAPIKey
        }
      }
    );

    if (searchResponse.data.data.length > 0) {
      // Person found, return the person ID
      const personId = searchResponse.data.data[0].id;
      return personId;
    } else {
      // Person not found, create a new person
      const createResponse = await post(
        'https://api.pipedrive.com/v1/persons',
        {
          name: `${firstName} ${lastName}`,
          email,
          phone,
          api_token: pipedriveAPIKey
        }
      );

      const personId = createResponse.data.data.id;
      return personId;
    }
  } catch (error) {
    throw new Error('Failed to find or create person in Pipedrive');
  }
}

// Step 3: Find or create product in Pipedrive
async function findOrCreateProductInPipedrive(sku, name, price) {
  try {
    // Search for product by code (equivalent to SKU)
    const searchResponse = await get(
      'https://api.pipedrive.com/v1/products/find',
      {
        params: {
          term: sku,
          api_token: pipedriveAPIKey
        }
      }
    );

    if (searchResponse.data.data.length > 0) {
      // Product found, return the product ID
      const productId = searchResponse.data.data[0].id;
      return productId;
    } else {
      // Product not found, create a new product
      const createResponse = await post(
        'https://api.pipedrive.com/v1/products',
        {
          name,
          code: sku,
          prices: [{ price }],
          api_token: pipedriveAPIKey
        }
      );

      const productId = createResponse.data.data.id;
      return productId;
    }
  } catch (error) {
    throw new Error('Failed to find or create product in Pipedrive');
  }
}

// Step 4: Create deal in Pipedrive
async function createDealInPipedrive(personId, products) {
  try {
    const response = await post(
      'https://api.pipedrive.com/v1/deals',
      {
        title: 'New Deal',
        person_id: personId,
        products,
        api_token: pipedriveAPIKey
      }
    );

    const dealId = response.data.data.id;
    return dealId;
  } catch (error) {
    throw new Error('Failed to create deal in Pipedrive');
  }
}

// Step 5: Attach products to deal in Pipedrive
async function attachProductsToDealInPipedrive(dealId, products) {
  try {
    await post(
      `https://api.pipedrive.com/v1/deals/${dealId}/products`,
      {
        products,
        api_token: pipedriveAPIKey
      }
    );
  } catch (error) {
    throw new Error('Failed to attach products to deal in Pipedrive');
  }
}

// Main function to orchestrate the integration
async function integrateShopifyAndPipedrive(orderId) {
  try {
    // Step 1: Get Shopify order
    const order = await getShopifyOrder(orderId);

    // Step 2: Find or create person in Pipedrive
    const personId = await findOrCreatePersonInPipedrive(
      order.email,
      order.customer.first_name,
      order.customer.last_name,
      order.customer.phone
    );

    // Step 3: Find or create products in Pipedrive
    const products = [];
    for (const lineItem of order.line_items) {
      const productId = await findOrCreateProductInPipedrive(
        lineItem.sku,
        lineItem.name,
        lineItem.price
      );
      products.push({ product_id: productId });
    }

    // Step 4: Create deal in Pipedrive
    const dealId = await createDealInPipedrive(personId, products);

    // Step 5: Attach products to deal in Pipedrive
    await attachProductsToDealInPipedrive(dealId, products);
      // console.log(order)
    return 'success';
  } catch (error) {
    console.log("integrateShopifyAndPipedrive Error",error)
    return 'failure';
  }
}

// Example usage
const orderId = '5332226769198';
getShopifyOrder(orderId)
  .then(result => console.log(result))
  .catch(error => console.error(error));