import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { Card } from "antd";
import "./home.css";
import { getData } from "../../api/index";
import { Table } from "antd";
import * as iconMap from "@ant-design/icons";
import Echarts from "../../components/echarts";

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

const countData = [
  {
    name: "Today's Order",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "Today's Collection",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "Today's Unpayment",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
  {
    name: "Month Order",
    value: 1234,
    icon: "CheckCircleOutlined",
    color: "#2ec7c9",
  },
  {
    name: "Month Collection",
    value: 3421,
    icon: "ClockCircleOutlined",
    color: "#ffb980",
  },
  {
    name: "Month Unpayment",
    value: 1234,
    icon: "CloseCircleOutlined",
    color: "#5ab1ef",
  },
];

const iconToElement = (item) => {
  return React.createElement(iconMap[item.icon]);
};

const Home = () => {
  const url = require("../../assets/images/user.png");
  const [echartData, setEchartData] = useState({});
  //Dom首次渲染完成
  useEffect(() => {
    getData().then(({ data }) => {
      const { tableData, orderData, userData, videoData } = data.data;
      setTableData(tableData);

      //对于echart数据解析
      const order = orderData;
      //x轴数据
      const xData = order.date;
      //series数据
      const KeyArray = Object.keys(order.data[0]); //得到手机牌子的数组
      const series = [];
      KeyArray.forEach((key) => {
        series.push({
          name: key,
          data: order.data.map((item) => item[key]),
          type: "line",
        });
      });
      setEchartData({
        order: {
          xData,
          series,
        },
        user: {
          xData: userData.map((item) => item.date),
          series: [
            {
              name: "New Users",
              data: userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "Active Users",
              data: userData.map((item) => item.active),
              type: "bar",
            },
          ],
        },
        video: {
          series: [
            {
              data: videoData,
              type: "pie",
            },
          ],
        },
      });
    });
  }, []);
  //调用table数据
  const [tableData, setTableData] = useState([]);
  //table列的数据

  return (
    <Row className="home">
      <Col span={8}>
        <Card hoverable>
          <div className="user">
            <img src={url} />
            <div className="userinfo">
              <p className="name">Yujia Wang</p>
              <p className="access">Super Administrator</p>
            </div>
          </div>
          <div className="login-info">
            <p>
              Last login time：<span>2024-7-19</span>
            </p>
            <p>
              Last login Location：<span>San Jose</span>
            </p>
          </div>
        </Card>
        <Card style={{ marginTop: "20px" }} hoverable={true}>
          <Table
            rowKey={"name"} //取得name为键的对应值
            columns={columns}
            dataSource={tableData}
            pagination={false}
          />
        </Card>
      </Col>
      <Col span={16}>
        <div className="num">
          {countData.map((item, index) => {
            return (
              <Card key={index} hoverable style={{ margin: "1px" }}>
                <div
                  className="icon-box"
                  style={{ backgroundColor: item.color }}
                >
                  {iconToElement(item)}
                </div>
                <div className="detail">
                  <p className="num">＄{item.value}</p>
                  <p className="txt">{item.name}</p>
                </div>
              </Card>
            );
          })}
        </div>
        {/* //如果有数据才显示 */}
        {echartData.order && (
          <Echarts chartData={echartData.order} style={{ height: "280px" }} />
        )}
        <div className="graph">
          {echartData.user && (
            <Echarts
              chartData={echartData.user}
              style={{ height: "240px", width: "50%" }}
            />
          )}
          {echartData.video && (
            <Echarts
              chartData={echartData.video}
              style={{ height: "240px", width: "50%" }}
              isAxisChart={false}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};
export default Home;
