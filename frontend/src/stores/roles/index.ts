import { defineStore } from 'pinia'
import { getRoles } from './getters'
import { fetchRoles, addRole, editRoleAction, removeRole, loadRoleById } from './actions'
import { roles } from './state'
import { getLevelById } from '../levels/getters'

export const useRolesStore = defineStore('roles', () => {
  return {
    roles,
    getRoles,
    fetchRoles,
    addRole,
    editRoleAction,
    removeRole,
    loadRoleById,
    getLevelById
  }
})
