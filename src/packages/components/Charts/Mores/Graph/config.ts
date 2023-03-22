import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { GraphConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

// 关系图标签位置
export const GraphLabelPositionEnumList = [
  { label: '顶部', value: 'top' },
  { label: '底部', value: 'bottom' },
  { label: '左', value: 'left' },
  { label: '右', value: 'right' },
  { label: '内部', value: 'inside' },
]

export const GraphFocusPositionEnumList = [
  { label: '默认', value: 'none' },
  { label: 'self', value: 'self' },
  { label: 'series', value: 'series' },
  { label: 'adjacency', value: 'adjacency' },
]


export const GraphLineTypePositionEnumList = [
  { label: '实线', value: 'solid' },
  { label: '虚线', value: 'dashed' },
  { label: '点', value: 'dotted' },
]

export const GraphShapePositionEnumList = [
  { label: '圆', value: 'circle' },
  { label: '矩形', value: 'rect' },
  { label: '圆角矩形', value: 'roundRect' },
  { label: '三角形', value: 'triangle' },
  { label: '菱形', value: 'diamond' },
  { label: '坐标', value: 'pin' },
  { label: '箭头', value: 'arrow' },
  { label: '无', value: 'none' },
]



export const option = {
  title: {
    show:true,
    text: dataJson.title.text
  },
  tooltip: {},
  dataset: { ...dataJson },
  legend:{
   show:true
  },
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  graph: {
    shape: 'polygon',
  },
  series: [
    {
      center:["100%","100%"],
      type: 'graph',
      layout: 'none',
      zoom:1,
      symbol:"circle",
      symbolSize: 50,
      emphasis:{
        focus:"adjacency"
      },
      roam: true,
      label: {
        show: true,
        position:"inside"
      },
      lineStyle:{
        type:"solid",
        width:1,
        curveness:0,
        color:'rgba(0,0,0,1)'
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      edgeLabel: {
        fontSize: 20
      },
      data: dataJson.series.data,
      // links: [],
      links: dataJson.series.links,
      categories:dataJson.series.categories,
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = GraphConfig.key
  public chartConfig = cloneDeep(GraphConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
