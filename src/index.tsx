import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store/store";

import './index.css';
import {
  LoginPage,
  SignUpPage,
  NotFoundPage,
  WelcomePage,
  DashboardPage,
  PersonaPage,
  ChatPage
} from './pages';
import RequireAuth from './components/RequireAuth/RequireAuth';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
          </Route>
            <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>}>
              <Route index element={<ChatPage /> }/>
              <Route path="personas" element={<PersonaPage />} />
            </Route>
          <Route path="/" element={<WelcomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
