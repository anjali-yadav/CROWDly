import './App.css';
import {BrowserRouter} from 'react-router-dom'
import MainRouter from './MainRouter'
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// import {Provider} from 'react-redux';

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <Navbar />
          <MainRouter />
        <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
