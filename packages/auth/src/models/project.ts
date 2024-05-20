import { z } from 'zod'

// Important: We don't need all fields from project entity, we just need the fields that are important for the permissions
export const projectSchema = z.object({
  __typename: z.literal('Project').default('Project'),
  id: z.string(),
  ownerId: z.string(),
})

export type Project = z.infer<typeof projectSchema>
