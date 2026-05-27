// Small helper module for ABAC evaluation

/**
 * Evaluate ABAC rules in a simple, deterministic way.
 *
 * Policy model:
 * - subject: { role, department, clearance }
 * - resource: { ownerId, type }
 * - action: 'read' | 'write' | 'delete'
 * - environment: { environment: 'public' | 'internal' | 'private' }
 */

function roleMatches(subject, expectedRoles) {
  if (!expectedRoles || expectedRoles.length === 0) return true
  if (!subject?.role) return false
  return expectedRoles.includes(subject.role)
}

function environmentMatches(env, expected) {
  if (!expected) return true
  return env?.environment === expected
}

function clearanceAtLeast(subject, minClearance) {
  if (minClearance == null) return true
  const map = { low: 1, medium: 2, high: 3, admin: 4 }
  const s = map[subject?.clearance] ?? 0
  const m = map[minClearance] ?? 0
  return s >= m
}

function resourceTypeMatches(resource, expectedTypes) {
  if (!expectedTypes || expectedTypes.length === 0) return true
  if (!resource?.type) return false
  return expectedTypes.includes(resource.type)
}

function ownerCondition(subject, resource, mode) {
  if (!mode) return true
  if (mode === 'owner') return subject?.id && resource?.ownerId && subject.id === resource.ownerId
  if (mode === 'notOwner') return subject?.id && resource?.ownerId && subject.id !== resource.ownerId
  return true
}

function actionMatches(action, expectedActions) {
  if (!expectedActions || expectedActions.length === 0) return true
  return expectedActions.includes(action)
}

function checkCondition(condition, ctx) {
  // Condition shape is free-form but we support a small set of fields
  if (!condition) return true

  const {
    roleIn,
    environment,
    minClearance,
    resourceTypes,
    actionIn,
    ownerCondition: ownerMode,
    requireSameDepartment,
    subjectDepartment,
  } = condition

  if (!roleMatches(ctx.subject, roleIn)) return false
  if (!environmentMatches(ctx.environment, environment)) return false
  if (!clearanceAtLeast(ctx.subject, minClearance)) return false
  if (!resourceTypeMatches(ctx.resource, resourceTypes)) return false
  if (!actionMatches(ctx.action, actionIn)) return false

  if (ownerMode) {
    if (!ownerCondition(ctx.subject, ctx.resource, ownerMode)) return false
  }

  if (requireSameDepartment) {
    if (!ctx.subject?.department || !ctx.resource?.department) return false
    if (ctx.subject.department !== ctx.resource.department) return false
  }

  if (subjectDepartment) {
    if (ctx.subject?.department !== subjectDepartment) return false
  }

  return true
}

export function evaluateAbac(input) {
  const ctx = {
    subject: input?.subject ?? {},
    resource: input?.resource ?? {},
    action: input?.action,
    environment: input?.environment ?? {},
  }

  const action = ctx.action
  const validActions = ['read', 'write', 'delete']
  if (!validActions.includes(action)) {
    return {
      permit: false,
      matchedRules: [],
      reason: `Unknown action '${action}'. Expected one of: ${validActions.join(', ')}`,
    }
  }

  const policy = {
    version: '1.0',
    rules: [
      {
        id: 'rule-admin-all',
        effect: 'permit',
        condition: { roleIn: ['admin', 'superadmin'] },
        reason: 'Admins can perform any action in any environment.',
      },
      {
        id: 'rule-internal-read',
        effect: 'permit',
        condition: {
          roleIn: ['member', 'viewer', 'admin'],
          environment: 'internal',
          actionIn: ['read'],
          minClearance: 'low',
        },
        reason: 'Internal environment: readers with sufficient clearance can read.',
      },
      {
        id: 'rule-owner-read',
        effect: 'permit',
        condition: {
          actionIn: ['read'],
          ownerCondition: 'owner',
        },
        reason: 'Resource owner may read their own resources.',
      },
      {
        id: 'rule-department-write',
        effect: 'permit',
        condition: {
          actionIn: ['write'],
          environment: ['internal', 'private'],
          ownerCondition: null,
          requireSameDepartment: true,
          minClearance: 'medium',
        },
        reason: 'Write requires same department and at least medium clearance.',
      },
      {
        id: 'rule-private-delete',
        effect: 'permit',
        condition: {
          actionIn: ['delete'],
          environment: 'private',
          minClearance: 'high',
        },
        reason: 'Delete is allowed only in private environment for high clearance.',
      },
    ],
  }

  // Normalize environment arrays in conditions
  const normalizeCondition = (cond) => {
    if (!cond) return cond
    const c = { ...cond }
    if (Array.isArray(c.environment)) {
      // convert to a pseudo-single env match by checking membership in checkCondition
      // We'll handle in checkCondition by expanding: if env list => we check includes.
    }
    return c
  }

  // Extend environmentMatches to handle arrays
  const envMatches = (env, expected) => {
    if (expected == null) return true
    if (Array.isArray(expected)) return expected.includes(env?.environment)
    return env?.environment === expected
  }

  // Patch checkCondition behavior locally
  const check = (condition) => {
    if (!condition) return true
    const {
      roleIn,
      environment,
      minClearance,
      resourceTypes,
      actionIn,
      ownerCondition: ownerMode,
      requireSameDepartment,
      subjectDepartment,
    } = condition

    if (!roleMatches(ctx.subject, roleIn)) return false
    if (!envMatches(ctx.environment, environment)) return false
    if (!clearanceAtLeast(ctx.subject, minClearance)) return false
    if (!resourceTypeMatches(ctx.resource, resourceTypes)) return false
    if (!actionMatches(ctx.action, actionIn)) return false
    if (ownerMode) {
      if (!ownerCondition(ctx.subject, ctx.resource, ownerMode)) return false
    }

    if (requireSameDepartment) {
      if (!ctx.subject?.department || !ctx.resource?.department) return false
      if (ctx.subject.department !== ctx.resource.department) return false
    }

    if (subjectDepartment) {
      if (ctx.subject?.department !== subjectDepartment) return false
    }

    return true
  }

  const matchedRules = []
  for (const rule of policy.rules) {
    if (check(rule.condition)) {
      matchedRules.push({ id: rule.id, effect: rule.effect, reason: rule.reason })
      if (rule.effect === 'permit') {
        return {
          permit: true,
          matchedRules,
          reason: rule.reason,
        }
      }
    }
  }

  return {
    permit: false,
    matchedRules,
    reason: 'No ABAC rule matched for the provided attributes. Access denied by default.',
  }
}

