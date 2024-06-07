<template>
  <ElDialog :model-value="props.visible" title="Edit Knowledge" width="500" @close="hideEditDialog">
    <ElInput v-model="localKnowledge.name" placeholder="Enter Name" autocomplete="on" />
    <div class="Slider">
      <span class="KnowledgeWeight"> Weight </span>
      <ElSlider v-model="knowledge.weight" :max="5" :step="1" show-stops />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="cancelEdit">Cancel</ElButton>
        <ElButton type="primary" @click="saveForm">Save</ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElButton, ElDialog, ElInput, ElSlider } from 'element-plus'
import { useKnowledgeStore } from '@/stores/knowledges'
import { HttpServerError } from '@/services/http'
import { SuccessMessage, ErrorMessage } from '@/services/messages'
import type { Knowledge } from '@/domain/Knowledge'

const knowledgeStore = useKnowledgeStore()
const props = defineProps<{
  visible: boolean
  knowledge: Knowledge
}>()
const emits = defineEmits(['update:visible', 'confirm-edit'])

const localKnowledge = ref<Knowledge>({ ...props.knowledge })
watch(
  () => props.visible,
  (newVal) => {
    if (newVal) {
      localKnowledge.value = { ...props.knowledge }
    }
  }
)

const hideEditDialog = () => {
  emits('update:visible', false)
}

const cancelEdit = () => {
  localKnowledge.value = { ...props.knowledge }
  hideEditDialog()
}

const saveForm = async () => {
  try {
    props.knowledge.name = localKnowledge.value.name
    await knowledgeStore.editKnowledge(props.knowledge)
    SuccessMessage('Knowledge updated successfully')
    hideEditDialog()
  } catch (error: Error) {
    if (error.status === HttpServerError.HTTP_STATUS_CODE_CONFLICT) {
      ErrorMessage('This name already exists')
    } else {
      ErrorMessage('Unexpected error updating the knowledge')
    }
  }
}
</script>

<style scoped lang="scss">
.el-slider {
  flex: 1;
  padding-left: 15px;
}

.KnowledgeWeight {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  margin-right: 15px;
  white-space: nowrap;
}

.Slider {
  display: flex;
  font-size: 14px;
  align-items: center;
  margin-bottom: 0;
  margin-top: 20px;
}
</style>
