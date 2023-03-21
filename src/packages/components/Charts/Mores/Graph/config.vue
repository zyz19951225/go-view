<template>
  <div>
    <!-- Echarts 全局设置 -->
    <global-setting :optionData="optionData"></global-setting>
    <SettingItemBox name="偏移">
      <setting-item :name="`X 轴值：${graphProp.center[0]}%`">
        <n-slider
            v-model:value="graphProp.center[0]"
            :min="0"
            :max="200"
            :format-tooltip="sliderFormatTooltip"
            @update:value="updateCenter0"
        ></n-slider>
      </setting-item>
      <setting-item :name="`Y 轴值：${graphProp.center[1]}%`">
        <n-slider
            v-model:value="graphProp.center[1]"
            :min="0"
            :max="200"
            :format-tooltip="sliderFormatTooltip"
            @update:value="updateCenter1"
        ></n-slider>
      </setting-item>
    </SettingItemBox>
    <SettingItemBox name="缩放">
      <setting-item :name="`缩放大小：${graphProp.zoom}%`">
        <n-slider
            v-model:value="graphProp.zoom"
            :min="1"
            :max="200"
            :format-tooltip="sliderFormatTooltip"
            @update:value="updateZoom"
        ></n-slider>
      </setting-item>
    </SettingItemBox>
<!--    <CollapseItem name="关系图" :expanded="true">-->
<!--      <SettingItemBox name="样式">-->
<!--        <SettingItem>-->
<!--          <n-checkbox v-model:checked="graphConfig.splitArea.show">背景</n-checkbox>-->
<!--        </SettingItem>-->
<!--        <SettingItem>-->
<!--          <n-checkbox v-model:checked="graphConfig.splitLine.show">分割线</n-checkbox>-->
<!--        </SettingItem>-->
<!--        <SettingItem name="关系图布局">-->
<!--          <n-select-->
<!--            v-model:value="graphConfig.shape"-->
<!--            size="small"-->
<!--            :options="GraphShapeEnumList"-->
<!--            placeholder="选择形状"-->
<!--          />-->
<!--        </SettingItem>-->
<!--      </SettingItemBox>-->

<!--    </CollapseItem>-->
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, reactive } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option, GraphShapeEnumList } from './config'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option & GlobalThemeJsonType>,
    required: true
  }
})

const graphConfig = computed<typeof option.graph>(() => {
  return props.optionData.graph
})

const graphProp = reactive({
  radius: [0, 60],
  center: [100, 100],
  zoom:100
})

// 更新处理
const updateCenter0 = (value: number) => {
  props.optionData.series[0].center[0] = `${value}%`
}

const updateCenter1 = (value: number) => {
  props.optionData.series[0].center[1] = `${value}%`
}

const updateZoom = (value: number) => {
  props.optionData.series[0].zoom =  value/100
}

// 百分比格式化 percent
const sliderFormatTooltip = (v: number) => {
  return `${v}%`
}
</script>
