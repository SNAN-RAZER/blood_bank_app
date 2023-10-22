import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loadersSlice";
import { getAllDonorsOfAnOrganization } from "../../../apicalls/userApiCalls/userApi";
import { Table, message } from "antd";
import moment from "moment";

const Donor = () => {
  const dispatch = useDispatch();
  const [donorData, setDonorData] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
  ];

  const getDonorData = async () => {
    try {
      dispatch(setLoader(false));
      const response = await getAllDonorsOfAnOrganization();
      if (response.success) {
        setDonorData(response.data);
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
    getDonorData();
  }, []);

  return (
    <div className="">
      {donorData && <Table columns={columns} dataSource={donorData} />}

    </div>
  );
};

export default Donor;
