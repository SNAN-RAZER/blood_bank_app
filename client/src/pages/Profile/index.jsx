import { Tabs } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import Inventory from './Inventory';

const Profile = () => {
    const items = [
        {
            key: '1',
            label: 'Inventory',
            children: <Inventory />,
        },
        {
            key: '2',
            label: 'Donors',
            children: <h1>Donors</h1>,
        },
        {
            key: '3',
            label: 'Hospitals',
            children: <h1>Hospitals</h1>,
        },
    ];
    const { user } = useSelector(state => state.user);

    return (
        <div className='p-2'>
            {user?.userType === 'organization' && (
                <>
                    <Tabs items={items} defaultActiveKey='1' />
                </>
            )}
        </div>
    )
}

export default Profile;