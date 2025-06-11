import { Button } from '@/components/ui/button';
import useUserStore from '@/store/user';

export default function Cart(): React.JSX.Element {
  const { fetchCart } = useUserStore();

  const handleCheckout = (): void => {
    fetchCart();
  };
  return (
    <div>
      <Button onClick={handleCheckout}>Checkout</Button>
    </div>
  );
}
