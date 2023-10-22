import { Tabs } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import Inventory from './Inventory';
import Donor from './Donor';
import Hospitals from './Hospitals';

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
            children: <Donor />,
        },
        {
            key: '3',
            label: 'Hospitals',
            children: <Hospitals />
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