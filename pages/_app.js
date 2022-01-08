import "../styles/globals.css";
import { A11yUserPreferences } from "@react-three/a11y";

function MyApp({ Component, pageProps }) {
  return (
    <A11yUserPreferences>
      <Component {...pageProps} />
    </A11yUserPreferences>
  );
}

export default MyApp;
