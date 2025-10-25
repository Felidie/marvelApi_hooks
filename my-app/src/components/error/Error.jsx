import error from './../error/error.gif'
const Error = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '80px',
            height: '100%',// чтобы занять всю высоту экрана
            width: '100%'
        }}>
        <img 
            src={error} 
            alt="error" 
            style={{ width: '400px', height: '400px' }} 
        />
        </div>
  );
}

export default Error;

