import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { BASE_URL } from "../../utils/config";

const FormModalTours = ({ open, handleClose, user }) => {
  const { handleSubmit, control } = useForm({ defaultValues: user });


  const submitFunc = async (values) => {
    console.log("values of tour:", values);
    handleClose();
    const userId = user.id;
    try {
      const bodyObject = {
        id: userId,
        title:values.title,
        address:values.title,
        city:values.city,
        desc:values.desc,
        distance:values.distance,
        price:values.price,
        

      };
      const res = await fetch(`${BASE_URL}/tours/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bodyObject),
      });

      const result = await res.json();
      console.log("updated user :", result);
      if (!res.ok) {
        alert(result.message);
      }
      alert(`successfully update ${user.name}`)
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update User Details {user?.name}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(submitFunc)}>
        <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                label="Tour Tittle"
                type="text"
                fullWidth
                defaultValue={user.title}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                label="User Name"
                type="text"
                fullWidth
                defaultValue={user.address}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                label="City"
                type="text"
                fullWidth
                defaultValue={user.city}
              />
            )}
          />
          <Controller
            name="desc"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                label="Description"
                type="text"
                fullWidth
                defaultValue={user.desc}
              />
            )}
          />
          <Controller
            name="distance"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                label="Distance"
                type="number"
                fullWidth
                defaultValue={user.distance}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                label="Price"
                type="number"
                fullWidth
                defaultValue={user.price}
              />
            )}
          />
         
          
          {/* Add more form fields as needed */}
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormModalTours;
