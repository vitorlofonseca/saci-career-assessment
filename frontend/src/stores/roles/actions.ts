import { get, post } from '@/services/http'
import { getRoles } from './getters'
import { setRoles, roles } from './state'
import type { Role } from '@/domain/Role'

async function fetchRoles(): Promise<void> {
  if (getRoles?.value?.length > 0) {
    return
  }

  const fetchedRoles = await get<Role[]>('/roles')

  setRoles(fetchedRoles)
}

async function addRole(role: Role): Promise<void> {
  await post<Role[]>('/roles', role)
  const updatedRoles = [...roles.value, role]
  setRoles(updatedRoles)
}

export { fetchRoles, addRole }

export const saveKnowledge = async (newKnowledge: string): Promise<boolean> => {
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
    return true
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
