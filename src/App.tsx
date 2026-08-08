import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <AppRouter />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "#0f172a",
            color: "#fff",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}

export default App;
