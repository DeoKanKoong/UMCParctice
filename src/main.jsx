// src/index.jsx (또는 main.jsx)
import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18의 createRoot
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // QueryClientProvider 추가
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const queryClient = new QueryClient(); // QueryClient 생성

const container = document.getElementById('root');
const root = createRoot(container); // createRoot 사용

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
