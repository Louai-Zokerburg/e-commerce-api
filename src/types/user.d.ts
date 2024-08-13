import type { Document } from 'mongoose'

export interface TUser extends Document {
	name: string
	email: string
	password: string
	role: 'admin' | 'user'
	comparePassword: (candidatePassword: string) => Promise<boolean>
}

export interface TTokenUser {
	name: string
	userId: string
	role: string
}
