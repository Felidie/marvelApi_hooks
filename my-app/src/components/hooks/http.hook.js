import { useCallback, useState } from "react";

export const useHttp = () => { // создаем хук по отправке запроса на сервер
const [process, setProcess] = useState('waiting');

const request = useCallback (async(url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {
    // универсальная ф-я для запроса, с колбэком, т.к подразумеваем передавать эту ф=ю через пропсы
    setProcess('loading');

        try { // кусок трай/кэч потому что не исп-м then catch
            const response = await fetch(url, {method, body}); // записываем ответ с нужными аргументами 
            
            if (!response.ok) {
                throw new Error(`Could not fetcjh ${url}, status: ${response.status}`); // сели запрос не пришел, ошибка в консоль
            }
           
            const data = await response.json(); // записываем ответ в дату
        
            // setProcess('confirmed');
            
            return data; //возвращаем данные
       
        }catch(e) { 
            setProcess('error');
            throw(e); // выбрасываем ошибку
        }
}, []);

const clearError = useCallback(() => {
    setProcess('loading');
},[]); // ф-я для очистки стейта, если вдруг попадем на блок catch

return {request, clearError, process, setProcess} // возвращаем нужные сущности
}


