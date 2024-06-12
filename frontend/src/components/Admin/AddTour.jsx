import React from 'react';
import { Button, Modal, Box, TextField } from '@mui/material';
import { BASE_URL } from '../../utils/config';


const useForm = (initialValues) => {
 const [values, setValues] = React.useState(initialValues);


 const handleChange = (e) => {
   setValues({
     ...values,
     [e.target.name]: e.target.value
   });
 };


 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const response = await fetch(`${BASE_URL}/tours/`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         title: values.title,
         city: values.city,
         address: values.address,
         distance: parseFloat(values.distance), // Convert to number
         photo: '', // Add photo URL if you have it
         desc: values.desc,
         price: parseFloat(values.price), // Convert to number
         maxGroupSize: 10, // Add your default value or leave it empty
         featured: values.featured === 'true', // Convert to boolean
         reviews: [],
         photo:" "
       })
     });


     if (!response.ok) {
       throw new Error('Failed to add tour');
     }


     // Reset form values
     setValues(initialValues);
   } catch (error) {
     console.error('Error adding tour:', error.message);
   }
 };


 return {
   values,
   handleChange,
   handleSubmit
 };
};


const FormComponent = () => {
 const { values, handleChange, handleSubmit } = useForm({
   title: '',
   city: '',
   address: '',
   distance: '',
   desc: '',
   price: '',
   featured: 'false' // Use strings for boolean values to work with select options
 });


 const [open, setOpen] = React.useState(false);


 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);


 return (
   <>
     <Button variant="contained" onClick={handleOpen}>Open Form</Button>
     <Modal
       open={open}
       onClose={handleClose}
       aria-labelledby="modal-modal-title"
       aria-describedby="modal-modal-description"
     >
       <Box
         sx={{
           position: 'absolute',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           width: 400,
           bgcolor: 'background.paper',
           boxShadow: 24,
           p: 4,
         }}
       >
         <form onSubmit={handleSubmit}>
           <TextField fullWidth label="Title" name="title" value={values.title} onChange={handleChange} />
           <TextField fullWidth label="City" name="city" value={values.city} onChange={handleChange} />
           <TextField fullWidth label="Address" name="address" value={values.address} onChange={handleChange} />
           <TextField fullWidth label="Distance" name="distance" value={values.distance} onChange={handleChange} />
           <TextField fullWidth label="Description" name="desc" value={values.desc} onChange={handleChange} />
           <TextField fullWidth label="Price" name="price" value={values.price} onChange={handleChange} />
           <label>
             Featured:
             <select name="featured" value={values.featured} onChange={handleChange}>
               <option value="true">Yes</option>
               <option value="false">No</option>
             </select>
           </label>
           <Button type="submit" variant="contained" sx={{ mt: 2 }}>Submit</Button>
         </form>
       </Box>
     </Modal>
   </>
 );
};


export default FormComponent;