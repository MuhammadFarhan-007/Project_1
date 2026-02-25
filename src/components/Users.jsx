import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserApi, fetchUsers } from "../store/users/userActions";
import { Table, Button, Space, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  const getUsersList = async () => {
    let res = await dispatch(fetchUsers()).unwrap();
    console.log("GetUserList", res);
  };

  useEffect(() => {
    getUsersList()
  }, [dispatch]);

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
          >
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
          </Popconfirm>

          <Button
            type="default"
            icon={<EditOutlined />}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  const handleDelete = (id) => {
    dispatch(deleteUserApi(id));
  };


  //   const handleDelete = async (id) => {
  //    {
  //     try {
  //       await dispatch(deleteUserApi(id)).unwrap();

  //       dispatch(fetchUsers()); 

  //       console.log("User deleted and list refreshed!");
  //     } catch (err) {
  //       console.error("Delete fail ho gaya:", err);
  //     }
  //   }
  // };


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