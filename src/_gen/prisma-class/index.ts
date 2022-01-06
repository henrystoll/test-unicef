import { Org as _Org } from './org'
import { User as _User } from './user'

export namespace PrismaModel {
	export class Org extends _Org {}
	export class User extends _User {}

	export const extraModels = [
		Org, User
	]
}