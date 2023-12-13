// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  // Customize your theme here
});

export default theme;

// src/index.js or App.js
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
