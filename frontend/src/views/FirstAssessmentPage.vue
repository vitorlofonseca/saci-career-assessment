<template>
  <div class="container">
    <img src="@/assets/images/logo-and-lettering.svg" alt="Saci Logo" class="logo" />
    <h1>Choose the role you want</h1>
    <div class="dropdown">
      <ElSelect
        v-model="localSelectedRole"
        placeholder="Select a role"
        size="large"
        style="width: 240px"
        @change="handleRoleChange"
      >
        <ElOption
          v-for="item in rolesStore.roles"
          :key="item.name"
          :label="item.label"
          :value="item.name"
        />
      </ElSelect>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElOption, ElSelect } from 'element-plus'
import { useRolesStore } from '@/stores/roles'
import { quizState } from '@/stores/roles/state'
import { quizActions } from '@/stores/roles/actions'

const rolesStore = useRolesStore()

onMounted(async () => {
  await rolesStore.fetchRoles()
})

const localSelectedRole = ref(quizState.quiz.selectedRole)

const handleRoleChange = (role: string) => {
  try {
    quizActions.setSelectedRole(role)
    localSelectedRole.value = role
  } catch (error) {
    console.error('Failed to set selected role:', error)
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
}

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
}

.dropdown {
  width: 240px;
}
</style>
