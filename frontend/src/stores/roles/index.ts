import { defineStore } from 'pinia'
import { getRoles } from './getters'
import { fetchRoles, addRole, editRoleAction, removeRole, removeLevel } from './actions'
import { roles } from './state'
import { getRoleById } from './getters'

export const useRolesStore = defineStore('roles', () => {
  return {
    roles,
    getRoles,
    fetchRoles,
    addRole,
    editRoleAction,
    removeRole,
    getRoleById,
    removeLevel
  }
})
