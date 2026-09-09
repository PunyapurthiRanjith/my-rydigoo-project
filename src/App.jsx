import ToastProvider from "./components/ToastProvider";
import NavigationStackComponent from "./navigation-stack/navigationStack";

function App() {
  return (
    <ToastProvider>
      <NavigationStackComponent />
    </ToastProvider>
  );
}

export default App;
