// import {
//     DatePicker,
//     Form,
//     Input,
//     Radio,
// } from 'antd';
import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input } from '@mui/material';

interface FormData {
    fname: string;
    lname: string;
    email: string;
    dob: string;
    gender: string;
}


const FormPage: React.FC = () => {

    //Form validation regexes
    const nameValidationRegex = /^[\p{L}\p{M} '-]+$/u;
    const emailValidationRegex = /^[a-z0-9]([a-z0-9.+_-]?)+@[a-z0-9-]+(\.[a-z]{2,})+$/


    const initialValues: FormData = {
        fname: '',
        lname: '',
        email: '',
        dob: '',
        gender: '',
    };


    //Form validation schemas
    const validationSchema = Yup.object().shape({
        fname: Yup.string().matches(nameValidationRegex, "Invalid name. Please enter a valid name.").min(3, "Minimum characters should be 3").required("Required"),
        lname: Yup.string().matches(nameValidationRegex, "Invalid name. Please enter a valid name.").min(3, "Minimum characters should be 3").required("Required"),
        email: Yup.string().matches(emailValidationRegex, "Invalid email. Please enter a valid email.").email("Enter valid email").required("Required"),
        dob: Yup.date().required("Required"),
        gender: Yup.string().required("Required"),



    })


    const onSubmit = async (values: any, actions: { resetForm: () => void; }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        actions.resetForm();
    };


    const [gender, setGender] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setGender(event.target.value as string);
    };

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(props) => (
                    <Form noValidate>
                        <Field as={Input}
                            name='fname'
                            margin="normal"
                            variant="outlined"
                            id="fname"
                            label="First Name"
                            type="text"
                            fullWidth
                            autoComplete='off'
                            size="small"
                            required
                            error={props.errors.fname && props.touched.fname}
                            helperText={<ErrorMessage name='fname' />}
                        />
                        <Field as={TextField}
                            name='lname'
                            margin="normal"
                            variant="outlined"
                            id="lname"
                            label="Last Name"
                            type="text"
                            fullWidth
                            autoComplete='off'
                            size="small"
                            required
                            error={props.errors.lname && props.touched.lname}
                            helperText={<ErrorMessage name='lname' />}
                        />
                        <Field as={TextField}
                            name='email'
                            margin="normal"
                            variant="outlined"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            autoComplete='off'
                            size="small"
                            required
                            error={props.errors.email && props.touched.email}
                            helperText={<ErrorMessage name='email' />}
                        />
                        <Field as={TextField}
                            name='dob'
                            margin="normal"
                            variant="outlined"
                            id="dob"
                            label="Date of Birth"
                            type="date"
                            fullWidth
                            autoComplete='off'
                            size="small"
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={props.errors.dob && props.touched.dob}
                            helperText={<ErrorMessage name='dob' />}
                        />

                        <Field as={FormControl}
                            name='gender'
                            margin="normal"
                            variant="outlined"
                            id="gender"
                            label="Gender"
                            type="text"
                            fullWidth
                            autoComplete='off'
                            size="small"
                            required
                        // error={props.errors.gender && props.touched.gender}
                        // helperText={<ErrorMessage name='gender' />}

                        >

                            <InputLabel id="genderlabel">Gender</InputLabel>
                            <Select
                                id="selectgender"
                                value={gender}
                                label="Gender"
                                onChange={handleChange}


                            >
                                <MenuItem value={'Male'} >Male</MenuItem>
                                <MenuItem value={'Female'} >Female</MenuItem>
                                <MenuItem value={'Other'} >Other</MenuItem>
                            </Select>

                        </Field>

                        {/* <Field as={Select}
                            name='gender'
                            margin="normal"
                            variant="outlined"
                            id="gender"
                            label="Gender"
                            type="text"
                            fullWidth
                            autoComplete='off'
                            size="small"
                            required
                            error={props.errors.gender && props.touched.gender}
                            helperText={<ErrorMessage name='gender' />}
                            value={gender}
                            onChange={handleChange}

                        >



                            <MenuItem value={'Male'} >Male</MenuItem>
                            <MenuItem value={'Female'} >Female</MenuItem>
                            <MenuItem value={'Other'} >Other</MenuItem>

                        </Field>

                        <FormControl fullWidth size="small" required >
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
 */}





                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, fontWeight: 700 }}
                        >
                            SUBMIT
                        </Button>
                    </Form>
                )}
            </Formik>

            {/* <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >

                <Form.Item label="First Name">
                    <Input />
                </Form.Item>
                <Form.Item label="Last Name">
                    <Input />
                </Form.Item>
                <Form.Item label="Email">
                    <Input />
                </Form.Item>
                <Form.Item label="Date of birth">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Gender">
                    <Radio.Group>
                        <Radio value="male"> Male </Radio>
                        <Radio value="female"> Female </Radio>
                    </Radio.Group>
                </Form.Item>

            </Form> */}
        </>
    );
};

export default FormPage;
