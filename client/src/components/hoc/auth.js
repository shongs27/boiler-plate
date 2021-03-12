import { useEffect } from "react";
import { auth } from "../../_reducers/user_action";
import { useDispatch } from "react-redux";
export default function (Component, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    //option
    //null => 아무나 출입 가능
    //true => 로그인한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입이 불가능한 페이지

    //백엔드에 날려서 사람을 구해옴
    //api구현해놓음
    useEffect(() => {
      dispatch(auth()).then((res) => {
        console.log(res);
        //로그인 하지 않은 상태
        if (!res.payload.isAuth) {
          if (option) props.history.push("/login");
        } else {
          //로그인한 상태
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) props.history.push("/");
          }
        }
      });
    }, []);
    return <Component />;
  }

  return AuthenticationCheck;
}
