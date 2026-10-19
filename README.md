# Mini Store - React 19 Assignment

A simple e-commerce web application built using **React 19** and **Vite**.

## Git Information
- **Branch**: `react19_assignment`

## React 19 Features Explained

### 1. How `use()` is implemented
- In `src/components/ProductList.jsx`, we use React 19's `use()` hook to read data directly from a Promise:
  ```jsx
  const products = use(productsPromise);
  ```
- We don't need `useEffect` or manual `isLoading` state. `use()` pauses the component render until the Promise is resolved.

### 2. How `<Suspense>` is used
- In `src/App.jsx`, `<Suspense>` wraps `<ProductList>`:
  ```jsx
  <Suspense fallback={<ProductListSkeleton />}>
    <ProductList productsPromise={productsPromise} ... />
  </Suspense>
  ```
- While products are being fetched, it displays clean skeleton placeholder cards instead of an empty screen.

### 3. How `useActionState()` is used
- In `src/components/RegistrationForm.jsx`, we use `useActionState()` to handle the registration form:
  ```jsx
  const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
    // Read form values, validate, and call API
  }, initialState);
  ```
- We attach it directly to `<form action={formAction}>`. We do not use traditional `onSubmit` or `e.preventDefault()`. It manages validation errors, pending state, and success feedback automatically.

### 4. How `useFormStatus()` is used
- In `src/components/RegistrationForm.jsx`, we created a separate `SubmitButton` component inside the form:
  ```jsx
  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <button type="submit" disabled={pending}>
        {pending ? 'Creating Account...' : 'Create Account'}
      </button>
    );
  }
  ```
- `useFormStatus()` must be called inside a child component of `<form>`. It disables the button and shows a spinner while the form is submitting.

### 5. How Context is implemented using React 19 syntax
- In `src/context/UserContext.jsx`, we use the new React 19 syntax:
  ```jsx
  <UserContext value={value}>
    {children}
  </UserContext>
  ```
  Instead of `<UserContext.Provider value={value}>`.
- The registered user's name is saved in this context and shown in the header.

### 6. Which Asset Loading APIs were selected and why
In `src/App.jsx`, we use functions from `react-dom`:
- **`preconnect()` and `prefetchDNS()`**: Used for `https://images.unsplash.com`. This connects early to the external image server so product images load faster.
- **`preload()`**: Preloads the first product image so the main image shows up immediately without layout delay.

### 7. How Document Metadata is implemented
In React 19, we write `<title>` and `<meta>` tags directly inside our components:
- `App.jsx`: `<title>Mini Store – Products</title>`
- `ProductDetails.jsx`: `<title>{product.name} – Mini Store</title>`
- `RegistrationForm.jsx`: `<title>Register – Mini Store</title>`
React automatically hoists these tags into the browser's `<head>`.

### 8. Add to Cart with `useOptimistic()`
- In `src/App.jsx`, when the user clicks "Add to Cart", the cart count updates immediately using `useOptimistic()`:
  ```jsx
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    cartItems,
    (currentItems, newItem) => [...currentItems, newItem]
  );
  ```
- The user sees the count increase immediately while the request is running. If the server request fails, React automatically rolls back the cart count to the original count.

### 9. Ref as a Prop (No `forwardRef`)
- In `src/components/CustomInput.jsx`, the component accepts `ref` directly as a normal prop without `forwardRef()`:
  ```jsx
  export function CustomInput({ label, ref, ...props }) {
    return <input ref={ref} {...props} />;
  }
  ```
- We use this to focus the Full Name input when opening registration, and to clear and re-focus the search box.

### 10. Callback Ref Cleanup
- In `src/components/ProductDetails.jsx`, the container uses a callback ref that attaches an `Escape` key event listener on mount, and returns a cleanup function:
  ```jsx
  ref={(element) => {
    if (!element) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }}
  ```
- When the user leaves the details page, React runs the returned cleanup function automatically.

### 11. Server and Client Components
- **Why Product Details can be a Server Component**: The product name, price, image, and description are static data. Fetching and rendering them on the server sends pure HTML to the browser with zero extra JavaScript bundle size.
- **Why Add to Cart must be a Client Component**: The "Add to Cart" button needs click events, local state, and `useOptimistic()`, which require running JavaScript in the browser.
- **How they work together**: The Server Component (`ProductDetails`) renders the static layout and nests the interactive Client Component (`AddToCartButton`) inside it.

### 12. React Compiler
- **What it does**: React Compiler automatically analyzes code at build time and memoizes values and functions so components only re-render when needed.
- **How it helps this app**: We don't have to write manual `useMemo` or `useCallback` everywhere.
- **Example from this app**:
  In `ProductList.jsx`:
  ```javascript
  const filtered = products.filter((item) => ...);
  ```
  Without React Compiler, we would need `useMemo` to prevent re-filtering on every render. With React Compiler, this is memoized automatically.

---
