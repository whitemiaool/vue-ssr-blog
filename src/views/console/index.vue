<template>
    <div style="background:#fff;padding-top:40px">
        <div class="c-w">
            <div>
                <Menu active-name="1" :open-names="['1']">
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="ios-paper"></Icon>
                            内容管理1
                        </template>
                        
                        <MenuItem name="1-1">
                            <router-link class="m-r" to="/index/console/add">添加文章</router-link>
                        </MenuItem>
                        <MenuItem name="1-2">
                            <router-link class="m-r" to="/index/console/del">编辑文章</router-link>
                        </MenuItem>
                        <!-- <MenuItem name="1-3"><router-link class="m-r" to="/index/console/edit"></router-link></MenuItem> -->
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-people"></Icon>
                            用户管理
                        </template>
                        <MenuItem name="2-1">新增用户</MenuItem>
                        <MenuItem name="2-2">活跃用户</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="stats-bars"></Icon>
                            统计分析
                        </template>
                        <MenuGroup title="使用">
                            <MenuItem name="3-1">新增和启动</MenuItem>
                            <MenuItem name="3-2">活跃分析</MenuItem>
                            <MenuItem name="3-3">时段分析</MenuItem>
                        </MenuGroup>
                        <MenuGroup title="留存">
                            <MenuItem name="3-4">用户留存</MenuItem>
                            <MenuItem name="3-5">流失用户</MenuItem>
                        </MenuGroup>
                    </Submenu>
                    </Menu>
                </div>
                <div class="c-r">
                    <router-view></router-view>
                    <!-- <add></add> -->
                </div>
            </div>
                
        
        <!-- <Tabs :value="label" @on-click="test">
            <TabPane label="添加文章" name='1t' icon="edit">
            </TabPane>
            <TabPane  label="整理论文" name='2t' icon="gear-b">
                <Del :clk="clk"></Del>
            </TabPane>
            <TabPane label="..." name='3t' icon="ios-medical-outline">开发中</TabPane>
        </Tabs> -->
    </div>
</template>

<script>
import * as API from '../../api'
import model from '../../components/modal/modal.vue'
import add from '../addpaper/index.vue'
import Del from '../delpaper/index.vue'

export default {
    name:'console',
    data() {
        return {
             clk:false,
             theam:'dark',
             label:'1t'
        }
    },
    methods:{
        test() {
           this.clk = !this.clk;
        }
    },
    components:{
        model,
        add,
        Del
    }
}
</script>

<style scoped>
.c-r {
    width: calc(100% - 240px)
}
.c-w {
    display: flex;
}
.m-r {
    display: inline-block;
    height: 100%;
    width: 100%;
}
</style>
