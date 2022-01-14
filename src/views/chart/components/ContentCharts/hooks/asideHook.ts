import { reactive, ref } from 'vue'
import { icon } from '@/plugins'
import { renderLang, renderIcon } from '@/utils'
import { themeColor, setItem, getCharts } from './layoutHook'
import { PackagesCategoryEnum } from '@/packages/index.d'
// 图表
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'
// 图标
const { BarChartIcon } = icon.ionicons5
const {
  TableSplitIcon,
  RoadmapIcon,
  SpellCheckIcon,
  GraphicalDataFlowIcon
} = icon.carbon

// 图表
const { getPackagesList } = usePackagesStore()
const menuOptions = reactive<{
  [T: string]: any
}>([])

const packagesListObj = {
  [PackagesCategoryEnum.CHARTS]: {
    icon: renderIcon(RoadmapIcon),
    label: renderLang('图表')
  },
  [PackagesCategoryEnum.TEXTS]: {
    icon: renderIcon(SpellCheckIcon),
    label: renderLang('信息')
  },
  [PackagesCategoryEnum.TABLES]: {
    icon: renderIcon(GraphicalDataFlowIcon),
    label: renderLang('表格')
  },
  [PackagesCategoryEnum.DECORATES]: {
    icon: renderIcon(GraphicalDataFlowIcon),
    label: renderLang('装饰')
  }
}

// 处理列表
const handlePackagesList = () => {
  for (const val in getPackagesList) {
    menuOptions.push({
      key: val,
      // @ts-ignore
      icon: packagesListObj[val].icon,
      // @ts-ignore
      label: packagesListObj[val].label,
      // @ts-ignore
      list: getPackagesList[val]
    })
  }
}
handlePackagesList()

// 记录选中值
let beforeSelect: string = menuOptions[0]['key']
const selectValue = ref<string>(menuOptions[0]['key'])

// 选中的对象值
const selectOptions = ref(menuOptions[0])

// 点击 item
const clickItemHandle = (key: string, item: any) => {
  selectOptions.value = item
  // 处理折叠
  if (beforeSelect === key) {
    setItem('charts', !getCharts.value)
  } else {
    setItem('charts', true)
  }
  beforeSelect = key
}

export {
  getCharts,
  BarChartIcon,
  themeColor,
  selectOptions,
  selectValue,
  clickItemHandle,
  menuOptions
}
