import LineGradientSingle from './index.vue'
import Configuration from './config.vue'
import image from '@/assets/images/chart/charts/line_gradient_single.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const LineGradientSingleConfig: ConfigType = {
  key: 'VLineGradientSingle',
  conKey: 'VCLineGradientSingle',
  title: '折线面积图',
  category: ChatCategoryEnum.LINE,
  categoryName: ChatCategoryEnumName.LINE,
  package: PackagesCategoryEnum.CHARTS,
  node: () => LineGradientSingle,
  conNode: () => Configuration,
  image: image
}
