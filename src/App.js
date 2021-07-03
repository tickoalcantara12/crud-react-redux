import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes, BrowserRouter as Router, } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import theme from "./theme";
import routes from "./routes";
import GlobalStyles from './components/GlobalStyles';


const App = () => {
    const routing = useRoutes(routes);
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            {routing}
        </ThemeProvider>
    );
};

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    );
};

export default AppWrapper;

