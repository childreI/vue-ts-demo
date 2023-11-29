<template>
    <div class="login-box">
        <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="80px"
            class="demo-ruleForm"
        >
            <el-form-item label="账号" prop="username">
            <el-input v-model="ruleForm.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
            <el-input
                v-model="ruleForm.password"
                type="password"
                autocomplete="off"
            />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"
                >登录</el-button
            >
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive,toRefs,ref } from 'vue'
import { useRouter } from "vue-router"
import {loginData} from "../type/login"
import type { FormInstance } from 'element-plus'
import {login} from "../request/api"
export default defineComponent({
    setup () {
        const data=reactive(new loginData())
        const rules={
                username: [
                    { required: true, message: '请输入用户名！', trigger: 'blur' },
                    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
                    ],
                password: [
                    { required: true, message: '请输入密码！', trigger: 'blur' },
                    { min: 3, max: 10, message: 'Length should be 3 to 5', trigger: 'blur' },
                ],
            }
        const ruleFormRef = ref<FormInstance>()
        const router = useRouter()
        const submitForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    login(data.ruleForm).then((res)=>{
                        localStorage.setItem('token',res.data.token)
                        router.push('/')
                    })
                console.log('submit!')
                } else {
                console.log('error submit!')
                return false
                }
            })
        }
        const resetForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.resetFields()
            }
        return {...toRefs(data),rules,ruleFormRef,submitForm,resetForm}
    }
})
</script>

<style lang="scss" scoped>
.login-box{
    width: 100%;
    height: 100%;
    background: url("../../src/assets/bg.jpg");
    padding: 1px;
    .demo-ruleForm {
        width: 500px;
        margin: 200px auto;
        padding: 40px;
        border-radius: 20px;
    }
}

</style>