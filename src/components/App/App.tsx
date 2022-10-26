import { Routes, Route, Link } from 'react-router-dom';

import AppContainer from './ui/AppContainer';
import Header from '../Header';
import * as Main from './ui/Main';
import Footer from '../Footer';
import Modal from '../Modal';

import { useAppSelector } from '../../store/hooks';

import Toast from '../Toast/Toast';
import { Pantry } from '../Pantry';
import Index from '../../routes/Index';
import About from '../../routes/Info';
import SiteTitle from '../SiteTitle/SiteTitle';
import { useToast } from '../../context/ToastContext';

function App() {
  const appState = useAppSelector((state) => state);

  const { modal } = appState;

  const { state: toast } = useToast();

  return (
    <AppContainer>
      {modal.type !== null && <Modal modal={modal} />}
      {toast && <Toast type={toast.type} message={toast.message} />}
      <Header />

      <SiteTitle />
      <Main.Main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/pantry" element={<Pantry />} />
        </Routes>
      </Main.Main>

      <Footer>
        <Link to="/pantry" className="opacity-0 hover:opacity-100 px-4 py-2">
          pantry
        </Link>
      </Footer>
    </AppContainer>
  );
}

export default App;
