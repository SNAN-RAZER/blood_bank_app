import { Button, Form, Input, Radio } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import HospitalOrganizationForm from './HospitalOrganizationForm';


const rules = [
    {
        required: true,
        message: "Required"
    }
]

const Register = () => {

    const [userType, setUserType] = useState('donor');

    const onFinish = (values) => {
        console.log(values);
    }

    return (
        <div className="flex h-screen items-center justify-center bg-primary bg-cover flex-wrap">

            <Form
                layout='vertical'
                className='bg-white rounded shadow grid grid-cols-2 p-5 gap-3 w-1/2'
                onFinish={onFinish}
            >


                <h1 className="col-span-2 uppercase text-2xl">
                    <span className="text-primary">
                        Register - {userType}
                    </span>

                    <hr className='mt-2' />
                </h1>


                <Radio.Group
                    className='col-span-2'
                    value={userType}
                    onChange={(e) => {
                        setUserType(e.target.value)

                    }}
                >

                    <Radio value="donor">Donar</Radio>
                    <Radio value="hospital">Hospital</Radio>
                    <Radio value="organization">Organization</Radio>
                </Radio.Group>


                {
                    userType === 'donor' &&
                    (


                        <>
                            {" "}
                            <Form.Item
                                label='Name'
                                name='name'
                                rules={rules}
                            >
                                <Input type='text' placeholder='Enter the user name' />
                            </Form.Item>

                            <Form.Item
                                label='Email'
                                name='email'
                                rules={rules}
                            >
                                <Input type='email' placeholder='Enter your Email id' />
                            </Form.Item>

                            <Form.Item
                                label='Phone'
                                name='phone'
                                rules={rules}
                            >
                                <Input type='number' />
                            </Form.Item>

                            <Form.Item
                                label='Password'
                                name='password'
                                rules={rules}
                            >
                                <Input type='password' />
                            </Form.Item>
                        </>


                    )
                }
                {
                    userType !== 'donor' && <HospitalOrganizationForm userType={userType} />
                }


                <Button type='primary' className='col-span-2' htmlType='submit'>
                    Register
                </Button>

                <Link to='/login' className='col-span-2 text-center text-gray-700 underline' >
                    Already have an account? Login
                </Link>

            </Form>




        </div>
    )
}

export default Register;