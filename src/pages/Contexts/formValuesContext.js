import { createContext, useContext, useState } from 'react';
import { DefaultJson } from '../../defaultvalue';


const TransactionContext = createContext({});


  //custom hook//
  export const useTransContext = () => useContext(TransactionContext);




  export const FormValuesContext = ({children}) => {
      const [TransactionData, setTransactionData] = useState(DefaultJson);
    return(
        <>
    <TransactionContext.Provider value={{TransactionData,setTransactionData}}>
        {children}
    </TransactionContext.Provider>
        </>
    )
};

