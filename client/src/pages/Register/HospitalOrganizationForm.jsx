import React from 'react'
import { Form, Input, } from 'antd';
import TextArea from 'antd/es/input/TextArea';
const rules = [
    {
        required: true,
        message: "Required"
    }
]
const HospitalOrganizationForm = ({ userType }) => {
    return (
        <>
            <Form.Item
                label={userType === 'hospital' ? "Hospital Name" : "Organization name"}
                name='name'
                rules={rules}
            >
                <Input type='text' placeholder='Enter the user name' />
            </Form.Item>
            <Form.Item
                label="Owner"
                name='owner'
                rules={rules}
            >
                <Input type='text' placeholder='Enter the owner name' />
            </Form.Item>
            <Form.Item
                label="Email"
                name='email'
                rules={rules}
            >
                <Input type='text' placeholder='Enter your email' />
            </Form.Item>
            <Form.Item
                label="Phone Number"
                name='phoneNumber'
                rules={rules}
            >
                <Input type='number' />
            </Form.Item>
            <Form.Item
                label="Website"
                name='website'
                rules={rules}
            >
                <Input type='text' placeholder='Enter Website URL' />
            </Form.Item>
            <Form.Item
                label="Password"
                name='password'
                rules={rules}
            >
                <Input type='password' />
            </Form.Item>

            <Form.Item
                label="Address"
                name="address"
                className='col-span-2'
            >
                <TextArea />
            </Form.Item>

        </>
    )
}

export default HospitalOrganizationForm;