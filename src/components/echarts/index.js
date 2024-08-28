import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

//echart配置数据，分为有坐标系和无坐标系的两种类型图
const axisOption = {
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
};

const normalOption = {
  tooltip: {
    trigger: "item",
  },
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
};

//echarts封装逻辑，用props，填入样式，数据，是否有坐标系，默认有.
const Echarts = ({ style, chartData, isAxisChart = true }) => {
  const echartRef = useRef();
  let echartObj = useRef(null);
  //用useRef实例 (echartObj.current)，可以确保组件的重新渲染不会整个初始化 ECharts 实例，而只更新图表内容。减少了不必要的组件重绘，避免了性能浪费
  //但是如果用普通变量var Xx = echarts.init(...)，chartData变化会引起整个组件变化
  useEffect(() => {
    let options;
    echartObj.current = echarts.init(echartRef.current);
    //判断是不是有坐标系,设置option
    if (isAxisChart) {
      //设置x轴
      axisOption.xAxis.data = chartData.xData;
      axisOption.series = chartData.series;
      options = axisOption;
    } else {
      normalOption.series = chartData.series;
      options = normalOption;
    }
    echartObj.current.setOption(options);
  }, [chartData]);
  return <div style={style} ref={echartRef}></div>; //返回这个Echarts所体现的dom标签元素
};

export default Echarts;
