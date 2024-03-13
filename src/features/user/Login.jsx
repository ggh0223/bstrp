import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import axios from "axios";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

function Login() {
    const dispatch                             = useDispatch()
    const [ cookies, setCookie, removeCookie ] = useCookies([ "rememberUserId" ]);

    let INITIAL_LOGIN_OBJ = {
        password: "", user_id: cookies.rememberUserId ?? "",
    }

    const [ loginObj, setLoginObj ]         = useState(INITIAL_LOGIN_OBJ);
    const [ loading, setLoading ]           = useState(false);
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ isRemember, setIsRemember ]     = useState(false);

    // localStorage token check
    useEffect(() => {
        if (localStorage.getItem("token")) window.location.href = '/app/ad-complete';
    }, []);

    // cookie rememberUserId check
    useEffect(() => {
        if (cookies.rememberUserId) setIsRemember(true);
    }, []);

    const handleOnChange = (e) => {
        setIsRemember(e.target.checked);
        if (!e.target.checked) removeCookie("rememberUserId");
    };

    const submitForm = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (loginObj.user_id.trim() === "") return setErrorMessage("아이디를 입력해주세요!");
        if (loginObj.password.trim() === "") return setErrorMessage("비밀번호를 입력해주세요!"); else {
            setLoading(true)
            const res = await axios.post("/auth/login", loginObj);
            setLoading(false)
            if (res.data.message === "success") {
                // TODO:: need to set token
                if (res.data.token) localStorage.setItem("token", res.data.token);
                // auto login
                console.log("isRemember", isRemember)
                if (isRemember) setCookie("rememberUserId", loginObj.user_id, {
                    path   : "/", // 오늘로부터 +30일 동안 쿠키 저장
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
                }); else removeCookie("rememberUserId");
                window.location.href = '/app/ad-complete';
            } else {
                alert(res.data.message);
            }
        }
    }

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    return (<div className="min-h-screen bg-base-200 flex items-center">
        <div className="card mx-auto w-full max-w-5xl  shadow-xl">
            <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                <div className=''>
                    <LandingIntro/>
                </div>
                <div className='py-24 px-10'>
                    <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                    <form onSubmit={ (e) => submitForm(e) }>

                        <div className="mb-4">

                            <InputText type="id"
                                       defaultValue={ loginObj.user_id }
                                       updateType="user_id"
                                       containerStyle="mt-4" labelTitle="아이디"
                                       updateFormValue={ updateFormValue }
                            />

                            <InputText defaultValue={ loginObj.password } type="password" updateType="password"
                                       containerStyle="mt-4" labelTitle="비밀번호"
                                       updateFormValue={ updateFormValue }/>

                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm"
                                       id="remember_me" checked={ isRemember } onChange={ handleOnChange }
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-primary">
                                    자동 로그인
                                </label>
                            </div>
                        </div>

                        <ErrorText styleClass="mt-8">{ errorMessage }</ErrorText>
                        <button type="submit"
                                className={ "btn mt-2 w-full btn-primary" + (loading ? " loading" : "") }>Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>)
}

export default Login