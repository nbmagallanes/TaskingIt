import { Outlet } from 'react-router-dom';
import UserNavigation from '../components/UserNavigation';

const NewUserLayout = () => (
  <div style={{display: "flex", height: "100vh", overflow: "hidden"}}>
    <UserNavigation />
    <div 
        style={{
        display: "flex",
        flex: '1', 
        justifyContent:'center',
        alignItems: 'flex-start',
        overflowY: 'auto'}}>
        <Outlet />
    </div>
  </div>
);

export default NewUserLayout;