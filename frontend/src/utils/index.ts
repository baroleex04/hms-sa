enum Role {
  ADMIN     = 'admin',
  USER      = 'user',
  EDITOR    = 'editor',
  MANAGER   = 'manager',
  INACTIVE  = 'inactive'
}

export const getRoleStyles = (role: string) => {
  switch (role.toLowerCase()) {
    case Role.ADMIN:
      return {
        bg    : 'bg-red-50',
        text  : 'text-red-800',
        border: 'border-red-200'
      }
    case Role.USER:
      return {
        bg    : 'bg-blue-100',
        text  : 'text-blue-800',
        border: 'border-blue-200'
      }
    case Role.EDITOR:
      return {
        bg    : 'bg-purple-100',
        text  : 'text-purple-800',
        border: 'border-purple-200'
      }
    case Role.MANAGER:
      return {
        bg    : 'bg-green-100',
        text  : 'text-green-800',
        border: 'border-green-200'
      }
    default:
      return {
        bg    : 'bg-gray-100',
        text  : 'text-gray-800',
        border: 'border-gray-200'
      }
  }
}