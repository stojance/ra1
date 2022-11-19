import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-virtualized/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'

library.add(fas);

const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);
registerServiceWorker();
