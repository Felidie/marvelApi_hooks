import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <p style = {{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '142px', 'color': '#9f0013'}}>OOPS!</p>
            <p style = {{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginBottom': '25px'}}>Page doesn't exist</p>
            <button className="button button__main" style={{'margin':'0 auto'}} >
                <Link className="inner" to="/">Back to main page</Link>
            </button>
        </div>
    ) 
}

export default Page404;