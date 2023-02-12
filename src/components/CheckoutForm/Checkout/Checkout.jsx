import React,{useState,useEffect} from 'react'
import {Paper,Stepper, Step,StepLabel, Typography ,CircularProgress, Divider,Button} from '@material-ui/core'
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentFrom from '../PaymentForm';
import {commerce} from '../../../lib/commerce'
const steps=['Shipping address','Payment details'];
const Checkout = ({cart,order,onCaptureCheckout,error }) => {
  const [activeStep,setActiveStep]=useState(0);
  const[checkoutToken,setCheckoutToken]=useState(null);
  const [shippingData, setShippingData]=useState({});

  const nextStep=()=>setActiveStep((prevActiveStep)=>prevActiveStep+1);
const backStep=()=>setActiveStep((prevActiveStep)=>prevActiveStep-1);

  const classes=useStyles();
  //const history = useHistory();
  useEffect(()=>{
    if (cart.id) {
      const generateToken=async ()=>{
        try{
          const token=await commerce.checkout.generateToken(cart.id,{type:'cart'});
          setCheckoutToken(token);
        } catch{
        //if (activeStep !== steps.length) history.push('/');
      }
    };
    generateToken();
  }
  },[cart]);


const next=(data)=>{
  setShippingData(data);
  nextStep();
}
const Confirmation=()=>(
<div>
  Confirmation
</div>
);
const Form=()=>activeStep===0?<AddressForm checkoutToken={checkoutToken} setShippingData={setShippingData} next={next}/>:<PaymentFrom shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout}/>

  return (
    <>
    <div className={classes.toolbar}/>
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography varient="h4" align="center">Checkout</Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((step)=>(<Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
          ))}
        </Stepper>
        {activeStep===steps.length?<Confirmation/>:checkoutToken &&<Form/>}
      </Paper>
    </main>
    </>
  )
}

export default Checkout