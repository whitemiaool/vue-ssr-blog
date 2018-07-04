import Vue from 'vue'

export default {
  SET_ACTIVE_TYPE: (state, { type }) => {
    state.activeType = type
  },

  SET_LIST: (state, { type, ids }) => {
    state.lists[type] = ids
  },

  SET_ITEMS: (state, { items }) => {
    items.forEach(item => {
      if (item) {
        Vue.set(state.items, item.id, item)
      }
    })
  },

  SET_USER: (state, { id, user }) => {
    Vue.set(state.users, id, user || false) /* false means user not found */
  },
  SET_NAV: (state, {data}) => {
    state.nav = data /* false means user not found */
  },
  SET_BLOGS:(state, {data}) => {
    state.blogs = data.map((item,i)=>{
      item.showC    = false
      item.addo     = false
      item.cmt      = '条评论'
      item.showFix  = false
      item.showCon  = false
      item.topic    = item.topic.name
      item.paperindex = '/index/paper/'+item.paperindex
      return item
    }) /* false means user not found */
  },
  SET_ONE_BLOGS:(state, {data}) => {
      let item      = data;
      item.showC    = false
      item.addo     = false
      item.cmt      = '条评论'
      item.showFix  = false
      item.showCon  = false
      item.topic    = item.topic.name
      item.paperindex = '/index/paper/'+item.paperindex
      state.oneblog = [item]
  },
  SET_TOPIC_BLOGS:(state, {data}) => {
    state.tplist = data.map((item,i)=>{
        item.showC    = false
        item.addo     = false
        item.cmt      = '条评论'
        item.showFix  = false
        item.showCon  = false
        item.topic    = item.topic.name
        item.paperindex = '/index/paper/'+item.paperindex
        return item
    })
},
}
