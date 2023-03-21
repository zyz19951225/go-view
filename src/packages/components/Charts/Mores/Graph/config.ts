import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { GraphConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend']

// 雷达形状
export const GraphShapeEnumList = [
  { label: '多边形', value: 'polygon' },
  { label: '圆形', value: 'circle' }
]

export const option = {
  title: {
    show:true,
    text: "Basic Graph"
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
      symbolSize: 50,
      roam: true,
      label: {
        show: true
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
      lineStyle: dataJson.series.lineStyle
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = GraphConfig.key
  public chartConfig = cloneDeep(GraphConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
