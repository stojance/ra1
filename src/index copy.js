import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-virtualized/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'

library.add(fas);

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
