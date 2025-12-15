import Skeleton from "../components/skeleton/Skeleton";
import Loader from "../components/spinner/Loader";
import Error from "../components/error/Error";

const setContent = (process, Component, data) => {
    switch(process) {
        case 'waiting' : {
            return <Skeleton/>
            break;
        }
        case 'loading' : {
            return <Loader/>
            break;
        }
        case 'confirmed' : {
            return <Component data={data}/>
            break;
        }
        case 'error' : {
            return <Error/>
            break;
        }
        default:
            throw new Error('Something went wrong');
    }
}

export default setContent;