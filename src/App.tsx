import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { CyclesContextProvider } from "./context/cyclesContext";
import AudioPlayer from "./pages/home/components/radio";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <CyclesContextProvider>
          <AudioPlayer />
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
