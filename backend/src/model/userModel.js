import prisma from "../utils/prismaClient.js";

export const createUser = async (data) => {
  return prisma.user.create({
    data,
  });
};

export const findByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const findUserCredential = async (data) => {
  return prisma.user.findFirst({
    where: {
      OR: [{ email: data }, { username: data }],
    },
  });
};

export const updateUser = async (id, data) => {
  return prisma.user.update({
    where: { id: parseInt(id) },
    data,
  });
};

export const deleteUser = async (id) => {
  return prisma.user.delete({
    where: { id: parseInt(id) },
  });
};

export const tokenRefresh = async (data) => {
  return prisma.refreshTokens.create({
    data,
  });
};
