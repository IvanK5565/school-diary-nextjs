import { NextAuthOptions } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { UserStatus } from "@/constants";
import IContextContainer from "@/server/context/IContextContainer";
import i18 from "@/public/locales/en-US";
import { IIdentity } from "@/acl/types";
import { encode as defaultEncode } from "next-auth/jwt";
import { randomUUID } from "crypto";
import { ApiError } from "../exceptions";
import { StatusCodes } from "http-status-codes";
import { AnswerType } from "@/types";

export default function authOptionsContainer(ctx: IContextContainer) {
	const authOptions = {
		adapter:ctx.adapter,
		providers: [
			// GitHub({
			// 	clientId: process.env.AUTH_GITHUB_ID!,
			// 	clientSecret: process.env.AUTH_GITHUB_SECRET!
			// }),
			Credentials({
				credentials: {
					email: { label: i18.EmailLabel, type: "email" },
					password: { label: i18.PasswordLabel, type: "password" },
				},
				async authorize(credentials) {
					if (!credentials) return null;
					let user = await ctx.UserModel.findOne({
						where: {
							email: credentials.email,
							status: UserStatus.ACIVE,
						},
					});
					
					if (!user) return null;
					const passVerified = await user.verifyPassword(credentials.password);
					console.log("auth pass:",passVerified)
					if (!passVerified) return null;
					
					return { ...user.get(), id: user.id.toString() };
				},
			}),
		],
		callbacks: {
			async signIn({ user, account, profile, email }) {
				ctx.Logger.log("callback: signIn")
					// let exitingUser = await ctx.UserModel.findOne({
					// 	where: {
					// 		email: email,
					// 		status: UserStatus.ACIVE,
					// 	},
					// });
					// if(!exitingUser){
					// 	return false;
					// }
				return true;
			},
			async jwt({ account, token, user }) {
				ctx.Logger.log("callback: jwt", user)
				if(account?.provider === 'credentials'){
					token.credentials = true;
				}
				if(user) token.user = user as IIdentity;
				return token
			},
			async session({session, user}) {
				ctx.Logger.log("callback: session", session)
				session.user = user as unknown as IIdentity;
				return session
			},
		},
		jwt:{
			encode: async function(param){
				ctx.Logger.log("jwt: encode")
				if(param.token?.credentials){
					const sessionToken = randomUUID();

					if(!param.token.sub){
						throw new ApiError('No user ID found in token', StatusCodes.INTERNAL_SERVER_ERROR, AnswerType.Toast)
					}

					const createdSession = await ctx.adapter.createSession?.({
						sessionToken:sessionToken,
						userId: param.token.sub,
						expires: new Date(Date.now() + 30*24*60*60*1000),
					})
					if(!createdSession){
						throw new ApiError('Failed to create session', StatusCodes.INTERNAL_SERVER_ERROR, AnswerType.Toast)
					}
					return sessionToken;
				}
				return defaultEncode(param);
			}
		},
		pages: {
			signIn: "/signIn",
		},
		secret: process.env.AUTH_SECRET!,
	} satisfies NextAuthOptions;

	return authOptions;
}

