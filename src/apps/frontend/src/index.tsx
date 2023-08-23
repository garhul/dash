import React from 'react';
import { MainView } from './pages/mainView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(<React.StrictMode>
  <MainView />
</React.StrictMode>);
