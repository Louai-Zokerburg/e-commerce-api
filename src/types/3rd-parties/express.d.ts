// In a file like src/types/express.d.ts

import type { TUserPayload } from '@/types/user'

declare module 'express-serve-static-core' {
  interface Request {
    user?: TUserPayload
  }
}
