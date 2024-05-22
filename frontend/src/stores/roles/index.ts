import { defineStore } from 'pinia'
import { getRoles } from './getters'
import { fetchRoles, addRole, removeRole, editRole } from './actions'
import { roles } from './state'
import { getRoleById } from './getters'

export const useRolesStore = defineStore('roles', () => {
  return {
    roles,
    getRoles,
    fetchRoles,
    addRole,
    removeRole,
    editRole,
    getRoleById
  }
})
