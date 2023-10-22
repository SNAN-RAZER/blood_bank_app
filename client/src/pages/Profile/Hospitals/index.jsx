import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import { getAllHospitalsOfAnOrganization } from "../../../apicalls/userApiCalls/userApi";
import { Table, message } from "antd";
import moment from "moment";

const Hospitals = () => {
  const dispatch = useDispatch();
  const [hospitalData, setHospitalData] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "hospitalName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
  ];

  const getHospitalData = async () => {
    try {
      dispatch(setLoader(false));
      const response = await getAllHospitalsOfAnOrganization();
      if (response.success) {
        setHospitalData(response.data);
        message.success(response.message);
        dispatch(setLoader(false));
      } else {
        throw Error(response.response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    getHospitalData();
  }, []);

  return (
    <div className="">
      {hospitalData && <Table columns={columns} dataSource={hospitalData} />}

    </div>
  );
};

export default Hospitals;
