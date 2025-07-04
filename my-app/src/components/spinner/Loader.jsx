import Lottie from 'lottie-react'

import Spinner from './Spinner.json'

const Loader = () => {
    return (
    <div style={{ margin: '0 auto', display: 'block', width: '100px', height: '100px'}}>
      <Lottie animationData={Spinner} loop={true} autoplay={true}/>
    </div>
  );
}

export default Loader;