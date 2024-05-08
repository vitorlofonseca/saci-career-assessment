<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ElButton, ElDialog, ElInput, ElMessage } from 'element-plus'

const dialogFormVisible = ref(false)
const newKnowledgeName = ref('')

onMounted(async () => {})

const createKnowledge = async () => {
  if (newKnowledgeName.value === '') {
    ElMessage({
      message: 'You need to fill in this field',
      type: 'error'
    })
  } else {
    dialogFormVisible.value = false
    try {
      ElMessage({
        message: 'Congrats, your knowledge is now added',
        type: 'success'
      })
    } catch (error: any) {
      if (error.status === 409) {
        ElMessage({
          message: 'Knowledge name already exists.',
          type: 'error'
        })
      } else {
        ElMessage({
          message: 'Unexpected error',
          type: 'error'
        })
      }
    }
  }

  newKnowledgeName.value = ''
}
</script>

<template>
  <<<<<<< HEAD
  <ElDialog v-model="dialogFormVisible" title="Edit Role" width="500">
    <ElInput v-model="selectedRoleToUpdate.name" autocomplete="on" />
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="closeDialog">Cancel</ElButton>
        <ElButton type="primary" @click="saveForm">Save</ElButton>
      </div>
    </template>
  </ElDialog>
  <ElDialog v-model="deleteDialogForm" title="Warning" width="500">
    <span>Role will be permanently removed. Continue?</span>

    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="closeDeleteDialog">Cancel</ElButton>
        <ElButton type="primary" @click="deleteRole"> Confirm </ElButton>
      </div>
    </template>
  </ElDialog>
  <div class="PageWrapper">
    <div class="TableContainer">
      <h2>Roles</h2>
      <ElTable :data="rolesStore.getRoles" style="width: 100%">
        <ElTableColumn prop="name" label="Names" />
        <ElTableColumn fixed="right" label="Actions" width="150">
          <template #default="{ row }">
            <ElButton @click="openDeleteDialog(row)" type="text" size="small">Delete</ElButton>
            <ElButton @click="openUpdateDialog(row)" type="text" size="small">Edit</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
    <div class="demo">
      <ElButton plain @click="showDialog">Add new Knowledge</ElButton>
      <ElDialog v-model="createKnowledgedialogFormVisible" title="New Knowledge" width="500">
        <ElInput v-model="newKnowledgeName" placeholder="Knowledge name" :clearable="false" />
        <template #footer>
          <div class="dialog-footer">
            <ElButton @click="createKnowledgedialogFormVisible = false">Cancel</ElButton>
            <ElButton type="primary" @click="createKnowledge">Confirm</ElButton>
          </div>
        </template>
      </ElDialog>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .el-input,
  h4 {
    text-align: center;
  }
}
</style>
