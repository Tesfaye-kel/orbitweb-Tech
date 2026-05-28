export type Clearance = 'low' | 'medium' | 'high' | 'admin'

export type Role = 'admin' | 'superadmin' | 'member' | 'viewer' | string

export type Action = 'read' | 'write' | 'delete'

export type EnvironmentName = 'public' | 'internal' | 'private'

export type Subject = {
  id?: string
  role?: Role
  department?: string
  clearance?: Clearance
}

export type Resource = {
  id?: string
  ownerId?: string
  type?: string
  department?: string
}

export type ABACInput = {
  subject: Subject
  resource: Resource
  action: Action
  environment: { environment: EnvironmentName }
}

export type ABACResult = {
  permit: boolean
  matchedRules: Array<{ id: string; effect: 'permit' | 'deny'; reason: string }>
  reason: string
}

