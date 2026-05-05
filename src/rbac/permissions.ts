export const PERMISSIONS = {
  MANAGE_BARBERSHOP: 'manage:barbershop',

  CREATE_SERVICE: 'create:service',
  UPDATE_SERVICE: 'update:service',
  DELETE_SERVICE: 'delete:service',
  VIEW_SERVICE: 'view:service',

  CREATE_APPOINTMENT: 'create:appointment',
  UPDATE_APPOINTMENT: 'update:appointment',
  DELETE_APPOINTMENT: 'delete:appointment',
  VIEW_APPOINTMENT: 'view:appointment',
  VIEW_OWN_APPOINTMENT: 'view:own-appointment',

  CREATE_CUSTOMER: 'create:customer',
  UPDATE_CUSTOMER: 'update:customer',
  DELETE_CUSTOMER: 'delete:customer',
  VIEW_CUSTOMER: 'view:customer',

  CREATE_PORTFOLIO: 'create:portfolio',
  DELETE_PORTFOLIO: 'delete:portfolio',
  VIEW_PORTFOLIO: 'view:portfolio',

  UPDATE_OWN_PROFILE: 'update:own-profile',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
