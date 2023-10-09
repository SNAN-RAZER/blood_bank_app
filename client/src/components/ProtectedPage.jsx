import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { setLoader } from '../redux/loadersSlice';
import { getUserData } from '../apicalls/userApiCalls/userApi';
import { setUser } from '../redux/userSlice';
import { message } from 'antd';
function ProtectedPage({ children }) {

    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUserName = () => {
        if (user) {
            if (user.userType === 'donor' || user.userType === 'admin') {
                return user.name
            }
            else if (user.userType === 'hospital') {
                return user.hospitalName
            }
            else if (user.userType === 'organization') {
                return user.organizationName
            }
        }
        else {
            return null;
        }
    }
    const fetchUserData = async () => {
        try {
            dispatch(setLoader(false));
            const response = await getUserData();
            if (response.success) {
                dispatch(setUser(response.data));

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
            localStorage.removeItem('blood_bank')
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return (
        <div className="">

            {


                user &&
                (
                    <div className="">
                        {/* Header */}
                        <div className="flex justify-between items-center bg-primary text-white p-5">
                            <div className="flex flex-col">
                                <h1 className="text-2xl">Blood Bank</h1>
                                <span className="text-sm">{user.userType.toUpperCase()}</span>
                            </div>

                            <div className="flex items-center border-solid p-3">
                                <i className="ri-shield-user-line text-3xl mr-1">


                                </i>
                                <span className="mr-5 text-md underline cursor-pointer "
                                    onClick={() => navigate('/profile')}
                                >
                                    {
                                        getUserName().toUpperCase()
                                    }
                                </span>

                                <i className="ri-logout-circle-r-line text-2xl cursor-pointer"
                                    onClick={() => {
                                        localStorage.removeItem('blood_bank_token');
                                        navigate("/login");
                                    }}
                                ></i>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="">
                            {children}
                        </div>
                    </div>
                )
            }
        </div>


    )
}
export default ProtectedPage;