export async function followUser() {
    try {
    } catch (error) {
      console.log("Error while executing action", error);
    }
  }
  export async function authenticate(
    prevState: string | undefined,
    formData: FormData
  ) {
    try {
      // await signIn("credentials", Object.fromEntries(formData));
    } catch (error) {
      if ((error as Error).message.includes("CredentialsSignin"))
        return "CredentialsSignin";
  
      throw error;
    }
  }
  