
import { useSelector, useDispatch } from 'react-redux';
import { setCartItems } from '../../redux/actions';

function GET_TOKEN() {
    const { user } = useSelector(state => state.userReducer);

    var tokens = user.token;

    console.log(tokens);

    return tokens; 
}

export default GET_TOKEN;