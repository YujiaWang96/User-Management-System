import React from "react";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Popconfirm,
  Table,
  Modal,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import "./user.css";
import dayjs from "dayjs";
import { getUser, addUser, editUser, deleteUser } from "../../api";

const User = () => {
  //弹框的state,0为新增，1为编辑
  const [modalType, setModalType] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  //删除按钮
  const handleDelete = ({ id }) => {
    deleteUser({ id }).then(() => {
      getTableData(); //删除用户后再次取得更新后的数据列表
    });
  };
  const [listData, setListData] = useState({
    name: "",
  });
  const [tableData, setTableData] = useState([]);
  //新增或者编辑users，判断type是什么类型
  const handleClick = (type, rowData) => {
    setIsModalOpen(!isModalOpen);
    if (type === "add") {
      setModalType(0);
    } else {
      setModalType(1);
      //如果是1则为编辑按钮，要取得已有的数据.要用深拷贝，并且不影响之前的数据，所以赋值给新变量
      const cloneData = JSON.parse(JSON.stringify(rowData));
      cloneData.birth = dayjs(cloneData.birth); //format是dayjs对象里面的方法,这里因为是字符串，不能用format方法。而下方handleOK里面是dayjs对象所以可以用
      form.setFieldsValue(cloneData); //回填好展示，方便后续人为编辑修改输入框
    }
  };
  //创建form实例，再绑定到<Form>标签，以后可以拿这个实例来找到更新的数据对象去调整数据列表
  const [form] = Form.useForm();
  //搜索框提交
  const handleFinish = (e) => {
    setListData({
      name: e.keyword,
    });
  };
  //setListData是异步更新，也就是当点击搜索按钮，第一次点击listData不会里面得到值，而是第二次才会。因此可以用useEffect确保listData变化了才显示列表
  useEffect(() => {
    getTableData();
    //console.log(listData, "sff");
  }, [listData]);

  //获取mock的用户数据列表
  const getTableData = () => {
    getUser(listData).then((res) => {
      setTableData(res.data.list);
      console.log(res, "res");
    });
  };
  //弹窗确定，获取表单数据进行数据列表调整
  const handleOk = () => {
    //对照antD官方写法说明
    form
      .validateFields()
      .then((val) => {
        val.birth = dayjs(val.birth).format("YYYY-MM-DD"); //引入dayjs来格式处理日期
        console.log(val);
        if (modalType) {
          //1为编辑
          editUser(val).then(() => {
            handleCancel();
            getTableData();
          });
        } else {
          //否则为新增
          addUser(val).then(() => {
            handleCancel();
            //更新列表数据
            getTableData();
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //弹窗取消，不显示弹窗
  const handleCancel = () => {
    //取消和填写确认完弹窗要把历史表格的数据清空,这是antD中form实例对象所带的方法
    form.resetFields();
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "gender",
      dataIndex: "sex",
      render: (val) => {
        return val === 0 ? "Female" : "Male";
      },
    },
    {
      title: "BrithDate",
      dataIndex: "birth",
    },
    {
      title: "Address",
      dataIndex: "addr",
    },
    {
      title: "Operations",
      //这里没写dataIndex，rowData拿到的是整行数据，给了dataIndex就是拿到对应的数据
      render: (rowData) => {
        return (
          <div className="flex">
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => handleClick("edit", rowData)}
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDelete(rowData)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    //调用后端接口，返回用户列表数据
    getTableData();
  }, []);
  return (
    <div className="user">
      <div className="flex-box">
        {/* //onclick = {Xx()}这种是不点击立即调用，而仅函数名或者箭头指示则为点击才调用 */}
        <Button type="primary" onClick={() => handleClick("add")}>
          + Add User
        </Button>
        {/* 当 Form 组件的 onFinish 事件触发时，它会自动收集并验证所有包裹在 Form.Item 组件中的数据，然后执行 onFinish 函数 */}
        <Form layout="inline" onFinish={handleFinish}>
          {/* Form.item为表单域，里面装具体内容 */}
          <Form.Item name="keyword">
            <Input placeholder="please enter user's name"></Input>
          </Form.Item>
          <Form.Item>
            {/* type用于设置按钮的样式，如primary、default、dashed。而htmlType对应 HTML 中按钮的 type 属性，用于定义按钮的行为，例如 button、submit、reset。 */}
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table columns={columns} dataSource={tableData} rowKey={"id"}></Table>
      <Modal
        title={modalType === 0 ? "Add A New User" : "Edit User's Information"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
      >
        {/* labelCol表示标签名占用宽度，wrapperCol表示输入框占比 */}
        <Form
          form={form} //form实例绑定到这个Form标签
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          labelAlign="left"
        >
          {modalType === 1 && (
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item> //判断是不是编辑模式，是的话就会有一栏隐藏的表单选项记录id，编辑的时候就能定位
          )}

          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input placeholder="Please input your name!" />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                type: "number",
                required: true,
                message: "Please input your age!",
              },
            ]}
          >
            <InputNumber placeholder="Please input your age!" />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="sex"
            rules={[
              {
                required: true,
                message: "Please choose your gender!",
              },
            ]}
          >
            <Select
              //defaultValue="Male"
              style={{
                width: 120,
              }}
              placeholder="please choose your gender"
              options={[
                {
                  value: "0",
                  label: "Male",
                },
                {
                  value: "1",
                  label: "Female",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Birthdate"
            name="birth"
            rules={[
              {
                required: true,
                message: "Please input your birthdate!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Address"
            name="addr"
            rules={[
              {
                required: true,
                message: "Please input your Addr!",
              },
            ]}
          >
            <Input placeholder="Please input your Address!" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default User;
