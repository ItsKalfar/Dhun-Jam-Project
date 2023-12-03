type GlobalContextType = {
  user: IAdmin | null;
  token: string | null;
  signin: (data: ILoginCredentialsRequest) => Promise<void>;
  updatePrice: (id, amount) => Promise<void>;
};
