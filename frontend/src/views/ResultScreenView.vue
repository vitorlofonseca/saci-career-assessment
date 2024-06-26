<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLevelStore } from '@/stores/levels'
import type { Level } from '@/domain/Level'
import type { QuizAnswer } from '@/domain/QuizAnswer'
import { ErrorMessage } from '@/services/messages'

const currentLevel = ref<Level | null>(null)
const nextLevel = ref<Level | null>(null)
const levelStore = useLevelStore()

onMounted(async () => {
  const roleId = 1
  const answers: QuizAnswer[] = [
    { knowledgeId: 1, answer: 3 },
    { knowledgeId: 2, answer: 1 },
    { knowledgeId: 5, answer: 2 },
    { knowledgeId: 6, answer: 1 }
  ]

  try {
    const scoreResponse = await levelStore.getScoreResponse(roleId, answers)
    if (scoreResponse) {
      currentLevel.value = scoreResponse.currentLevel
      nextLevel.value = scoreResponse.nextLevel
    } else {
      ErrorMessage('Failed to fetch score response.')
    }
  } catch (error) {
    console.error('Error fetching score response:', error)
    ErrorMessage('Failed to fetch score response.')
  }
})
</script>

<template>
  <div class="ResultScreen">
    <img src="@/assets/images/logo-and-lettering.svg" alt="Saci Logo" class="logo" />
    <p>
      Considering your responses, you are considered<br />
      a <strong>{{ currentLevel?.name }}</strong
      >!
    </p>
    <p>
      If you want to evolve technically, click
      <a :href="nextLevel?.link">here</a> to get access<br />
      to a technical knowledge path
    </p>
  </div>
</template>

<style scoped lang="scss">
.ResultScreen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  text-align: center;

  .logo {
    width: 100px;
    margin-bottom: 20px;
  }
}
</style>
