import SignUpForm from "./SignupForm";
import { useState } from 'react';
import { Modal } from '../../context/Modal';


const SignUpFormModal = ({signupSetter, signupModal, changeSignupModal}) => {

    return (
        <>
            
            {signupModal && (
                <Modal onClose={()=>changeSignupModal()} >

                    <SignUpForm signupSetter={signupSetter}/>
                </Modal>
        )}
        </>
    );
};

export default SignUpFormModal;
