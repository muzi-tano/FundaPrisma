import { Prisma } from '@prisma/client'
import { prisma } from "../src/libs/prisma"

type CreateUserProps = {
   name: string;
   email: string;
};

export const createUser = async ({ name, email }: CreateUserProps) => {
   try {
      const user = await prisma.user.create({
         data: {
            name,
            email,
         },
      });

      return user;
   } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
         if (error.code === 'P2002') {
            console.error("Error: Email already exists.");
            return false;
         }
      }
      console.error("Error creating user:", error);
      return false;
   }
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
   try {
      return await prisma.user.createMany({
         data: users,
         skipDuplicates: true,
      });
   } catch (error) {
      console.error("Error creating users:", error);
      return false;
   }
}