/**
 * Just a dummy function to emulate async user creation.
 * @param attributes - Some user attributes in the following style: {string: any}
 * @param opts - Options to control if the user creation gets rejected.
 */

const createUser = (
  attributes: Record<string, unknown>,
  opts: { shouldFail: boolean } = { shouldFail: false }
): Promise<{ id: number } | { error: string }> => {
  const { shouldFail } = opts;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!shouldFail) {
        console.log(`[user.ts] Successfully stored new user.`);
        resolve({ id: Math.round(Math.random() * 1000), ...attributes });
      } else {
        console.warn(`Did not store user.`);
        reject({ error: "[user.ts] User creation should have failed!" });
      }
    }, 2000);
  });
};

/**
 * Just a dummy function to emulate async user update.
 * @param id - The user id represented as string
 * @param attributes - Some user attributes in the following style: {string: any}
 * @param opts - Options to control if the user creation gets rejected.
 */

const updateUser = (
  id: number,
  attributes: Record<string, unknown>,
  opts: { shouldFail: boolean } = { shouldFail: false }
): Promise<{ id: number } | { error: string }> => {
  const { shouldFail } = opts;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!shouldFail) {
        console.log(`[user.ts] Successfully updated user.`);
        resolve({ id: id, ...attributes });
      } else {
        console.warn(`[user.ts] Did not update user.`);
        reject({ error: "User update should have failed!" });
      }
    }, 2000);
  });
};

export { createUser, updateUser };
