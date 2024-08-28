// mock数据模拟
import Mock from "mockjs";

// 图表数据
let List = [];
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          //Mock.mock() 被用来加工模拟数据，相比简单ramdom生成，经过mock加工后的数据类型更广泛，并且更符合实际也更标准一致，将这些对象存储在 List 数组中。
          Apple: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          Meizu: Mock.Random.float(100, 8000, 0, 0),
          Samsung: Mock.Random.float(100, 8000, 0, 0),
          Xiaomi: Mock.Random.float(100, 8000, 0, 0),
        })
      );
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: "Xiaomi",
            value: 2999,
          },
          {
            name: "Apple",
            value: 5999,
          },
          {
            name: "vivo",
            value: 1500,
          },
          {
            name: "oppo",
            value: 1999,
          },
          {
            name: "Meizu",
            value: 2200,
          },
          {
            name: "Samsung",
            value: 4500,
          },
        ],
        // 柱状图
        userData: [
          {
            date: "Mon",
            new: 5,
            active: 200,
          },
          {
            date: "Tue",
            new: 10,
            active: 500,
          },
          {
            date: "Wes",
            new: 12,
            active: 550,
          },
          {
            date: "Thur",
            new: 60,
            active: 800,
          },
          {
            date: "Fri",
            new: 65,
            active: 550,
          },
          {
            date: "Sat",
            new: 53,
            active: 770,
          },
          {
            date: "Sun",
            new: 33,
            active: 170,
          },
        ],
        // 折线图
        orderData: {
          date: [
            "20191001",
            "20191002",
            "20191003",
            "20191004",
            "20191005",
            "20191006",
            "20191007",
          ],
          data: List, //这里的list是之前导入的模拟对象数据
        },
        tableData: [
          {
            name: "oppo",
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: "vivo",
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000,
          },
          {
            name: "Apple",
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000,
          },
          {
            name: "Xiaomi",
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000,
          },
          {
            name: "Samsung",
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000,
          },
          {
            name: "Meizu",
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000,
          },
        ],
      },
    };
  },
};
