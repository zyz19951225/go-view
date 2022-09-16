import { ref, toRefs, toRaw } from 'vue'
import type VChart from 'vue-echarts'
import { customizeHttp } from '@/api/http'
import { CreateComponentType, ChartFrameEnum } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { isPreview, newFunctionHandle, intervalUnitHandle } from '@/utils'

// 获取类型
type ChartEditStoreType = typeof useChartEditStore

/**
 * setdata 数据监听与更改
 * @param targetComponent
 * @param useChartEditStore 若直接引会报错，只能动态传递
 * @param updateCallback 自定义更新函数
 */
export const useChartDataFetch = (
  targetComponent: CreateComponentType,
  useChartEditStore: ChartEditStoreType,
  updateCallback?: (...args: any) => any
) => {
  const vChartRef = ref<typeof VChart | null>(null)
  let fetchInterval: any = 0

  const requestIntervalFn = () => {
    const chartEditStore = useChartEditStore()

    // 全局数据
    const {
      requestOriginUrl,
      requestIntervalUnit: globalUnit,
      requestInterval: globalRequestInterval
    } = toRefs(chartEditStore.getRequestGlobalConfig)

    // 目标组件
    const {
      requestDataType,
      requestUrl,
      requestIntervalUnit: targetUnit,
      requestInterval: targetInterval
    } = toRefs(targetComponent.request)

    // 组件类型
    const { chartFrame } = targetComponent.chartConfig

    // 非请求类型
    if (requestDataType.value !== RequestDataTypeEnum.AJAX) return

    try {
      // 处理地址
      // @ts-ignore
      if (requestUrl?.value) {
        // requestOriginUrl 允许为空
        const completePath = requestOriginUrl && requestOriginUrl.value + requestUrl.value
        if (!completePath) return

        clearInterval(fetchInterval)

        const fetchFn = async () => {
          const res = await customizeHttp(toRaw(targetComponent.request), toRaw(chartEditStore.requestGlobalConfig))
          if (res && res.data) {
            try {
              const filter = targetComponent.filter
              // eCharts 组件配合 vChart 库更新方式
              if (chartFrame === ChartFrameEnum.ECHARTS) {
                if (vChartRef.value) {
                  vChartRef.value.setOption({ dataset: newFunctionHandle(res.data, filter) })
                }
              }
              // 更新回调函数
              if (updateCallback) {
                updateCallback(newFunctionHandle(res.data, filter))
              }
            } catch (error) {
              console.error(error)
            }
          }
        }

        // 立即调用
        fetchFn()

        // 定时时间
        const time = targetInterval && targetInterval.value ? targetInterval.value : globalRequestInterval.value
        // 单位
        const unit = targetInterval && targetInterval.value ? targetUnit.value : globalUnit.value
        // 开启轮询
        if (time) fetchInterval = setInterval(fetchFn, intervalUnitHandle(time, unit))
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  }

  isPreview() && requestIntervalFn()
  return { vChartRef }
}
