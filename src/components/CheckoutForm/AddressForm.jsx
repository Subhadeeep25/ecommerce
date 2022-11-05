import React,{useState} from 'react'
import {InputLabel,Select, MenuItem,Button,Grid, Typography, TextField} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import FormInput from './CustomTextField';
import {commerce} from '../../lib/commerce';


const AddressForm = () => {
  const{shippingCountries,setShippingCountries}=useState([]);
  const[shippingCountry,setShippingCountry]=useState('');
  const[shippingSubdivisions,setShippingSubdivisions]=useState([]);
  const[shippingSubdivision,setShippingSubdivision]=useState('');
  const[shippingOptions,setShippingOptions]=useState([]);
  const[shippingOption,setShippingOption]=useState('');

  const methods=useForm();
  const fetchShippingCountries=async(checkoutTokenId)=>{
    const response= await commerce.services.localeListShippingCountries(checkoutTokenId);
  }
  return (<>
    <Typography varient="h6" gutterbutton>Shipping Address</Typography>
    <FormProvider{...methods}>
      <form onSubmit=''>
        <Grid container spacing={1}>
          <Grid xs={12} sm={6} item>
          <TextField label="First Name" placeholder='First Name' varient="outlined"/>
          </Grid>
          <Grid xs={12} sm={6} item>
          <TextField label="Last Name" placeholder='Last Name'/>
          </Grid>
          <Grid xs={12} sm={6} item>
          <TextField label="email" placeholder='Email'/>
          </Grid>
          <Grid xs={12} sm={6} item>
          <TextField label="Address" placeholder='Address'/>
          </Grid>
          <Grid xs={12} sm={6} item>
          <TextField label="email" placeholder='Email'/>
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <InputLabel>Shipping country</InputLabel>
            <Select value={} fullWidth onChange={}>
              <MenuItem key={} value={}>
                Select Me
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Subdivision</InputLabel>
            <Select value={} fullWidth onChange={}>
              <MenuItem key={} value={}>
                Select Me
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Options</InputLabel>
            <Select value={} fullWidth onChange={}>
              <MenuItem key={} value={}>
                Select Me
              </MenuItem>
            </Select>
          </Grid> */}
        </Grid>
      </form>
    </FormProvider>
    </>
  )
}

export default AddressForm