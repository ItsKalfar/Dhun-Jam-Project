import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "../utils/LocalStorage";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import axios from "axios";

const isBrowser = typeof window !== "undefined";

export const GlobalContext = createContext({} as GlobalContextType);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IAdmin | null>(null);

  const navigate = useNavigate();

  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 120000,
  });

  apiClient.interceptors.request.use(
    function (config) {
      const token = LocalStorage.get("token");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  const getAdminDetails = async (adminId: number) => {
    try {
      const response = await apiClient.get(`/account/admin/${adminId}`);
      if (response) {
        const { data } = response;
        if (data.status === 200) {
          setUser(data.data);
          LocalStorage.set("user", data.data);
        } else {
          toast.error(response.data.ui_err_msg);
        }
      }
    } catch (error: any) {
      console.error(error?.response.data?.message || "Something went wrong");
    } finally {
      setIsLoading && setIsLoading(false);
    }
  };

  const login = async (loginCredentials: ILoginCredentialsRequest) => {
    try {
      const response = await apiClient.post(
        "/account/admin/login",
        loginCredentials
      );
      if (response) {
        const { id, token } = response.data.data;

        if (response.data.status === 200) {
          setToken(token);
          LocalStorage.set("token", token);
          getAdminDetails(id);

          navigate(`/admin/${id}`);
        } else {
          toast.error(response.data.ui_err_msg);
        }
      }
    } catch (error: any) {
      if ([401, 403].includes(error?.response.data?.statusCode)) {
        localStorage.clear();
        if (isBrowser) window.location.href = "/login";
      }
      console.error(error?.response.data?.message || "Something went wrong");
    } finally {
      setIsLoading && setIsLoading(false);
    }
  };

  const updatePrice = async (data: IUpdateAmountRequest) => {
    try {
      const { id, amount } = data;
      const response: IAmountResponse = await apiClient.put(
        `/account/admin/${id}`,
        amount
      );
      if (response) {
        const { data, ui_err_msg, status } = response;
        if (status === 200) {
          console.log(data);
        } else {
          toast.error(ui_err_msg);
        }
      }
    } catch (error: any) {
      if ([401, 403].includes(error?.response.data?.statusCode)) {
        localStorage.clear();
        if (isBrowser) window.location.href = "/login";
      }
      toast.error(error?.response.data?.message || "Something went wrong");
    } finally {
      setIsLoading && setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const _token = LocalStorage.get("token");
    const _user = LocalStorage.get("user");

    if (_token && _user) {
      setToken(_token);
      setUser(_user);
    }
    setIsLoading(false);
  }, []);

  return (
    <GlobalContext.Provider value={{ user, login, token, updatePrice }}>
      {isLoading ? <Loading /> : children}
    </GlobalContext.Provider>
  );
};