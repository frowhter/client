import React, {useState} from 'react';
import Input from "../UI/inputs/Input";
import classes from './Form.module.scss'
import style from "../UI/Buttons/Button.module.scss";
import Button from "../UI/Buttons/Button";
import CallIcon from "@mui/icons-material/Call";
import {useInput} from "../../hooks/useInput";
import Policy from "./privacy/policy";
import Agreement from "./privacy/agreement";
import {sendMailCall} from "../../htttp/razboroAPI";
import {useAppDispatch} from "../../hooks/redux";
import {modalResponseSlice} from "../../store/reducers/sended/modalResponseSlice";

interface IFormProps{
    setVisible?: ()=> void;
}

const FormCall: React.FC<IFormProps> = ({setVisible}) => {
    const phone = useInput('+7', {isEmpty: true, minLength: 11, isPhone: true})
    const [assent, setAssent] = useState<boolean>(true)
    const [policy, setPolicy] = useState<boolean>(false)
    const [userAgreement, setUserAgreement] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const modalResponseActions = modalResponseSlice.actions


    const sendForm = ()=> {
        const formData = new FormData()
        formData.append('page', window.location.href)
        formData.append('phone', phone.value)
        sendMailCall(formData).then( message => {
            dispatch(modalResponseActions.modalResponseSetVisible(true))
            dispatch(modalResponseActions.modalResponseFetchingSuccess(message))
            if(setVisible){
                setVisible()
            }

        })
    }


    return (
        <>
            <form className={classes.formCall + ' ' + 'container'} onSubmit={event => event.preventDefault()}>
                <div style={{textAlign: "center"}} className={'title3'}>
                    Мы перезвоним вам и проконсультируем, просто впишите ваш телефон
                </div>
                <div style={{padding: '0 15px', width: '100%'}} className={classes.formCall}>
                    <div style={{display: (phone.isDirty && phone.isEmpty.flag) || (phone.isDirty && phone.minLengthError.flag) || (phone.isDirty && phone.phoneError.flag) ?"flex": 'none'}} className={'flexColumn'}>
                        {(phone.isDirty && phone.isEmpty.flag) && <div style={{color: "red"}}>{phone.isEmpty.text}</div>}
                        {(phone.isDirty && phone.minLengthError.flag) && <div style={{color: "red"}}>{phone.maxLengthError.text}</div>}
                        {(phone.isDirty && phone.phoneError.flag) && <div style={{color: "red"}}>{phone.phoneError.text}</div>}
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: 20, width: '100%'}}>
                        <Input maxLength={12}  value={phone.value} onChange={(e)=> phone.onChange(e)} onBlur={()=> phone.onBlur()} type={'tel'} placeholder={'Введите телефон'}/>
                        <div className={classes.private_policy}>
                            <input checked={assent} onChange={()=> setAssent(!assent)} type="checkbox" name="check" className={classes.check}/>
                            <label style={{fontSize: 14}} htmlFor="check">
                                Согласен с&nbsp;
                                <a onClick={()=> setPolicy(true)} className={classes.privacy_policy_btn}>
                                    Политикой
                                    конфиденциальности
                                </a>
                                &nbsp;и&nbsp;
                                <a onClick={()=> setUserAgreement(true)} className={classes.rules_btn}>
                                    Пользовательским
                                    соглашением.
                                </a>
                            </label>
                        </div>
                    </div>
                    <Button onClick={()=> sendForm()} disabled={!phone.inputValid || !assent} width={'100%'}  className={style.filled}>
                        <div className={'flexRow'} style={{gap: 20}}>
                            <CallIcon/>
                            жду звонка
                        </div>
                    </Button>
                </div>

            </form>
            <Policy visible={policy} setVisible={()=> setPolicy(false)}/>
            <Agreement visible={userAgreement} setVisible={()=> setUserAgreement(false)}/>

        </>
    );
};

export default FormCall;