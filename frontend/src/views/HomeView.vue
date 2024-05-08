<script setup lang="ts">
import { useRolesStore } from '@/stores/roles/index'
import type { Role } from '@/domain/Role'
import { ElButton, ElInput, ElMessage, ElDialog, ElTable, ElTableColumn } from 'element-plus'
import { ref, onMounted } from 'vue'

const dialogFormVisible = ref(false)
const rolesStore = useRolesStore()
const selectedRoleToUpdate = ref()
const selectedRoleToDelete = ref()
const deleteDialogForm = ref(false)

const openUpdateDialog = (row: Role) => {
  dialogFormVisible.value = true
  selectedRoleToUpdate.value = row
}

const openDeleteDialog = (row: Role) => {
  deleteDialogForm.value = true
  selectedRoleToDelete.value = row.id
}

onMounted(async () => {
  await rolesStore.fetchRoles()
})

async function deleteRole() {
  try {
    await rolesStore.removeRole(selectedRoleToDelete.value)
    ElMessage({
      message: 'Role removed!',
      type: 'success'
    })
    closeDeleteDialog()
  } catch (error) {
    ElMessage({
      message: 'Failed to delete role',
      type: 'error'
    })
  }
}

const closeDeleteDialog = () => {
  deleteDialogForm.value = false
}

const closeDialog = () => {
  dialogFormVisible.value = false
}

const saveForm = async () => {
  try {
    await rolesStore.editRole(selectedRoleToUpdate.value)
    ElMessage({
      message: 'Role updated successfully',
      type: 'success'
    })
    closeDialog()
  } catch (error) {
    ElMessage({
      message: 'Unexpected error updating the role',
      type: 'error'
    })
  }
}

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
        <ElButton type="primary" @click="deleteRole()"> Confirm </ElButton>
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
  </div>

  <div class="demo">
    <ElButton plain @click="dialogFormVisible = true">Add new Knowledge</ElButton>
    <ElDialog v-model="dialogFormVisible" title="New Knowledge" width="500">
      <ElInput v-model="newKnowledgeName" placeholder="Knowledge name" :clearable="false" />

      <template #footer>
        <div class="dialog-footer">
          <ElButton @click="dialogFormVisible = false">Cancel</ElButton>
          <ElButton type="primary" @click="createKnowledge" :required="true">Confirm</ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>

<style scoped lang="scss">
.PageWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.TableContainer {
  width: 800px;
  height: auto;
  margin: auto;
  text-align: center;
}
.demo {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
</style>

<template>
  <div>
    <el-button @click="showDialog">Add Knowledge</el-button>
    <el-dialog v-model="dialogVisible" title="Add Knowledge">
      <el-input v-model="newKnowledge" placeholder="Enter knowledge name"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveKnowledgeAction">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { saveKnowledge } from './knowledgeApi'

export default {
  setup() {
    const dialogVisible = ref(false)
    const newKnowledge = ref('')

    const showDialog = () => {
      dialogVisible.value = true
    }

    const saveKnowledgeAction = async () => {
      try {
        const success = await saveKnowledge(newKnowledge.value)
        if (success) {
          dialogVisible.value = false
          newKnowledge.value = ''
        } else {
        }
      } catch (error) {}
    }

    return { dialogVisible, newKnowledge, showDialog, saveKnowledgeAction }
  }
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
  margin-top: 10px;
}
</style>
