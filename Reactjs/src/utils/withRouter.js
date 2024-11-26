import { useNavigate, useLocation, useParams   } from 'react-router-domv6';
//Component Higher-Order
export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    
    return (
      <Component
        navigate={navigate}
        location={location}
        params={params}
        {...props}
        />
    );
  };
  
  return Wrapper;
};