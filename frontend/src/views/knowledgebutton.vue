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
    <el-alert v-model="error" title="Error" type="error" show-icon></el-alert>
  </div>
</template>

<script>
import { ref } from 'vue'
import { saveKnowledge } from './knowledgeApi'

export default {
  setup() {
    const dialogVisible = ref(false)
    const newKnowledge = ref('')
    const error = ref('')

    const showDialog = () => {
      dialogVisible.value = true
    }

    const saveKnowledgeAction = async () => {
      try {
        await saveKnowledge(newKnowledge.value)

        newKnowledge.value = ''
        dialogVisible.value = false
        error.value = ''
      } catch (error) {
        console.error('Error saving knowledge:', error)
        error.value = 'Failed to save knowledge. Please try again.'
      }
    }

    return { dialogVisible, newKnowledge, showDialog, saveKnowledgeAction, error }
  }
}
</script>
