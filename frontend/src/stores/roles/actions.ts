import { get, post } from '@/services/http'
import { getRoles } from './getters'
import { roles } from './state'
import type { Role } from '@/domain/Role'

async function fetchRoles(): Promise<void> {
  if (getRoles?.value?.length > 0) {
    return
  }

  const roles = await get<Role[]>('/roles')

  setRoles(roles)
}

async function addRole(role: Role): Promise<void> {
  await post<Role[]>('/roles', role)
  roles.value.push(role)
}

function setRoles(newRoles: Role[]): void {
  roles.value = newRoles
}

export { fetchRoles, addRole }

export const saveKnowledge = async (newKnowledge: string) => {
  try {
    const response = await fetch('/api/knowledges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newKnowledge })
    })
    if (!response.ok) {
      throw new Error('Failed to save knowledge')
    }

    return true // Indicate success
  } catch (error) {
    console.error('Error:', error)
    return false // Indicate failure
  }
}
