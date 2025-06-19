import { useState, useEffect, useContext } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useNotificationStore } from '../../lib/notificationStore';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const {currentUser, updateUser} = useContext(AuthContext);

    const fetch = useNotificationStore(state => state.fetch);
    const number = useNotificationStore(state => state.number);

    fetch();

    useEffect(() => {
        // console.log(open);
    }, [open]);

    return (
        <nav>
            <div className='left'>
                <Link to="/" className='logo'>
                    <img src="/logo.png" alt="" />
                    <span>DevEstate</span>
                </Link>
                <Link to="/">Home</Link>
                <Link to="/">About</Link>
                <Link to="/">Contact</Link>
                <Link to="/">Agents</Link>
            </div>
            <div className='right'>
                {currentUser ? (
                    <div className='user'>
                        <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
                        <span>{currentUser.username}</span>
                        <Link to={"/profile"} className='profile'>
                            {number > 0 && <div className="noticfiation">{number}</div>}
                            <span>Profile</span>
                        </Link>
                    </div>
                ):(
                    <>
                        <a href="/login">Sign In</a>
                        <a href="/register" className="register">Sign Up</a>
                    </>
                )}
                <div className="menuIcon">
                    <img src="/menu.png" alt="" onClick={()=>setOpen(!open)}/>
                </div>
                <div className={open ? "menu active" : "menu"}>
                    <Link to="/">Home</Link>
                    <Link to="/">About</Link>
                    <Link to="/">Contact</Link>
                    <Link to="/">Agents</Link>                    
                    <Link to="/">Sign In</Link>                    
                    <Link to="/">Sign Up</Link>                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar