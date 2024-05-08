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
import { ref } from 'vue'
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
          // Handle failure
        }
      } catch (error) {
        // Handle error
      }
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
