import AppRouter from "./routes/AppRouter";
import ToastProvider from "./context/ToastProvider";

function App() {
  return (
    <ToastProvider>
      <AppRouter />
    </ToastProvider>
  );
}

export default App;
