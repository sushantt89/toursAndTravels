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

const FormModal = ({ open, handleClose, user }) => {
  const { handleSubmit, control } = useForm({ defaultValues: user });
  console.log("userValue:", user);

  const submitFunc = async (values) => {
    console.log("values :", values);
    handleClose();
    const userId = user.id;
    try {
      const bodyObject = {
        id: values.id,
        username: values.name,
        email: values.email,
      };
      const res = await fetch(`${BASE_URL}/users/${userId}`, {
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
      alert(`successfully updated ${user.name}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Details for {user.name}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(submitFunc)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                label="User Name"
                type="text"
                fullWidth
                defaultValue={user.name}
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
                label="Email Address"
                type="email"
                fullWidth
                defaultValue={user.email}
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

export default FormModal;
