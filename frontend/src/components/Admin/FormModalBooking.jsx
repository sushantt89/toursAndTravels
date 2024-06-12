import React, { useEffect } from "react";
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

const FormModalBooking = ({ open, handleClose, user }) => {
  const { handleSubmit, control, reset } = useForm({ defaultValues: user });

  useEffect(() => {
    reset(user);
  }, [user, reset]);

  const submitFunc = async (values) => {
    console.log("values :", values);
    handleClose();
    const userId = user.id;
    try {
      const bodyObject = {
        id: userId,
        destination: values.destination,
        email: values.email,
        guestSize: values.guestSize,
        name: values.name,
        phone: values.phone,
      };
      const res = await fetch(`${BASE_URL}/booking/${userId}`, {
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
      } else {
        alert(`Successfully updated ${user.name}`);
      }
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
            name="destination"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Destination"
                type="text"
                fullWidth
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Email"
                type="email"
                fullWidth
              />
            )}
          />
          <Controller
            name="guestSize"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Guest Size"
                type="number"
                fullWidth
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Name"
                type="text"
                fullWidth
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Phone"
                type="tel"
                fullWidth
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

export default FormModalBooking;
 