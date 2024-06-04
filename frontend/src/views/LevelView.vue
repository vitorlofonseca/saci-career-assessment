<template>
  <div class="Container">
    <img src="@/assets/images/logo-and-lettering.svg" alt="Saci Logo" />
    <h1>{{ newLevelTitle }}</h1>
    <h2>Basic Information</h2>
    <div class="NameContainer">
      <h5>Name</h5>
      <ElInput placeholder="Level Name" v-model="newLevel.name" />
    </div>
    <div class="LinkAndCoeficientsContainer">
      <div class="CoeficientsContainer">
        <h5>Coeficient Range</h5>
        <span>
          <ElInputNumber v-model="newLevel.minCoefficient" :min="0" :max="100" />
          <h4>to</h4>
          <ElInputNumber
            v-model="newLevel.maxCoefficient"
            :min="newLevel.minCoefficient"
            :max="100"
          />
        </span>
      </div>
      <div class="LinkField">
        <h5>Link to Knowledge Path</h5>
        <ElInput placeholder="Link" v-model="newLevel.link"></ElInput>
      </div>
    </div>
    <div class="SaveButton">
      <ElButton type="primary" @click="createLevel()"> Save </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Role } from '@/domain/Role'
import type { Level } from '@/domain/Level'
import { useRolesStore } from '@/stores/roles'
import { ref, onMounted, computed } from 'vue'
import { ElInput, ElButton, ElInputNumber } from 'element-plus'
import { ErrorMessage, SuccessMessage } from '@/services/messages'
import { useRouter } from 'vue-router'
import { HttpServerError } from '@/services/http'

const roleStore = useRolesStore()
const role = ref<Role>()
const newLevel = ref<Level>({
  name: '',
  minCoefficient: 0,
  maxCoefficient: 0,
  link: ''
})
const router = useRouter()
const newLevelTitle = computed(() => {
  return `${role.value?.name || ''} - ${newLevel.value.name || 'New Level'}`
})

onMounted(async () => {
  role.value = await roleStore.getRoleById('1')
})

const redirectToRoleView = () => {
  router.push('/role-view')
  SuccessMessage('Your level was created')
}

const createLevel = async () => {
  try {
    if (newLevel.value.name == '' || newLevel.value.link == '') {
      ErrorMessage('You need to fill all the fields')
      return
    }
    if (newLevel.value.maxCoefficient == 0 && newLevel.value.maxCoefficient > 100) {
      ErrorMessage('MaxRange should be bigger than 0 and smaller than 100')
      return
    }
    if (newLevel.value.maxCoefficient <= newLevel.value.minCoefficient) {
      ErrorMessage('MaxRange should be bigger than MinRange')
      return
    }
    await roleStore.addLevel(newLevel.value, role.value!)
    redirectToRoleView()
  } catch (error: any) {
    if (error.status === HttpServerError.HTTP_STATUS_CODE_CONFLICT) {
      ErrorMessage('This level name already exists')
    }
    if (error.status === HttpServerError.HTTP_SERVER_ERROR) {
      ErrorMessage('Maximum and Minimum range overlap')
    }
  }
}
</script>

<style scoped lang="scss">
.Container {
  padding-top: 20px;
  width: 800px;
  height: auto;
  margin: auto;
  text-align: center;
  h5 {
    text-align: left;
    padding-bottom: 5px;
  }
  h1 {
    text-align: left;
    padding-bottom: 30px;
  }
  img {
    width: 100px;
  }
  .SaveButton {
    text-align: right;
    margin-top: 50px;
    button {
      width: 215px;
      height: 32px;
    }
  }
  .NameContainer {
    padding-bottom: 20px;
    .el-input {
      width: 800px;
      height: 56px;
    }
  }
  .LinkAndCoeficientsContainer {
    display: flex;
    justify-content: space-between;
  }

  .CoeficientsContainer {
    span {
      display: flex;
      align-items: center;
    }
    .el-input-number {
      width: 140px;
      height: 56px;
    }
    h4 {
      margin: 0 10px;
    }
  }

  .LinkField {
    text-align: left;
    .el-input {
      width: 417px;
      height: 56px;
    }
  }
}
</style>
