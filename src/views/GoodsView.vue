<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="标题">
                    <el-input v-model="selectData.title" placeholder="请输入关键字" clearable />
                </el-form-item>
                <el-form-item label="详情">
                    <el-input v-model="selectData.introduce" placeholder="请输入关键字" clearable />
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="dataList.comList" stripe style="width: 100%">
            <el-table-column prop="id" label="编号" width="180" />
            <el-table-column prop="title" label="商品名" width="180" />
            <el-table-column prop="introduce" label="商品介绍" />
        </el-table>
        <el-pagination @current-change="currentChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count*1.25" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import { Goodlist } from '../request/api'
import { InitData,ListInt } from '@/type/goods'

export default defineComponent({
    setup () {
        const data=reactive(new InitData())
        onMounted(()=>{
            goodlist()
        }) 
        const goodlist=()=> {Goodlist().then((res)=>{
            console.log(res)
            data.list = res.data
            data.selectData.count = res.data.length
        })}
        const dataList=reactive({
            comList: computed(()=>{
                return data.list.slice(
                    (data.selectData.page-1)*data.selectData.pageSize,
                    data.selectData.page*data.selectData.pageSize
                )
            })
        })
        const currentChange=(page:number)=>{
            data.selectData.page = page
        }
        const sizeChange=(pageSize:number)=>{
            data.selectData.pageSize = pageSize
        }
        const onSubmit=()=>{
            let arr:ListInt[]=[]
            if(data.selectData.title || data.selectData.introduce){
                if(data.selectData.title){
                    arr=data.list.filter((value)=>{
                        return value.title.indexOf(data.selectData.title) !== -1
                    })
                }
                if(data.selectData.introduce){
                    arr=data.list.filter((value)=>{
                        return value.introduce.indexOf(data.selectData.introduce) !== -1
                    })
                } 
            } else { 
                arr = data.list
            }
            data.selectData.count = arr.length
            data.list = arr

        }
        watch(
            [()=>data.selectData.title,()=>data.selectData.introduce],
            ()=>{
                if (data.selectData.title==""||data.selectData.introduce==""){
                   goodlist()
                }
            }
        )
        return {...toRefs(data),currentChange,sizeChange,dataList,onSubmit}
    }
})
</script>

<style scoped>

</style>