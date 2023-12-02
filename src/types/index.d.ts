type GlobalContextType = {
  user: IAdmin | null;
  token: string | null;
  login: (data: ILoginCredentialsRequest) => Promise<void>;
  updatePrice: (data: IUpdateAmountRequest) => Promise<void>;
};

interface IAdmin {
  id: number;
  name: string;
  location: string;
  charge_customers: boolean;
  amount: {
    category_6: number;
    category_7: number;
    category_8: number;
    category_9: number;
    category_10: number;
  };
}
