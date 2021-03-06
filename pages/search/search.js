// pages/search/search.js
import KeywordModel from '../../models/keywordModel'
import ProductModel from '../../models/productModel'
const keywordModel = new KeywordModel()
const productModel = new ProductModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    historyWords: [], // 历史记录
    hotWords: [], // 热门搜索
    searched: false,  // 控制搜索结果的显示
    loadingCenter: false,
    noResult: false,
    loading: false,
    inputValue: '',
    searchRes: [] // 搜索结果
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // console.log("histories:::", this.data.historyWords)
    this.setData({
      historyWords: keywordModel.getHistory()
    });
    const hotList = await keywordModel.getHot();
    let hotWords = [];
    hotList.map((item) => {
      hotWords.push(item.commodityName);
    })
    this.setData({
      hotWords
    })
      // .then(res => {
      //   // console.log("hotTags:::", res.hot);
      //   this.setData({
      //     hotWords: res.hot
      //   })
      // })
  },

  /**
   *确认搜索
   *
   * @param {*} event
   */
  async onConfirm(event) {
    // console.log("confirm", event)
    this.loadingCenter = true;
    const inputValue = event.detail.value || event.detail.tagContent;
    if(inputValue && inputValue.trim()) {
      // 将本次搜索加入历史记录
      keywordModel.addHistory(inputValue)
      // 获取搜索结果
      const searchRes = await productModel.getSearchRes(inputValue).catch(err => console.error(new Error(err)));
      console.log("searchRes:::", searchRes);
      this.setData({
        noResult: !searchRes || searchRes.length === 0,
        searched: true,
        inputValue,
        loadingCenter: false,
        searchRes
      });
    }
  },

  /**
   *删除当前搜索内容
   *
   */
  onDelete() {
    this._init();
  },
  /**
   *取消搜索，回到主页
   *
   * @param {*} event
   */
  onCancel(event) {
    this._init();
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   *回到搜索页面初始状态
   *
   */
  _init() {
    this.setData({
      inputValue: '',
      searched: false,
      noResult: false
    }) 
  }
})