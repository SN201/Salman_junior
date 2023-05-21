import { useContext, createContext ,useState} from "react";
export const AuthContext = createContext(null);
export const ContextProvider =({children})=>{
    const [user , setUser] = useState(null);
    const [userType , setUserType] = useState(null); 
    const [ auth , setAuth] = useState('');
    const [ name , setName] = useState('');
    const [ specialty , setSpecialty] = useState('');
    const [ phone , setPhone] = useState('');
    const [gender,setGender]=useState('')
    //const [userState , setUserState] = useState(null);

    const username=(name)=>{
      setName(name);
}
const Gender=(gender)=>{
  setGender(gender);
}

const authToken=(auth)=>{
  setAuth(auth);
}
const doctorSpecialty=(specialty)=>{
  setSpecialty(specialty);
}
    const userPhone=(phone)=>{
      setPhone(phone);
}
    const type=(type)=>{
            setUserType(type);
    }
    const login = (user) =>{
        setUser(user);
        // setUserType(userType);
       // setUserState(true);
    };
    const logout=()=>{
      localStorage.removeItem('access_token');
        setUser(null);
        
        // setUserType(null);
      //  setUserState(false);

    };
    return (<AuthContext.Provider value={{gender,Gender,userPhone,phone,doctorSpecialty,specialty,username,name,NavigationPreloadManager,user,userType , login , logout,type,auth,setAuth,authToken}} >
     {children}
    </AuthContext.Provider>)
};
export const useAuth = ()=>{
return useContext(AuthContext);
};