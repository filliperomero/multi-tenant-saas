import { z } from 'zod'

// Important: We don't need all fields from organization entity, we just need the fields that are important for the permissions
export const organizationSchema = z.object({
  __typename: z.literal('Organization').default('Organization'),
  id: z.string(),
  ownerId: z.string(),
})

export type Organization = z.infer<typeof organizationSchema>
