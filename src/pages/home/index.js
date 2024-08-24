import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Card } from "antd";
import "./home.css";
import { getData } from "../../api/index";
import { Table } from "antd";

const Home = () => {
  const url = require("../../assets/images/user.png");
  useEffect(() => {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      setTableData(tableData);
    });
  }, []);
  //调用table数据
  const [tableData, setTableData] = useState([]);
  //table列的数据
  const columns = [
    {
      title: "Courses Selling", //title为表格列名，dataIndex等为对应数据库的键名
      dataIndex: "name",
    },
    {
      title: "Today",
      dataIndex: "todayBuy",
    },
    {
      title: "Month",
      dataIndex: "monthBuy",
    },
    {
      title: "Total",
      dataIndex: "totalBuy",
    },
  ];
  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <img src={url} />
            <div className="userinfo">
              <p className="name">Admin</p>
              <p className="access">Super Administrator</p>
            </div>
          </div>
          <div className="login-info">
            <p>
              Last login time：<span>2021-7-19</span>
            </p>
            <p>
              Last login Location：<span>San Jose</span>
            </p>
          </div>
        </Card>
        <Card>
          <Table
            rowKey={"name"} //取得name为键的对应值
            columns={columns}
            dataSource={tableData}
            pagination={false}
          />
        </Card>
      </Col>
      <Col span={16}></Col>
    </Row>
  );
};
export default Home;
