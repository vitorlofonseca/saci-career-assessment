<script setup lang="ts">
import { ElButton, ElInput, ElMessage, ElFormItem, ElDialog, ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import axios from 'axios';

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const form = reactive({
  name: '',
  
})

const saveForm = (roleId:number) => 
{
  axios.put(`/api/roles/${roleId}`, form)
    .then(response => {
      // Trate a resposta do backend
      console.log(response.data);
      // Exiba uma mensagem de sucesso para o usuário
      ElMessage({
        message: response.data.message,
        type: 'success'
      });
      dialogFormVisible.value = false;
    })
    .catch((error:any) => {
      // Se ocorrer um erro, exiba uma mensagem de erro para o usuário
      console.error('Error updating role:', error);
      ElMessage({
        message: 'Failed to update role',
        type: 'error'
      });
    });
};
  dialogFormVisible.value = false;
  const roleId = ref(0);
</script>

<template>
  <ElButton link style="color: #29517A;" @click="dialogFormVisible = true ">
    Edit
  </ElButton>
  <ElDialog v-model="dialogFormVisible" title="Edit Role" width="500">
    <ElForm :model="form">
      <ElFormItem label="Role" :label-width="formLabelWidth">
        <ElInput v-model="form.name" autocomplete="on" />
      </ElFormItem>
    </ElForm>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="dialogFormVisible = false">Cancel</ElButton>
        <ElButton type="primary" @click="() => saveForm(roleId)">Save</ElButton>
      </div>
    </template>
  </ElDialog>
</template>