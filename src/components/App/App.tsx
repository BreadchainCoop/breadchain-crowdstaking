import { Route, Routes } from 'react-router-dom';

import { useModal } from '../../hooks/ModalContext';
import { useToast } from '../../hooks/ToastContext';
import About from '../../routes/about';
import Bake from '../../routes/bake';
import DashBoard from '../../routes/dashboard';
import FAQ from '../../routes/faq';
import Footer from '../Footer';
import Header from '../Header';
import Modal from '../Modal';
import Toast from '../Toast/Toast';
import AppContainer from './ui/AppContainer';
import * as Main from './ui/Main';

function App() {
  const { state: modal } = useModal();

  const { state: toast } = useToast();

  return (
    <AppContainer>
      {modal && (
        <Modal type={modal.type} title={modal.title} status={modal.status} />
      )}
      {toast && <Toast type={toast.type} message={toast.message} />}

      <Header />

      <Main.Main>
        <Routes>
          <Route path="/" element={<Bake />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/dashboard" element={<DashBoard />} />
          {/* <Route path="/pantry" element={<Pantry />} /> */}
        </Routes>
      </Main.Main>

      <Footer />
    </AppContainer>
  );
}

export default App;
