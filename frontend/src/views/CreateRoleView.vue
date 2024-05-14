<script lang="ts" setup>
import { ref } from 'vue'
import { ElButton, ElDialog, ElInput } from 'element-plus'
import { useRolesStore } from '@/stores/roles/index'
import { ErrorMessage, SuccessMessage } from '@/services/messages/messages'
import { HttpServerError } from '@/services/http'

const dialogFormVisible = ref(false)
const rolesStore = useRolesStore()
const newRoleName = ref('')

const showDialog = () => {
  dialogFormVisible.value = true
}

const hideDialog = () => {
  dialogFormVisible.value = false
}

const createRole = async () => {
  if (newRoleName.value == '') {
    ErrorMessage('You need to fill in this field')
    showDialog()
    return
  }

  try {
    await rolesStore.addRole({ name: newRoleName.value })
    SuccessMessage('Your role was created')
    hideDialog()
  } catch (error: Error) {
    if (error.status === HttpServerError.HTTP_STATUS_CODE_CONFLICT) {
      ErrorMessage('This name already exists')
    }
  }

  newRoleName.value = ''
}
</script>

<template>
  <div class="newRole">
    <ElButton type="primary" @click="showDialog"> Create Role </ElButton>
    <ElDialog v-model="dialogFormVisible" title="New Role" width="500">
      <ElInput v-model="newRoleName" placeholder="Role name" />

      <template #footer>
        <div class="dialog-footer">
          <ElButton @click="hideDialog">Cancel</ElButton>
          <ElButton type="primary" @click="createRole"> Confirm </ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>
<style>
.newRole {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>
