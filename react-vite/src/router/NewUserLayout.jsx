import { Outlet } from 'react-router-dom';
import UserNavigation from '../components/UserNavigation';

const NewUserLayout = () => (
  <div style={{display: "flex"}}>
    <UserNavigation />
    <div 
        style={{display: 'flex', 
        flex: '1', 
        justifyContent:'center',
        alignItems: 'flex-start',
        overflowY: 'auto',
        minHeight: '100vh'}}>
        <Outlet />
    </div>
  </div>
);

export default NewUserLayout;