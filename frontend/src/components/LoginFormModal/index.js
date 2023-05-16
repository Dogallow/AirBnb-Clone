import LoginForm from "./LoginForm";
import { useState } from 'react'
import { Modal } from '../../context/Modal'

const LoginFormModal =({ loginModal, changeLoginModal, loginSetter }) => {

    return(
        <>
        {loginModal && (
            <Modal onClose={()=>changeLoginModal()}>
                <LoginForm loginSetter={loginSetter}/>
            </Modal>
        )}
        </>
    );
};

export default LoginFormModal;
