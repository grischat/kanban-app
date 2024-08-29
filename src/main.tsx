import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store/redux';

// Type definition for the root element
const rootElement = document.getElementById('root');

// Ensure that rootElement is not null
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    );
}
