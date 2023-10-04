import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { CyclesContextProvider } from "./context/cyclesContext";
import AudioPlayer from "./pages/home/components/radio";
import { SettingsContextProvider } from "./context/settingsContext";
import ToastContainer from "./components/Toast/toastContainer";

function App() {
  return (
    <SettingsContextProvider>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <ToastContainer />
        <BrowserRouter>
          <CyclesContextProvider>
            <AudioPlayer />
            <Router />
          </CyclesContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </SettingsContextProvider>
  );
}

export default App;
