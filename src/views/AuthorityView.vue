<template>
    <div>
        <el-tree
        :ref="treeRef"
        :data="list"
        show-checkbox
        node-key="roleId"
        :default-checked-keys="authority"
        :props="{
            children: 'roleList',
            label: 'name'
        }"
    />
    <el-button @click="changeAuthority">确认修改</el-button>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router';
import { InitData } from '@/type/authority';
import {Authority} from '@/request/api'
export default defineComponent({
    setup () {
        const route = useRoute()
        const params:any = route.query
        console.log(route,'haha');
        
        const data = reactive(new InitData(params.id,params.authority))
        onMounted(()=>{
            Authority().then(res=>{
                data.list = res.data
            })
        })
        const changeAuthority=()=>{
            console.log(data.treeRef.getCheckedKeys().sort(function(a:number,b:number){return a-b}));
            
        }
        return {...toRefs(data),changeAuthority}
    }
})
</script>

<style scoped>

</style>