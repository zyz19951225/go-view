<template>
  <v-chart ref="vChartRef" :theme="themeColor" :option="option" :manual-update="isPreview()" autoresize></v-chart>
</template>

<script setup lang="ts">
import { ref, computed, PropType, watch } from 'vue'
import VChart from 'vue-echarts'
import dataJson from './data.json'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import { use } from 'echarts/core'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
//需要注意的是为了保证打包的体积是最小的，ECharts 按需引入的时候不再提供任何渲染器，所以需要选择引入
// CanvasRenderer 或者 SVGRenderer 作为渲染器。这样的好处是假如你只需要使用 svg 渲染模式，打包的结果中就不会再包含无需使用的 CanvasRenderer 模块。
import { CanvasRenderer } from 'echarts/renderers'
// 引入图表，图表后缀都为 Chart
import { RadarChart } from 'echarts/charts'
import { includes } from './config'
import { mergeTheme, setOption } from '@/packages/public/chart'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { isPreview } from '@/utils'
// 引入组件，组件后缀都为 Component
import { DatasetComponent, GridComponent, TooltipComponent, LegendComponent } from 'echarts/components'

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})
// 注册必须的组件
use([DatasetComponent, CanvasRenderer, RadarChart, GridComponent, TooltipComponent, LegendComponent])

const vChartRef = ref<typeof VChart>()

const option = computed(() => {
  return mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

const dataSetHandle = (dataset: typeof dataJson) => {
  if (dataset.series) {
  //@ts-ignore
    props.chartConfig.option.title= dataset.title
    //@ts-ignore
    props.chartConfig.option.series[0].data = dataset.series.data
    //@ts-ignore
    props.chartConfig.option.series[0].links = dataset.series.links
    //@ts-ignore
    props.chartConfig.option.series[0].categories = dataset.series.categories
    // @ts-ignore
  //  props.chartConfig.option.legend.data = dataset.seriesData.map((i: { name: string }) => i.name)
  }
  if (vChartRef.value && isPreview()) {
    setOption(vChartRef.value, props.chartConfig.option)
  }
}

watch(
    () => {
      props.chartConfig.option.dataset
    },
  newData => {
    try {
      //@ts-ignore
      dataSetHandle(newData)
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

useChartDataFetch(props.chartConfig, useChartEditStore, (newData: typeof dataJson) => {
  dataSetHandle(newData)
})
</script>
