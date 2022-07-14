import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';


const KPIForm = ({ data }) => {

    const { id } = data;

    const [inputs, setInputs] = useState({
        name: '',
    });

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', inputs.name);
        formData.append("_method", "PUT");
        try {
            const response = await fetch(
                `http://localhost:8000/api/kpi/${id}`, {
                method: "POST",
                content: "application/json",
                body: formData
            });
            const res = await response.json();
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="First Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEdit}>Edit</Button>
                {/* <Button onClick={handleClose}>Cancek</Button> */}
            </DialogActions>
        </>
    )
}

export default KPIForm;