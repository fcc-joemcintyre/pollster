// @ts-check
export type User = {
  key: number,
  email: string,
  name: string,
  theme: string,
  hash: string,
  salt: string,
}

export type UserResult = {
  status: number,
  user: User,
}

export type PollChoice = {
  text: string,
  votes: number,
}

export type Poll = {
  creator: string,
  title: string,
  choices: PollChoice[],
}

export type PollResult = {
  status: number,
  poll: Poll,
}

export type PollArrayResult = {
  status: number,
  polls: Poll[],
}

export type Hash = {
  hash: string,
  salt: string,
}

export type CommandResult = {
  code: number,
  exit: boolean,
  port: number,
}

declare global {
  namespace Express {
    interface User {
      key: number,
      theme: string,
    }
    interface Request {
      user: User,
    }
  }
}
