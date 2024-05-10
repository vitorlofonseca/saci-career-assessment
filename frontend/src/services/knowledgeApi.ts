import { post } from './http'

export async function saveKnowledge(newKnowledge: string): Promise<void> {
  try {
    await post<void>('/knowledge', { name: newKnowledge })

    console.log('New knowledge saved successfully')
  } catch (error) {
    console.error('Error saving knowledge:', error)
    throw new Error('Failed to save knowledge. Please try again.')
  }
}
