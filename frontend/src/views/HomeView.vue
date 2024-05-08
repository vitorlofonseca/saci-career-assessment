<script setup lang="ts">
import { ElButton, ElInput, ElMessage, ElDialog} from 'element-plus'
import { ref } from 'vue'
import { patch } from '@/services/http';


const dialogFormVisible = ref(false)
const editRole = ref({name:''})


const onClickEditRole = () => {
  dialogFormVisible.value = true
}

const onClickCancel = () => {
  dialogFormVisible.value = false
}

const saveForm = async (roleId: number) => {
  try {
    const response: { message?: string } = await patch(`/api/roles/${roleId}`, editRole.value);

    if (response && response.message) {
      ElMessage({
        message: response.message,
        type: 'success'
      });
    } else {
      ElMessage({
        message: 'Role updated successfully',
        type: 'success'
      });
    }
    
    dialogFormVisible.value = false;
  } catch (error) {
    ElMessage({
      message: 'Failed to update role',
      type: 'error'
    });
  }
}
  dialogFormVisible.value = false;
  const roleId = ref(0);
</script>

<template>
  <ElButton link class="custom-button" @click="onClickEditRole">
    Edit
  </ElButton>
  <ElDialog v-model="dialogFormVisible" title="Edit Role" width="500">
        <ElInput v-model="editRole.name" autocomplete="on" />
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="onClickCancel">Cancel</ElButton>
        <ElButton type="primary" @click="() => saveForm(roleId)">Save</ElButton>
      </div>
    </template>
  </ElDialog>
</template>