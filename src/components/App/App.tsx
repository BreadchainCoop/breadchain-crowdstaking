import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useModal } from '../../hooks/useModal';
import { useToast } from '../../hooks/useToast';
import Bake from '../../routes/bake';
// import DashBoard from '../../routes/dashboard';
import Footer from '../Footer';
import Header from '../Header';
import Modal from '../Modal';
import Toast from '../Toast/Toast';
import AppContainer from './ui/AppContainer';
import * as Main from './ui/Main';

const About = lazy(() => import('../../routes/about'));
const FAQ = lazy(() => import('../../routes/faq'));

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
          <Route
            path="/"
            element={
              <Suspense>
                <Bake />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/faq"
            element={
              <Suspense>
                <FAQ />
              </Suspense>
            }
          />
          {/* <Route path="/dashboard" element={<DashBoard />} /> */}
        </Routes>
      </Main.Main>

      <Footer />
    </AppContainer>
  );
}

export default App;
