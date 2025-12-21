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
  const formData = await request.formData();
  const cartAction = formData.get('cartAction');
  const merchandiseId = formData.get('merchandiseId') as string;
  const quantity = parseInt(formData.get('quantity') as string) || 1;
  const cartId = formData.get('cartId') as string | null;

  if (cartAction === 'ADD_TO_CART' && merchandiseId) {
    try {
      let checkoutUrl: string;

      if (cartId) {
        // Add to existing cart
        const { data } = await storefrontQuery(CART_LINES_ADD_MUTATION, {
          cartId,
          lines: [
            {
              merchandiseId,
              quantity,
            },
          ],
        });

        if (data.cartLinesAdd.userErrors?.length > 0) {
          return json(
            { success: false, error: data.cartLinesAdd.userErrors[0].message },
            { status: 400 }
          );
        }

        checkoutUrl = data.cartLinesAdd.cart.checkoutUrl;
      } else {
        // Create new cart
        const { data } = await storefrontQuery(CART_CREATE_MUTATION, {
          cartInput: {
            lines: [
              {
                merchandiseId,
                quantity,
              },
            ],
          },
        });

        if (data.cartCreate.userErrors?.length > 0) {
          return json(
            { success: false, error: data.cartCreate.userErrors[0].message },
            { status: 400 }
          );
        }

        checkoutUrl = data.cartCreate.cart.checkoutUrl;
      }

      // Return checkout URL - client will handle redirect
      return json({ success: true, checkoutUrl });
    } catch (error) {
      console.error('Error adding to cart:', error);
      return json(
        { success: false, error: error instanceof Error ? error.message : 'Failed to add to cart' },
        { status: 500 }
      );
    }
  }

  return json({ success: false, error: 'Invalid action' }, { status: 400 });
}

