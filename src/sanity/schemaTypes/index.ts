import { type SchemaTypeDefinition } from 'sanity'
import cars from './cars'
import { userSchema } from './user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [cars, userSchema ],
}
