// @ts-nocheck
<template>
  <div>
    <!-- Echarts 全局设置 -->
    <global-setting :optionData="optionData"></global-setting>
    <CollapseItem name="节点" :expanded="false">
        <setting-item-box name="节点形状">
          <setting-item>
            <n-select
                v-model:value="optionData.series[0].symbol"
                size="small"
                :options="GraphShapePositionEnumList"
                placeholder="选择形状"
            />
          </setting-item>
          <setting-item v-if="optionData.series[0].symbol =='custom'">
              <n-upload
                  :showFileList="false"
                  :customRequest="customRequest">
                <n-button>上传文件</n-button>
              </n-upload>
          </setting-item>
        </setting-item-box>
      <SettingItemBox name="节点大小">
        <setting-item :name="`节点大小：${optionData.series[0].symbolSize}`">
          <n-slider
              v-model:value="optionData.series[0].symbolSize"
              :min="0"
              :max="100"
              :format-tooltip="sliderFormatTooltip"
              @update:value="updateSymbolSize"
          ></n-slider>
        </setting-item>
      </SettingItemBox>
    </CollapseItem>
    <CollapseItem name="边" :expanded="false">
      <setting-item-box name="类型">
          <setting-item>
            <n-select
                v-model:value="optionData.series[0].lineStyle.type"
                size="small"
                :options="GraphLineTypePositionEnumList"
                placeholder="选择形状"
            />
          </setting-item>
        </setting-item-box>
      <setting-item-box name="线条颜色">
        <setting-item>
          <n-color-picker size="small" v-model:value="optionData.series[0].lineStyle.color"></n-color-picker>
        </setting-item>
      </setting-item-box>
      <SettingItemBox name="粗细">
        <setting-item :name="`节点大小：${optionData.series[0].lineStyle.width}`">
          <n-slider
              v-model:value="optionData.series[0].lineStyle.width"
              :min="0"
              :max="100"
              :format-tooltip="sliderFormatTooltip"
              @update:value="updateLineWidth"
          ></n-slider>
        </setting-item>
      </SettingItemBox>
      <SettingItemBox name="曲度">
        <setting-item :name="`曲度：${graphProp.curveness}%`">
          <n-slider
              v-model:value="graphProp.curveness"
              :min="0"
              :max="100"
              :format-tooltip="sliderFormatTooltip"
              @update:value="updateLineCurveness"
          ></n-slider>
        </setting-item>
      </SettingItemBox>
    </CollapseItem>
    <CollapseItem name="标签" :expanded="false">
        <template #header>
          <n-switch v-model:value="label.show" size="small"></n-switch>
        </template>
        <setting-item-box name="标签位置">
          <setting-item>
            <n-select
                v-model:value="optionData.series[0].label.position"
                size="small"
                :options="GraphLabelPositionEnumList"
                placeholder="选择形状"
            />
          </setting-item>
        </setting-item-box>
    </CollapseItem>
    <CollapseItem name="关系图" :expanded="true">
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
      <setting-item-box name="聚焦方式">
        <setting-item >
            <setting-item>
              <n-select
                  v-model:value="optionData.series[0].emphasis.focus"
                  size="small"
                  :options="GraphFocusPositionEnumList"
                  placeholder="选择形状"
              />
            </setting-item>
        </setting-item>
      </setting-item-box>
    </CollapseItem>
    <CollapseItem name="类目" :expanded="true">
      <CollapseItem v-for="(item, index) in optionData.series[0].categories" :key="index" :name="item.name">
        <setting-item-box name="节点形状">
          <setting-item>
            <n-select
                v-model:value="item.symbol"
                size="small"
                :options="GraphShapePositionEnumList"
                placeholder="选择形状"
            />
          </setting-item>
          <setting-item v-if="item.symbol =='custom'">
            <n-upload
                :showFileList="false"
                :customRequest="(option:UploadCustomRequestOptions)=>ccustomRequest(option,item)">
              <n-button>上传文件</n-button>
            </n-upload>
          </setting-item>
        </setting-item-box>
        <SettingItemBox name="节点大小">
          <setting-item :name="`节点大小：${item.symbolSize? item.symbolSize:optionData.series[0].symbolSize}`">
            <n-slider
                v-model:value="item.symbolSize"
                :min="1"
                :max="100"
                :format-tooltip="sliderFormatTooltip"
                @update:value="(value:number)=>updateItemSymbolSize(value,item)"
            ></n-slider>
          </setting-item>
        </SettingItemBox>
<!--      <SettingItemBox name="图标">-->
<!--        <n-upload-->
<!--            :showFileList="false"-->
<!--            :customRequest="(option)=>ccustomRequest(option,item)">-->
<!--          <n-button>上传文件</n-button>-->
<!--        </n-upload>-->

<!--      </SettingItemBox>-->
      </CollapseItem>
    </CollapseItem>

  </div>
</template>

<script setup lang="ts">
import {PropType, computed, reactive, nextTick} from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option, GraphLabelPositionEnumList,GraphShapePositionEnumList,GraphFocusPositionEnumList,GraphLineTypePositionEnumList } from './config'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'
import {UploadCustomRequestOptions} from "naive-ui";
import {fetchRouteParamsLocation} from "@/utils";
import {uploadFile} from "@/api/path";
import {ResultEnum} from "@/enums/httpEnum";

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
  zoom:100,
  curveness:0
})

const label = computed(() => {
  return props.optionData.series[0].label
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

const updateSymbolSize = (value: number) => {
  props.optionData.series[0].symbolSize = value
}

const updateItemSymbolSize = (value: number,item:any) => {
  item.symbolSize = value
}

const updateLineWidth = (value: number) => {
  props.optionData.series[0].lineStyle.width = value
}

const updateLineCurveness = (value: number) => {
  console.log(value)
  props.optionData.series[0].lineStyle.curveness = value/100
}
// 百分比格式化 percent
const sliderFormatTooltip = (v: number) => {
  return `${v}%`
}

const customRequest = (options: UploadCustomRequestOptions) => {
  const { file } = options
  getBase64(file.file).then((res:any)=>{
    props.optionData.series[0].symbol = "image://"+res
  })
}
const ccustomRequest = (options: UploadCustomRequestOptions,item:any) => {
  const { file } = options
  getBase64(file.file).then((res:any)=>{
    item.symbol = "image://"+res
  })
}

const getBase64 = (file: any)=> {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader()
    let imgResult = ''
    reader.readAsDataURL(file)
    reader.onload = function () {
      //@ts-ignore
      imgResult = reader.result
    }
    reader.onerror = function (error) {
      reject(error)
    }
    reader.onloadend = function () {
      resolve(imgResult)
    }
  })
}
</script>
