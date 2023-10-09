import { Form, Input, Modal, Radio, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../../redux/loadersSlice';
import { addInventory } from '../../../apicalls/Inventory/inventory';
const InventoryForm = ({ open, setOpen, reloadData }) => {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const rules = [
        {
            required: true,
            message: "Required"
        }
    ]
    const [form] = Form.useForm();
    const [inventoryType, setInventoryType] = useState("in");
    const onInventoryTypeChange = (event) => {
        setInventoryType(event.target.value)
    }

    const onFinish = async (values) => {
        try {
            dispatch(setLoader(true));
            const response = await addInventory({
                ...values,
                organization: user._id,
                inventoryType
            });
            if (response.success) {
                localStorage.setItem('blood_bank_token', response.data);
                message.success(response.message);
                dispatch(setLoader(false));
                setOpen(false);
                reloadData();

            }
            else {

                throw Error(response.response.data.message);
            }

        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
            setOpen(false);

        }
    }

    return (
        <Modal
            title="Add inventory"
            open={open}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
            centered

        >

            <Form
                layout='vertical'
                className='flex flex-col gap-3'
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Inventory Type"
                    rules={rules}
                >
                    <Radio.Group onChange={onInventoryTypeChange} value={inventoryType}>
                        <Radio value="in">In</Radio>
                        <Radio value="out">out</Radio>

                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    rules={rules}
                    label="Blood Group"
                    name="bloodGroup"
                >
                    <select name="" id="">
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>

                </Form.Item>

                <Form.Item
                    label={inventoryType === "out" ? "Hospital Email" : "Donor Email"}
                    name="email"
                    rules={rules}
                >
                    <Input type='email' />
                </Form.Item>

                <Form.Item
                    label="Quantity (ML)"
                    name="quantity"
                    rules={rules}
                >
                    <Input type='number' />
                </Form.Item>

            </Form>

        </Modal>
    )
}

export default InventoryForm