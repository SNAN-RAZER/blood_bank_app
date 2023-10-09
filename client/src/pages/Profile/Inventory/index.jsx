import { Button, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import InventoryForm from './InventoryForm';
import { setLoader } from '../../../redux/loadersSlice';
import { useDispatch } from 'react-redux';
import { getInventory } from '../../../apicalls/Inventory/inventory';
import moment from 'moment';
const Inventory = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const columns = [
        {
            title: "Inventory Type",
            dataIndex: "inventoryType"
        },
        {
            title: "Blood Group",
            dataIndex: "bloodGroup"
        },
        {
            title: "Quantity",
            dataIndex: "quantity"
        },
        {
            title: "Reference",
            dataIndex: "reference",
            render: (text, record) => {
                if (record.inventoryType === "in") {
                    return record.donor.name
                }
                else {
                    return record.hospital.hospitalName
                }
            }
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            render: (text, record) => {
                return moment(text).format('MMMM Do YYYY, h:mm:ss a');
            }
        },

    ];

    const getData = async () => {
        try {
            dispatch(setLoader(false));
            const response = await getInventory();
            if (response.success) {

                setData(response.data);
                message.success(response.message);
                dispatch(setLoader(false));
            }
            else {
                throw Error(response.response.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error(error.message);
            dispatch(setLoader(false));
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <div className="flex justify-end m-4">
                <Button
                    onClick={() => setOpen(true)}
                >
                    Add Inventory
                </Button>
            </div>

            {data && <Table columns={columns} dataSource={data} />}

            {
                open && (<InventoryForm open={open} setOpen={setOpen}

                    reloadData={getData} />)
            }

        </div>
    )
}

export default Inventory