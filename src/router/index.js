import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const ItemView = () => import('../views/ItemView.vue')
const UserView = () => import('../views/UserView.vue')
// const HelloWorld = () => import('../components/HelloWorld.vue')
import HelloWorld from '../components/HelloWorld.vue'
import Default from '../views/default/index.vue'
import Blog from '../views/blog/index.vue'

import Demo from '../views/demo/index.vue'
import Git from '../views/git/index.vue'
import XJP from '../views/xjp/index.vue'
import Paper from '../views/paper/index.vue'
import OnePaper from '../views/onepaper/index.vue'
import Add from '../views/addpaper/index.vue'
import Del from '../views/delpaper/index.vue'
import Edit from '../views/editpaper/index.vue'
import Console from '../views/console/index.vue'
import TopicPaper from '../views/topicpaper/index.vue'
// import Default from '@/view/default/index.vue'

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/top/:page(\\d+)?', component: createListView('top') },
      { path: '/new/:page(\\d+)?', component: createListView('new') },
      { path: '/show/:page(\\d+)?', component: createListView('show') },
      { path: '/ask/:page(\\d+)?', component: createListView('ask') },
      { path: '/job/:page(\\d+)?', component: createListView('job') },
      { path: '/item/:id(\\d+)', component: ItemView },
      { path: '/user/:id', component: UserView },
      { path: '/', redirect: '/index' },
      { path: '/index',component: HelloWorld,
        children:[{
          path: '/',
          // name: 'de',
          component: Default,
          children:[
            {
            path: '/',
            // name: 'de',
            component: Blog},{
              path: 'topic/:id',
              name: 'git',
              component: TopicPaper,
            }]
          },{
            path: 'demo',
            // name: 'demo',
            component: Demo
          },{
            path: 'loveCCPloveXjp',
            // name: 'xjp',
            component: XJP
          },{
            path: 'git',
            // name: 'git',
            component: Git
          },{
            path: 'paper',
            // name: 'git',
            component: Paper,
          },{
            path: 'paper/:id',
            // name: 'git',
            component: OnePaper,
          },{
            path: 'addpaper',
            // name: 'git',
            component: Add,
          },{
            path: 'console',
            // name: 'git',
            component: Console,
            children:[{
              path: 'add',
              // name: 'de',
              component: Add
            },{
              path: 'del',
              // name: 'de',
              component: Del
            },{
              path: 'edit',
              // name: 'de',
              component: Edit
            }]
          }
        ]
      }
    ]
  })
}
