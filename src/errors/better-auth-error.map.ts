// errors/better-auth-error.map.ts

import { APIErrorCode } from 'better-auth';

export const betterAuthErrorMap = {
  USER_NOT_FOUND: 'Usuário não encontrado',
  FAILED_TO_CREATE_USER: 'Erro ao criar usuário',
  FAILED_TO_CREATE_SESSION: 'Erro ao criar sessão',
  FAILED_TO_UPDATE_USER: 'Erro ao atualizar usuário',
  FAILED_TO_GET_SESSION: 'Erro ao obter sessão',

  INVALID_PASSWORD: 'Senha inválida',
  INVALID_EMAIL: 'Email inválido',
  INVALID_EMAIL_OR_PASSWORD: 'Email ou senha inválidos',
  INVALID_USER: 'Usuário inválido',

  SOCIAL_ACCOUNT_ALREADY_LINKED: 'Conta social já vinculada',
  PROVIDER_NOT_FOUND: 'Provedor não encontrado',

  INVALID_TOKEN: 'Token inválido',
  TOKEN_EXPIRED: 'Token expirado',

  USER_EMAIL_NOT_FOUND: 'Email do usuário não encontrado',
  EMAIL_NOT_VERIFIED: 'Email não verificado',

  PASSWORD_TOO_SHORT: 'Senha muito curta',
  PASSWORD_TOO_LONG: 'Senha muito longa',

  USER_ALREADY_EXISTS: 'Usuário já existe',
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: 'Usuário já existe, use outro email',

  EMAIL_CAN_NOT_BE_UPDATED: 'Email não pode ser alterado',

  ACCOUNT_NOT_FOUND: 'Conta não encontrada',
  SESSION_EXPIRED: 'Sessão expirada',

  USER_ALREADY_HAS_PASSWORD: 'Usuário já possui senha',
  PASSWORD_ALREADY_SET: 'Senha já foi definida',

  INVALID_CALLBACK_URL: 'URL de callback inválida',
  INVALID_REDIRECT_URL: 'URL de redirecionamento inválida',

  VALIDATION_ERROR: 'Erro de validação',
  MISSING_FIELD: 'Campo obrigatório não informado',

  BODY_MUST_BE_AN_OBJECT: 'Corpo da requisição inválido',

  // fallback obrigatório
  FIELD_NOT_ALLOWED: 'Campo não permitido',
  ASYNC_VALIDATION_NOT_SUPPORTED: 'Validação assíncrona não suportada',
  METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED: 'Método não permitido',

  CALLBACK_URL_REQUIRED: 'Callback obrigatório',

  FAILED_TO_CREATE_VERIFICATION: 'Erro ao criar verificação',

  EMAIL_ALREADY_VERIFIED: 'Email já verificado',
  EMAIL_MISMATCH: 'Emails não correspondem',

  INVALID_ORIGIN: 'Origem inválida',
  MISSING_OR_NULL_ORIGIN: 'Origem ausente',

  LINKED_ACCOUNT_ALREADY_EXISTS: 'Conta já vinculada',

  SESSION_NOT_FRESH: 'Sessão não está atualizada',

  CROSS_SITE_NAVIGATION_LOGIN_BLOCKED: 'Login bloqueado por segurança',

  ID_TOKEN_NOT_SUPPORTED: 'Token ID não suportado',
  FAILED_TO_GET_USER_INFO: 'Erro ao obter dados do usuário',
} satisfies Partial<Record<APIErrorCode, string>>;
