// components/tag/index.js
Component({
  options: {
    multipleSlots: true
  },

  externalClasses: ['tag-class'],

  /**
   * 组件的属性列表
   */
  properties: {
    tagContent: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: false // 是否选中标签
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击标签，传递标签内容
     */
    onTap(event) {
      const tagContent = this.properties.tagContent;
      const selected = !this.data.selected;
      this.triggerEvent('tagTap', { tagContent, selected }, {});
    }
  }
})
