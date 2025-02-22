import { AppProps } from "next/app"; // ✅ Importa AppProps de Next.js
import { AuthProvider } from "../context/AuthContext"; // ✅ Importa AuthProvider
import "../styles/globals.css"; // ✅ Importa estilos globales

function MyApp({ Component, pageProps }: AppProps) { // ✅ Tipamos con AppProps
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
