import '../css/app.css';
import './bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';


import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from './store'
import SearchProvider from './Context/SearchProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, 

                <SearchProvider>
                    <Provider store={store}>
                        <App {...props} />
                    </Provider>
                </SearchProvider>
   
        
            );
            return;
        }

        createRoot(el).render(<SearchProvider>
            <Provider store={store}>
                <App {...props} />
            </Provider>
        </SearchProvider>);
    },
    progress: {
        color: '#4B5563',
    },
});
