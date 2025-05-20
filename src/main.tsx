import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router'
import router from './routes/router'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from './redux/store'
import { DarkModeProvider } from './provider/DarkModeProvider'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkModeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
          <Toaster richColors />
      </Provider>
    </DarkModeProvider>
  </StrictMode>,
)
