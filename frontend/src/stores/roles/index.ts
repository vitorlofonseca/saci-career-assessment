import { defineStore } from 'pinia'
import { getRoles } from './getters'
import { fetchRoles, addRole, editRole, removeRole } from './actions'
import { roles } from './state'

export const useRolesStore = defineStore('roles', () => {
  return {
    roles,
    getRoles,
    fetchRoles,
    addRole,
    editRole,
    removeRole
  }
})
