import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { defaultTheme } from "./styles/themes/default";
import { lightTheme } from "./styles/themes/light";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { CyclesContextProvider } from "./context/cyclesContext";
import AudioPlayer from "./pages/home/components/radio";
import { SettingsContextProvider } from "./context/settingsContext";
import ToastContainer from "./components/Toast/toastContainer";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const storageJSON = localStorage.getItem("@habits-pomodoro:settings-1.0.0");

    const parsedJSON = storageJSON ? JSON.parse(storageJSON) : null;
    return parsedJSON ? (parsedJSON.theme ? parsedJSON.theme : "dark") : "dark";
  });

  return (
    <SettingsContextProvider theme={theme} setTheme={setTheme}>
      <ThemeProvider theme={theme === "dark" ? defaultTheme : lightTheme}>
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
