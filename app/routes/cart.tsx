import { json, redirect, type ActionFunctionArgs } from '@shopify/remix-oxygen';
import { storefrontQuery } from '~/lib/shopify.server';

const CART_CREATE_MUTATION = `#graphql
  mutation cartCreate($cartInput: CartInput!) {
    cartCreate(input: $cartInput) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `#graphql
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function action({ request, context }: ActionFunctionArgs) {
  console.log('🛒 Cart action received!');
  
  const formData = await request.formData();
  const cartAction = formData.get('cartAction');
  const merchandiseId = formData.get('merchandiseId') as string;
  const quantity = parseInt(formData.get('quantity') as string) || 1;
  const cartId = formData.get('cartId') as string | null;

  console.log('📋 Form data:', { cartAction, merchandiseId, quantity, cartId });

  const apiOptions = {
    storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    storefrontApiToken: context.env.PUBLIC_STOREFRONT_API_TOKEN,
  };

  if (cartAction === 'ADD_TO_CART' && merchandiseId) {
    try {
      let checkoutUrl: string;

      if (cartId) {
        console.log('➕ Adding to existing cart:', cartId);
        // Add to existing cart
        const { data } = await storefrontQuery(
          CART_LINES_ADD_MUTATION,
          {
            cartId,
            lines: [
              {
                merchandiseId,
                quantity,
              },
            ],
          },
          apiOptions
        );

        console.log('📦 Cart lines add response:', data);

        if (data.cartLinesAdd.userErrors?.length > 0) {
          console.error('❌ User errors:', data.cartLinesAdd.userErrors);
          return json(
            { success: false, error: data.cartLinesAdd.userErrors[0].message },
            { status: 400 }
          );
        }

        checkoutUrl = data.cartLinesAdd.cart.checkoutUrl;
      } else {
        console.log('🆕 Creating new cart');
        // Create new cart
        const { data } = await storefrontQuery(
          CART_CREATE_MUTATION,
          {
            cartInput: {
              lines: [
                {
                  merchandiseId,
                  quantity,
                },
              ],
            },
          },
          apiOptions
        );

        console.log('📦 Cart create response:', data);

        if (data.cartCreate.userErrors?.length > 0) {
          console.error('❌ User errors:', data.cartCreate.userErrors);
          return json(
            { success: false, error: data.cartCreate.userErrors[0].message },
            { status: 400 }
          );
        }

        checkoutUrl = data.cartCreate.cart.checkoutUrl;
      }

      console.log('✅ Checkout URL created:', checkoutUrl);
      // Return checkout URL - client will handle redirect
      return json({ success: true, checkoutUrl });
    } catch (error) {
      console.error('❌ Error adding to cart:', error);
      return json(
        { success: false, error: error instanceof Error ? error.message : 'Failed to add to cart' },
        { status: 500 }
      );
    }
  }

  console.log('❌ Invalid action or missing merchandiseId');
  return json({ success: false, error: 'Invalid action' }, { status: 400 });
}

