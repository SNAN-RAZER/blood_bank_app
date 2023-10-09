import { Button, Form, Input, Radio } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../apicalls/userApiCalls/userApi';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';

const rules = [
    {
        required: true,
        message: "Required"
    }
]

const Login = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('donor');
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem('blood_bank_token')) {
            navigate('/')
        }
    })



    const onFinish = async (values) => {
        try {
            dispatch(setLoader(true));
            const response = await loginUser({ ...values, userType });
            if (response.success) {
                localStorage.setItem('blood_bank_token', response.data);
                message.success(response.message);
                navigate('/');
                dispatch(setLoader(false));
            }
            else {

                throw Error(response.response.data.message);
            }

        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);

        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-primary bg-cover ">

            <Form
                layout='vertical'
                className='bg-white rounded shadow grid p-5 gap-3 '
                onFinish={onFinish}
            >


                <h1 className="col-span-2 uppercase text-2xl">
                    <span className="text-primary">
                        Login - {userType}
                    </span>

                    <hr className='mt-2' />
                </h1>


                <Radio.Group
                    className='col-span-2 m-2'
                    value={userType}
                    onChange={(e) => {
                        setUserType(e.target.value)

                    }}
                    name={userType}
                >

                    <Radio value="donor">Donar</Radio>
                    <Radio value="hospital">Hospital</Radio>
                    <Radio value="organization">Organization</Radio>
                </Radio.Group>

                <div className="col-span-2">
                    <hr className='m-1' />
                </div>



                <Form.Item
                    label='Email'
                    name='email'
                    className='col-span-2'
                    rules={rules}
                >
                    <Input type='email' placeholder='Enter your Email id' />
                </Form.Item>


                <Form.Item
                    label='Password'
                    name='password'
                    rules={rules}
                    className='col-span-2'

                >
                    <Input type='password' />
                </Form.Item>




                <Button type='primary' className='col-span-2' htmlType='submit'>
                    Login
                </Button>
                <Link to='/register' className='col-span-2 text-center text-gray-700 underline' >
                    Don't have an account? Register
                </Link>

            </Form>




        </div>
    )
}

export default Login;