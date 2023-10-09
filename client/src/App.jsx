import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ConfigProvider } from 'antd';
import Spinner from './components/Spinner';
import { useSelector } from 'react-redux';
import ProtectedPage from './components/ProtectedPage';
import Profile from './pages/Profile';

const App = () => {

    const { loading } = useSelector((state) => state.loaders);
    return (
        <ConfigProvider
            theme={{
                token: {
                    // Seed Token
                    colorPrimary: '#3F497F',



                },
            }}
        >
            {loading && <Spinner />}
            <BrowserRouter >
                <Routes>

                    <Route exact path='/' element={
                        <ProtectedPage>
                            <Home />
                        </ProtectedPage>

                    }

                    />



                    <Route exact path='/profile' element={
                        <ProtectedPage>
                            <Profile />
                        </ProtectedPage>

                    }

                    />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/register' element={<Register />} />

                </Routes>

            </BrowserRouter>
        </ConfigProvider>
    )
}

export default App