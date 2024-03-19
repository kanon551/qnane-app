import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home';
import Layout from './utils/Layout';
import OrdersBookPage from './pages/OrdersBookPage';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
    <div>
      
          <Router>
                <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/ordersBook" element={<Layout><OrdersBookPage /></Layout>} />
                </Routes>
          </Router>
      
     
    </div>
    {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/> */}
    </QueryClientProvider>
  )
}
export default App