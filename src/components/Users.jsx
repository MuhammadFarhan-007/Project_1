import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserApi, fetchUsers } from "../store/users/userActions";
import { Table, Button, Space, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Users = () => {

  const [userDeleteLoading, setUserDeleteLoading] = useState(null);

  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  const getUsersList = async () => {
    let res = await dispatch(fetchUsers()).unwrap();
    console.log("GetUserList", res);
  };

  useEffect(() => {
    getUsersList()
  }, [dispatch]);

  // Delete Handler
  const handleDelete = async (id) => {
    setUserDeleteLoading(id); // Loading start (Usi ID ke liye)
    try {
      await dispatch(deleteUserApi(id)).unwrap();
      // Delete hone ke baad table refresh karne ke liye fetch dobara call kar sakte hain
      // ya Redux state khud hi update ho jayegi agar aapne slice sahi banaya hai.
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setUserDeleteLoading(null); // Loading stop
    }
  };

  // Ant Design Table ke columns define kiye hain
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, user) => (

        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(user.id)}
            okText="Yes"
            cancelText="No"
            // Jab loading ho rahi ho to Popconfirm ko disable kar dena behtar hai
            disabled={userDeleteLoading === user.id}
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              // Yahan loading check ho rahi hai
              loading={userDeleteLoading === user.id}
              disabled={userDeleteLoading !== null && userDeleteLoading !== user.id}
            >
              Delete
            </Button>
          </Popconfirm>

          {/* <Button
            type="default"
            icon={<EditOutlined />}
            disabled={userDeleteLoading === user.id}
          >
            Update
          </Button> */}
          
        </Space>
      ),
    },
  ];

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <div
        className="table"
        style={{
          margin: "auto",
          maxWidth: '1000px',
        }}
      >
        {/* Main Table */}
        <Table
          dataSource={users}
          columns={columns}
          rowKey={(record) => record.id || record.email}
          bordered
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default Users;