import React from 'react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
            backgroundImage: 'url("https://qnance.com/wp-content/uploads/2021/08/qlogo-sticky.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <Button
                variant="contained"
                sx={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold' }}
                onClick={() => navigate("/ordersBook")}
            >
                LOGIN
            </Button>
        </div>
    )
}

export default Home
