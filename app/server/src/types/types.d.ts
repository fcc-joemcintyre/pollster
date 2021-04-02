// @ts-check

declare global {
  namespace Express {
    interface User {
      key: number,
      theme: string,
    }
    interface Request {
      user?: User,
    }
  }
}

// dummy export to allow declare definition context
export function dummy ()
