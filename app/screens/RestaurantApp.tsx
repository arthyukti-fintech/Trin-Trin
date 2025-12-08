import { StatusBar } from "react-native";
import { RestaurantDetails } from "../components/RestaurantDetails";
import { CartScreen } from "./CartScreen";
import { CheckoutScreen } from "./CheckoutScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme/styles";
export default function RestaurantApp() {
    const [currentScreen, setCurrentScreen] = useState("details");
    const [cart, setCart] = useState([]);
    const [favorite, setFavorite] = useState(false);

    const addToCart = (item) => {
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem.id === item.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (itemId) => {
        const existingItem = cart.find(cartItem => cartItem.id === itemId);
        if (existingItem.quantity === 1) {
            setCart(cart.filter(cartItem => cartItem.id !== itemId));
        } else {
            setCart(cart.map(cartItem =>
                cartItem.id === itemId
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            ));
        }
    };

    const getCartItemQuantity = (itemId) => {
        const item = cart.find(cartItem => cartItem.id === itemId);
        return item ? item.quantity : 0;
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            {currentScreen === "details" && (
                <RestaurantDetails
                    restaurant={restaurantData}
                    menu={menuData}
                    onNavigateToCart={() => setCurrentScreen("cart")}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    getCartItemQuantity={getCartItemQuantity}
                    cartCount={cartCount}
                    favorite={favorite}
                    setFavorite={setFavorite}
                />
            )}
            {currentScreen === "cart" && (
                <CartScreen
                    cart={cart}
                    onBack={() => setCurrentScreen("details")}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    cartTotal={cartTotal}
                    onCheckout={() => setCurrentScreen("checkout")}
                />
            )}
            {currentScreen === "checkout" && (
                <CheckoutScreen
                    cart={cart}
                    cartTotal={cartTotal}
                    onBack={() => setCurrentScreen("cart")}
                    restaurant={restaurantData}
                />
            )}
        </SafeAreaView>
    );
}