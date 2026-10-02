export const SHIPPING_FREE_THRESHOLD = 200;
export const SHIPPING_COST = 15;
export const TAX_RATE = 0.05;

export function calculateCheckoutTotals(subtotal: number) {
  const shipping =
    subtotal > SHIPPING_FREE_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
  const tax = subtotal * TAX_RATE;

  return {
    subtotal,
    shipping,
    tax,
    total: subtotal + shipping + tax,
  };
}
