import { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import "../styles/Global.css";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
