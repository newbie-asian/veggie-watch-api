export const getAllUsers = async () => {
  return [];
};

export const getUserById = async (userId: string) => {
  console.log(userId);

  return null;
};

export const createUser = async (userData: any) => {
  return userData;
};

export const updateUserById = async (userId: string, updateData: any) => {
  return { id: userId, ...updateData };
};

export const deleteUserById = async (userId: string) => {
  console.log(userId);
  return true;
};

export const archiveUserById = async (userId: string) => {
  console.log(userId);
  return true;
};
