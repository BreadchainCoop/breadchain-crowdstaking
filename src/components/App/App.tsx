import { Routes, Route, Link } from 'react-router-dom';

import AppContainer from './ui/AppContainer';
import Header from '../Header';
import * as Main from './ui/Main';
import Footer from '../Footer';
import Modal from '../Modal';

import Toast from '../Toast/Toast';
import { Pantry } from '../Pantry';
import About from '../../routes/Info';
import SiteTitle from '../SiteTitle/SiteTitle';
import { useToast } from '../../context/ToastContext';
import { useModal } from '../../context/ModalContext';
import Bake from '../../routes/bake';

function App() {
  const { state: modal } = useModal();

  const { state: toast } = useToast();

  return (
    <AppContainer>
      {modal && <Modal type={modal.type} title={modal.title} status={modal.status} />}
      {toast && <Toast type={toast.type} message={toast.message} />}

      <Header />

      <SiteTitle />
      <Main.Main>
        <Routes>
          <Route path="/" element={<Bake />} />
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
