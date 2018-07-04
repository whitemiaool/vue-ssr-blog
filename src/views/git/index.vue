<template>
    <div>
        <div class="git-w" >
            <div class="g-o-w" v-for="item in gits">
                <a :href="item.html_url" target="_blank">
                    <span class="g-o-i name">{{item.name}}</span>
                    <div class="lin">
                        <span class="g-o-i star">&#x2605; {{item.stargazers_count}}</span>       
                        <span class="g-o-i lan">&reg; {{item.language}}</span>               
                    </div>
                </a>
            </div>

        </div>
    </div>
</template>

<script>
import * as API from '../../api/index.js'
export default {
    name:'git',
    data() {
        return {
            gits:this.$store.state.gits
        }
    },
    asyncData ({store}) {
        return store.dispatch('FETCH_GITS');
    },
    title() {
        return 'github'
    },
    mounted() {
        API.getrepo().then((res)=>{
            if(res.data.code > 10) {
                this.gits = res.data.data.sort((a,b)=>{
                    return b.stargazers_count - a.stargazers_count
                });
            }
        })
    }
}
</script>

<style scoped>
.git-w {
    width: 70%;
    margin: 10px auto;
    /* display: flex; */
    /* flex-wrap: wrap; */
    font-size: 12px;
    max-width: 695px;
}
.g-o-w {
    /* width: 120px; */
    /* height: 80px; */
    background: #fff;
    margin: 10px 0px;
    box-sizing: border-box;
    box-shadow: 3px 3px 9px rgba(0,0,0,.15);
    overflow: hidden;
    padding: 4px 4px;
    transition: background 0.5s;
    max-width: 695px;
}
.g-o-w:hover {
    background: #1865b7;
}
.g-o-w:hover span.g-o-i {
    color: #fff;
}
.g-o-i {
    display: inline-block;
    /* width: 100%; */
    overflow: hidden;
    text-overflow: ellipsis;
}

.lin {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;    
}
span.name {
    color: #1765b7;
    width: 100%;
    margin-bottom: 0px;
    white-space: nowrap;
    font-size: 14px;
}
span.star {
    overflow: hidden;
    vertical-align: bottom;
}
.g-o-i {
    color: #ccc;
}
.lan {
    margin-left: 7px;
    vertical-align: bottom;
}
</style>
